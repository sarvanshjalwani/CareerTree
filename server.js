import express from "express";
import mysql from "mysql2";
import { execFile, spawn } from "node:child_process";
import { Buffer } from "node:buffer";
import cors from "cors";
import fs from "node:fs/promises";
import path from "path";
import os from "os";
import dotenv from "dotenv";
import { getJson } from "serpapi";
import registerHeatmapRoutes from "./heatserver.js";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Must run before accessing process.env
const API_KEY = process.env.SERPAPI_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_SECRET = process.env.OTP_SECRET;
const JWT_ISSUER = "careertree";
const OTP_EXPIRY_MINUTES = 5;
const MAX_OTP_ATTEMPTS = 5;
const MAX_CODE_BYTES = 32 * 1024;
const MAX_OUTPUT_BYTES = 64 * 1024;
const COMPILE_TIMEOUT_MS = 5000;
const RUN_TIMEOUT_MS = 2000;
const MAX_CONCURRENT_COMPILERS = 2;
let activeCompilerJobs = 0;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
}));
app.use(express.json({ limit: "64kb" }));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  connection.release();
  console.log("✅ Connected to MySQL database");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many authentication attempts. Try again later." },
});

const compilerRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many compiler requests. Try again shortly." },
});

const trendsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many Trends requests. Try again later." },
});

function validateTrendKeyword(req, res, next) {
  const keyword = req.params.keyword?.trim();
  if (!keyword || Buffer.byteLength(keyword, "utf8") > 255) {
    return res.status(400).json({ error: "Keyword must be between 1 and 255 UTF-8 bytes." });
  }
  next();
}

function authConfigurationError(res) {
  if (
    !JWT_SECRET ||
    !OTP_SECRET ||
    JWT_SECRET === OTP_SECRET ||
    Buffer.byteLength(JWT_SECRET, "utf8") < 32 ||
    Buffer.byteLength(OTP_SECRET, "utf8") < 32
  ) {
    res.status(503).json({ error: "Set separate JWT_SECRET and OTP_SECRET values of at least 32 bytes in the server environment." });
    return true;
  }
  return false;
}

function emailConfigurationError(res) {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) return false;
  res.status(503).json({ error: "Email service is not configured. Set EMAIL_USER and EMAIL_PASS in .env." });
  return true;
}

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function isValidEmail(email) {
  return email.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createOtpHash(email, purpose, otp) {
  return createHmac("sha256", OTP_SECRET)
    .update(`${email}:${purpose}:${otp}`)
    .digest("hex");
}

function otpMatches(email, purpose, otp, expectedHash) {
  if (typeof otp !== "string" || !/^\d{6}$/.test(otp)) return false;
  const actualHash = Buffer.from(createOtpHash(email, purpose, otp), "hex");
  const storedHash = Buffer.from(expectedHash, "hex");
  return actualHash.length === storedHash.length && timingSafeEqual(actualHash, storedHash);
}

async function createOtpChallenge(email, purpose, passwordHash = null) {
  const otp = randomInt(0, 1000000).toString().padStart(6, "0");
  const otpHash = createOtpHash(email, purpose, otp);
  await db.promise().execute(
    `INSERT INTO auth_otp_challenges (email, purpose, otp_hash, password_hash, expires_at, attempts)
     VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0)
     ON DUPLICATE KEY UPDATE otp_hash = VALUES(otp_hash), password_hash = VALUES(password_hash),
       expires_at = VALUES(expires_at), attempts = 0`,
    [email, purpose, otpHash, passwordHash]
  );
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: purpose === "signup" ? "CareerTree email verification code" : "CareerTree password reset code",
      text: `Your verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });
  } catch (err) {
    await db.promise().execute(
      "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = ? AND otp_hash = ?",
      [email, purpose, otpHash]
    );
    throw err;
  }
}

function issueJwt(user) {
  return jwt.sign(
    { email: user.email },
    JWT_SECRET,
    { subject: String(user.id), issuer: JWT_ISSUER, expiresIn: "12h", algorithm: "HS256" }
  );
}

function requireAuth(req, res, next) {
  if (authConfigurationError(res)) return;
  const authorization = req.get("authorization") || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
  if (!token) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
    });
    const userId = Number(payload.sub);
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return res.status(401).json({ error: "Invalid authentication token." });
    }
    req.userId = userId;
    req.userEmail = payload.email;
    next();
  } catch (err) {
    return res.status(401).json({
      error: err.name === "TokenExpiredError"
        ? "Session expired. Please sign in again."
        : "Invalid authentication token.",
    });
  }
}

app.post("/auth/signup", authRateLimit, async (req, res) => {
  if (authConfigurationError(res) || emailConfigurationError(res)) return;
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({ error: "Password must be at least 8 characters and no more than 72 UTF-8 bytes." });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await createOtpChallenge(email, "signup", passwordHash);
    res.json({ message: "Verification code sent to your email." });
  } catch (err) {
    console.error("Signup OTP delivery failed:", err);
    res.status(500).json({ error: "Could not send verification code." });
  }
});

app.post("/auth/verify-signup", authRateLimit, async (req, res) => {
  if (authConfigurationError(res)) return;
  const email = normalizeEmail(req.body.email);
  const { otp } = req.body;
  if (!isValidEmail(email) || typeof otp !== "string") {
    return res.status(400).json({ error: "Email and verification code are required." });
  }
  let connection;
  try {
    connection = await db.promise().getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      `SELECT otp_hash, password_hash, expires_at > NOW() AS is_valid, attempts
       FROM auth_otp_challenges WHERE email = ? AND purpose = 'signup' FOR UPDATE`,
      [email]
    );
    const challenge = rows[0];
    if (!challenge || !challenge.is_valid) {
      await connection.execute(
        "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'signup'",
        [email]
      );
      await connection.commit();
      return res.status(400).json({ error: "Verification code is missing or expired. Request a new one." });
    }
    if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
      await connection.execute(
        "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'signup'",
        [email]
      );
      await connection.commit();
      return res.status(429).json({ error: "Too many incorrect codes. Request a new one." });
    }
    if (!otpMatches(email, "signup", otp, challenge.otp_hash)) {
      await connection.execute(
        "UPDATE auth_otp_challenges SET attempts = attempts + 1 WHERE email = ? AND purpose = 'signup'",
        [email]
      );
      await connection.commit();
      return res.status(400).json({ error: "Incorrect verification code." });
    }
    await connection.execute(
      `INSERT INTO users (email, password) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password = VALUES(password)`,
      [email, challenge.password_hash]
    );
    const [userRows] = await connection.execute(
      "SELECT id, email FROM users WHERE email = ?",
      [email]
    );
    await connection.execute(
      "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'signup'",
      [email]
    );
    await connection.commit();
    const user = userRows[0];
    res.json({ token: issueJwt(user), user: { userId: user.id, email: user.email } });
  } catch (err) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Signup transaction rollback failed:", rollbackError);
    }
    console.error("Signup verification failed:", err);
    res.status(500).json({ error: "Could not verify your account." });
  } finally {
    connection?.release();
  }
});

app.post("/auth/login", authRateLimit, async (req, res) => {
  if (authConfigurationError(res)) return;
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;
  if (!email || email.length > 255 || typeof password !== "string" || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const [rows] = await db.promise().execute(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];
    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    res.json({ token: issueJwt(user), user: { userId: user.id, email: user.email } });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Could not sign in." });
  }
});

app.get("/auth/me", requireAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().execute(
      "SELECT id, email FROM users WHERE id = ?",
      [req.userId]
    );
    if (rows.length === 0) return res.status(401).json({ error: "Account no longer exists." });
    res.json({ userId: rows[0].id, email: rows[0].email });
  } catch (err) {
    console.error("Session validation failed:", err);
    res.status(500).json({ error: "Could not validate session." });
  }
});

app.post("/auth/forgot-password", authRateLimit, async (req, res) => {
  if (authConfigurationError(res) || emailConfigurationError(res)) return;
  const email = normalizeEmail(req.body.email);
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  try {
    const [rows] = await db.promise().execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) await createOtpChallenge(email, "reset");
    res.json({ message: "If an account exists for that email, a reset code has been sent." });
  } catch (err) {
    console.error("Password reset OTP delivery failed:", err);
    res.status(500).json({ error: "Could not send password reset code." });
  }
});

app.post("/auth/reset-password", authRateLimit, async (req, res) => {
  if (authConfigurationError(res)) return;
  const email = normalizeEmail(req.body.email);
  const { otp, newPassword } = req.body;
  if (
    !isValidEmail(email) ||
    typeof otp !== "string" ||
    typeof newPassword !== "string" ||
    newPassword.length < 8 ||
    Buffer.byteLength(newPassword, "utf8") > 72
  ) {
    return res.status(400).json({ error: "Enter the email, reset code, and a password of at least 8 characters (maximum 72 UTF-8 bytes)." });
  }
  let connection;
  try {
    connection = await db.promise().getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      `SELECT otp_hash, expires_at > NOW() AS is_valid, attempts
       FROM auth_otp_challenges WHERE email = ? AND purpose = 'reset' FOR UPDATE`,
      [email]
    );
    const challenge = rows[0];
    if (!challenge || !challenge.is_valid) {
      await connection.execute(
        "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'reset'",
        [email]
      );
      await connection.commit();
      return res.status(400).json({ error: "Reset code is missing or expired. Request a new one." });
    }
    if (challenge.attempts >= MAX_OTP_ATTEMPTS) {
      await connection.execute(
        "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'reset'",
        [email]
      );
      await connection.commit();
      return res.status(429).json({ error: "Too many incorrect codes. Request a new one." });
    }
    if (!otpMatches(email, "reset", otp, challenge.otp_hash)) {
      await connection.execute(
        "UPDATE auth_otp_challenges SET attempts = attempts + 1 WHERE email = ? AND purpose = 'reset'",
        [email]
      );
      await connection.commit();
      return res.status(400).json({ error: "Incorrect reset code." });
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await connection.execute(
      "UPDATE users SET password = ? WHERE email = ?",
      [passwordHash, email]
    );
    await connection.execute(
      "DELETE FROM auth_otp_challenges WHERE email = ? AND purpose = 'reset'",
      [email]
    );
    await connection.commit();
    res.json({ message: "Password reset successfully. Please sign in." });
  } catch (err) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Password-reset transaction rollback failed:", rollbackError);
    }
    console.error("Password reset failed:", err);
    res.status(500).json({ error: "Could not reset password." });
  } finally {
    connection?.release();
  }
});

app.get("/", (req, res) => {
  res.send("C Compiler API is running. Use POST /run to compile code.");
});
async function killProcessTree(child) {
  if (!child.pid) return;
  if (process.platform === "win32") {
    await new Promise((resolve) => {
      execFile("taskkill", ["/pid", String(child.pid), "/t", "/f"], (err) => {
        if (err && err.code !== "ESRCH") {
          console.error("Failed to terminate compiler process tree:", err.message);
        }
        resolve();
      });
    });
    return;
  }
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch (err) {
    if (err.code !== "ESRCH") throw err;
  }
}

function runBoundedProcess(command, args, workDir, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: workDir,
      detached: process.platform !== "win32",
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        PATH: process.env.PATH || "",
        ...(process.platform === "win32" && process.env.SystemRoot
          ? { SystemRoot: process.env.SystemRoot }
          : {}),
      },
    });
    const output = [];
    let outputBytes = 0;
    let terminationReason = null;
    let terminationPromise = Promise.resolve();
    const terminate = (reason) => {
      if (terminationReason) return;
      terminationReason = reason;
      terminationPromise = killProcessTree(child).catch((err) => {
        console.error("Failed to terminate compiler process tree:", err);
      });
    };
    const timeout = setTimeout(() => {
      terminate("timeout");
    }, timeoutMs);

    const collect = (chunk) => {
      const buffer = Buffer.from(chunk);
      const availableBytes = MAX_OUTPUT_BYTES - outputBytes;
      if (availableBytes > 0) {
        const kept = buffer.subarray(0, availableBytes);
        output.push(kept);
        outputBytes += kept.length;
      }
      if (buffer.length > availableBytes && !terminationReason) {
        terminate("output_limit");
      }
    };

    child.stdout.on("data", collect);
    child.stderr.on("data", collect);
    child.once("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    child.once("close", async (exitCode, signal) => {
      clearTimeout(timeout);
      await terminationPromise;
      const suffix = terminationReason === "timeout"
        ? "\n[Process stopped: time limit exceeded]"
        : terminationReason === "output_limit"
          ? "\n[Process stopped: output limit exceeded]"
          : "";
      resolve({
        exitCode: terminationReason ? -1 : exitCode,
        output: Buffer.concat(output).toString("utf8") + suffix,
        timedOut: terminationReason === "timeout",
        outputLimitExceeded: terminationReason === "output_limit",
        signal,
      });
    });
  });
}

app.post("/run", requireAuth, compilerRateLimit, async (req, res) => {
  const { code } = req.body;
  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "C source code is required." });
  }
  if (Buffer.byteLength(code, "utf8") > MAX_CODE_BYTES) {
    return res.status(413).json({ error: "C source code exceeds the 32 KB limit." });
  }
  if (activeCompilerJobs >= MAX_CONCURRENT_COMPILERS) {
    return res.status(503).json({ error: "The compiler is busy. Try again shortly." });
  }

  activeCompilerJobs += 1;
  let workDir;
  try {
    workDir = await fs.mkdtemp(path.join(os.tmpdir(), "careertree-run-"));
    const srcPath = path.join(workDir, "main.c");
    const binPath = path.join(workDir, process.platform === "win32" ? "program.exe" : "program");
    await fs.writeFile(srcPath, code, { encoding: "utf8", flag: "wx" });

    const compilation = await runBoundedProcess(
      "gcc",
      [srcPath, "-o", binPath, "-Wall"],
      workDir,
      COMPILE_TIMEOUT_MS
    );
    if (compilation.exitCode !== 0) {
      return res.status(compilation.timedOut ? 408 : 422).json({
        error: compilation.output || (compilation.timedOut ? "Compilation timed out." : "GCC compilation failed."),
        stage: "compile",
        timedOut: compilation.timedOut,
        outputLimitExceeded: compilation.outputLimitExceeded,
      });
    }

    const result = await runBoundedProcess(binPath, [], workDir, RUN_TIMEOUT_MS);
    return res.json(result);
  } catch (err) {
    console.error("C compilation or execution failed:", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "C program could not be compiled or executed." });
    }
  } finally {
    activeCompilerJobs -= 1;
    if (workDir) {
      try {
        await fs.rm(workDir, { recursive: true, force: true });
      } catch (err) {
        console.error("Failed to remove compiler workspace:", err);
      }
    }
  }
});

app.post("/user_progress/status", requireAuth, (req, res) => {
  const { map, topic } = req.body;
  const userId = req.userId;
  const sql = "SELECT completed FROM user_progress WHERE user_id=? AND map_name=? AND topic_name=?";
  db.query(sql, [userId, map, topic], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.json({ completed: 0 });
    res.json(results[0]);
  });
});

app.post("/user_progress/update", requireAuth, (req, res) => {
  const { map, topic, completed } = req.body;
  const userId = req.userId;
  const sql = `
    INSERT INTO user_progress (user_id, map_name, topic_name, completed, completed_at)
    VALUES (?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE completed=?, completed_at=NOW()
  `;
  db.query(sql, [userId, map, topic, completed, completed], (err) => {
    if (err) return res.status(500).json({ error: "DB update failed" });
    res.json({ success: true });
  });
});

app.post("/user_progress/steps", requireAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const [rows] = await db.promise().query(
      `SELECT map_name, SUM(completed) as completed
   FROM user_progress
   WHERE user_id = ?
   GROUP BY map_name`,
      [userId]
    );
    const progress = {};
    rows.forEach(row => {
      progress[row.map_name] = row.completed;
    });
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/user/handles", requireAuth, (req, res) => {
  const userId = req.userId;
  const query = "SELECT codeforces_handle, leetcode_username FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching handles:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) return res.json({});
    res.json(results[0]);
  });
});

app.post("/user/update_handles", requireAuth, (req, res) => {
  const { codeforces_handle, leetcode_username } = req.body;
  const userId = req.userId;
  const query = `
    UPDATE users
    SET codeforces_handle = ?, leetcode_username = ?
    WHERE id = ?
  `;
  db.query(query, [codeforces_handle, leetcode_username, userId], (err, result) => {
    if (err) {
      console.error("❌ Error saving handles:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      console.warn("⚠️ No user found with id:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("✅ Handles updated successfully for user:", userId);
    res.json({ success: true });
  });
});
async function fetchTimelineData(keyword) {
  if (!API_KEY) throw new Error("SERPAPI_KEY is not configured.");
  for (let i = 0; i < 3; i++) {
    try {
      const results = await getJson({
        engine: "google_trends",
        q: keyword,
        data_type: "TIMESERIES",
        geo: "US",
        hl: "en",
        api_key: API_KEY,
        timeout: 30000,
      });
      return results;
    } catch (err) {
      console.warn(`Timeline Attempt ${i + 1} failed for ${keyword}:`, err.message);
    }
  }
  throw new Error(`Failed to fetch TIMELINE for ${keyword}`);
}

async function fetchRelatedTopics(keyword) {
  if (!API_KEY) throw new Error("SERPAPI_KEY is not configured.");
  for (let i = 0; i < 3; i++) {
    try {
      const results = await getJson({
        engine: "google_trends",
        q: keyword,
        data_type: "RELATED_TOPICS",
        geo: "US",
        hl: "en",
        api_key: API_KEY,
        timeout: 30000,
      });
      return results;
    } catch (err) {
      console.warn(`Related Topics Attempt ${i + 1} failed for ${keyword}:`, err.message);
    }
  }
  throw new Error(`Failed to fetch RELATED_TOPICS for ${keyword}`);
}

function formatTimeline(timeline) {
  if (!Array.isArray(timeline.timeline_data)) return [];
  return timeline.timeline_data.map((point, index) => ({
    value: point.value || point.values?.[0] || point.formattedValue || index + 1,
    formattedTime: point.formattedTime || point.formattedAxisTime || point.time || `Day ${index + 1}`,
  }));
}

async function fetchTrendPayload(keyword) {
  const [timeline, related] = await Promise.all([
    fetchTimelineData(keyword),
    fetchRelatedTopics(keyword),
  ]);
  return {
    keyword,
    timeline_data: formatTimeline(timeline),
    related_topics: related.related_topics || { rising: [], top: [] },
    success: true,
  };
}

const trendsInFlight = new Map();

async function getCachedOrFetchTrends(keyword) {
  const trimmedKeyword = typeof keyword === "string" ? keyword.trim() : "";
  if (!trimmedKeyword || Buffer.byteLength(trimmedKeyword, "utf8") > 255) {
    throw new Error("Keyword must be between 1 and 255 UTF-8 bytes.");
  }
  const normalizedKeyword = trimmedKeyword.toLowerCase();
  const [rows] = await db.promise().execute(
    `SELECT payload, fetched_at >= DATE_SUB(NOW(), INTERVAL 1 DAY) AS is_fresh
     FROM trends_cache WHERE keyword = ?`,
    [normalizedKeyword]
  );
  const cached = rows[0];
  if (cached?.is_fresh) {
    return typeof cached.payload === "string" ? JSON.parse(cached.payload) : cached.payload;
  }
  if (trendsInFlight.has(normalizedKeyword)) return trendsInFlight.get(normalizedKeyword);

  const refresh = (async () => {
    const payload = await fetchTrendPayload(trimmedKeyword);
    await db.promise().execute(
      `INSERT INTO trends_cache (keyword, payload, fetched_at)
       VALUES (?, ?, NOW())
       ON DUPLICATE KEY UPDATE payload = VALUES(payload), fetched_at = VALUES(fetched_at)`,
      [normalizedKeyword, JSON.stringify(payload)]
    );
    return payload;
  })();
  trendsInFlight.set(normalizedKeyword, refresh);
  try {
    return await refresh;
  } finally {
    trendsInFlight.delete(normalizedKeyword);
  }
}

const scheduledTrendKeywords = ["JavaScript", "Python", "C++", "React", "AI"];

async function refreshScheduledTrends() {
  for (const keyword of scheduledTrendKeywords) {
    try {
      await getCachedOrFetchTrends(keyword);
      console.log(`Refreshed Google Trends cache for ${keyword}`);
    } catch (err) {
      console.error(`Google Trends refresh failed for ${keyword}:`, err.message);
    }
  }
}

if (API_KEY) {
  cron.schedule("0 0 * * *", refreshScheduledTrends, { timezone: "UTC" });
} else {
  console.warn("Google Trends refresh is disabled because SERPAPI_KEY is not configured.");
}

app.get("/api/timeline/:keyword", trendsRateLimit, validateTrendKeyword, async (req, res) => {
  try {
    const data = await getCachedOrFetchTrends(req.params.keyword);
    res.json({
      keyword: data.keyword,
      timeline_data: data.timeline_data,
      success: data.success,
    });
  } catch (err) {
    console.error("Timeline fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch timeline data.", success: false });
  }
});

app.get("/api/related-topics/:keyword", trendsRateLimit, validateTrendKeyword, async (req, res) => {
  try {
    const data = await getCachedOrFetchTrends(req.params.keyword);
    res.json({
      keyword: data.keyword,
      related_topics: data.related_topics,
      success: data.success,
    });
  } catch (err) {
    console.error("Related topics fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch related topics.", success: false });
  }
});

app.get("/api/trends/:keyword", trendsRateLimit, validateTrendKeyword, async (req, res) => {
  try {
    res.json(await getCachedOrFetchTrends(req.params.keyword));
  } catch (err) {
    console.error("Combined Trends fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch Trends data.", success: false });
  }
});

registerHeatmapRoutes(app, db, requireAuth);

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));