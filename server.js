import express from "express";
import mysql from "mysql2";
import { exec, spawn } from "child_process";
import cors from "cors";
import fs from "fs";
import path from "path";
import os from "os";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getJson } from "serpapi";
import registerHeatmapRoutes from "./heatserver.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Must run before accessing process.env
const API_KEY = process.env.SERPAPI_KEY;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,   
  },
});

let otpStore = {};
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.get("/", (req, res) => {
  res.send("C Compiler API is running. Use POST /run to compile code.");
});
app.post("/run", (req, res) => {
  const code = req.body.code || "";
  const src = path.join(os.tmpdir(), "temp.c");
  const bin = path.join(os.tmpdir(), "temp.exe");
  fs.writeFileSync(src, code);
  exec(`gcc "${src}" -o "${bin}"`, (err, stdout, stderr) => {
    if (err) {
      return res.json({ error: stderr.toString() });
    }
    const proc = spawn(bin, [], { timeout: 2000 });
    let output = "";
    proc.stdout.on("data", (d) => (output += d.toString()));
    proc.stderr.on("data", (d) => (output += d.toString()));
    proc.on("close", (exitCode) => {
      res.json({ exitCode, output });
      try {
        fs.unlinkSync(src);
        fs.unlinkSync(bin);
      } catch { }
    });
  });
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email & password required" });
  const otp = generateOTP();
  otpStore[email] = { otp, password, createdAt: Date.now() };
  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}, expires in 5 minutes`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email & password required" });
  const sql = "SELECT id FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error logging in" });
    if (results.length > 0) {
      return res.json({ message: "Login successful", userId: results[0].id });
    }
    res.status(401).json({ error: "Invalid email or password" });
  });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (!record) return res.status(400).json({ error: "No OTP found for this email" });
  if (Date.now() - record.createdAt > 5 * 60 * 1000) return res.status(400).json({ error: "OTP expired" });
  if (record.otp === otp) {
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, record.password], (err, result) => {
      if (err) return res.status(500).json({ error: "Error creating account" });
      delete otpStore[email];
      return res.json({ message: "Account created successfully!", userId: result.insertId });
    });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  const sql = "SELECT id FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    const otp = generateOTP();
    otpStore[email] = { otp, type: "reset", createdAt: Date.now() };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is ${otp}. It expires in 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "OTP sent to your email" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error sending OTP" });
    }
  });
});

app.post("/verify-reset-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (!record || record.type !== "reset")
    return res.status(400).json({ error: "No reset OTP found for this email" });
  if (Date.now() - record.createdAt > 5 * 60 * 1000)
    return res.status(400).json({ error: "OTP expired" });
  if (record.otp !== otp)
    return res.status(400).json({ error: "Invalid OTP" });
  otpStore[email].verified = true;
  res.json({ message: "OTP verified successfully" });
});

app.post("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;
  const record = otpStore[email];
  if (!record || !record.verified)
    return res.status(400).json({ error: "OTP not verified" });

  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) return res.status(500).json({ error: "Error updating password" });
    delete otpStore[email];
    res.json({ message: "Password reset successfully" });
  });
});


app.post("/user_progress/status", (req, res) => {
  const { userId, map, topic } = req.body;
  const sql = "SELECT completed FROM user_progress WHERE user_id=? AND map_name=? AND topic_name=?";
  db.query(sql, [userId, map, topic], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.json({ completed: 0 });
    res.json(results[0]);
  });
});

app.post("/user_progress/update", (req, res) => {
  const { userId, map, topic, completed } = req.body;
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

app.post("/user_progress/steps", async (req, res) => {
  const { userId } = req.body;
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

app.post("/user/handles", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
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

app.post("/user/update_handles", (req, res) => {
  const { userId, codeforces_handle, leetcode_username } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
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
// Separate function for timeline data
async function fetchTimelineData(keyword) {
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

// Separate function for related topics
async function fetchRelatedTopics(keyword) {
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

// Separate endpoint for timeline data only
app.get("/api/timeline/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log("📊 Fetching Timeline for:", keyword);

  try {
    const timeline = await fetchTimelineData(keyword);
    
    // Log the exact structure for debugging
    console.log("=== TIMELINE RAW DATA ===");
    console.log("Full response keys:", Object.keys(timeline));
    console.log("Has timeline_data:", !!timeline.timeline_data);
    console.log("timeline_data type:", typeof timeline.timeline_data);
    
    if (timeline.timeline_data) {
      console.log("Is array:", Array.isArray(timeline.timeline_data));
      console.log("Number of points:", timeline.timeline_data.length);
      if (timeline.timeline_data.length > 0) {
        console.log("First point:", timeline.timeline_data[0]);
        console.log("First point keys:", Object.keys(timeline.timeline_data[0]));
      }
    }

    // Transform data for chart
    let timelineData = [];
    if (timeline.timeline_data && Array.isArray(timeline.timeline_data)) {
      timelineData = timeline.timeline_data.map((point, index) => {
        // Try different possible value fields
        const value = point.value || 
                     (point.values && point.values[0]) || 
                     point.formattedValue || 
                     index + 1;
        
        // Try different possible time fields
        const formattedTime = point.formattedTime || 
                             point.formattedAxisTime || 
                             point.time || 
                             `Day ${index + 1}`;

        return {
          value: value,
          formattedTime: formattedTime,
          raw: point // Keep original for reference
        };
      });
    }

    res.json({
      keyword,
      timeline_data: timelineData,
      original_data: timeline.timeline_data, // Include original for comparison
      success: true
    });
  } catch (err) {
    console.error("❌ Timeline fetch failed:", err.message);
    res.status(500).json({ 
      error: "Failed to fetch timeline data",
      details: err.message,
      success: false
    });
  }
});

// Separate endpoint for related topics only
app.get("/api/related-topics/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log("🔗 Fetching Related Topics for:", keyword);

  try {
    const related = await fetchRelatedTopics(keyword);
    
    console.log("=== RELATED TOPICS RAW DATA ===");
    console.log("Full response keys:", Object.keys(related));
    console.log("Has related_topics:", !!related.related_topics);

    res.json({
      keyword,
      related_topics: related.related_topics || { rising: [], top: [] },
      success: true
    });
  } catch (err) {
    console.error("❌ Related topics fetch failed:", err.message);
    res.status(500).json({ 
      error: "Failed to fetch related topics",
      details: err.message,
      success: false
    });
  }
});

// Keep the original combined endpoint for backward compatibility
app.get("/api/trends/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log("🔍 Fetching All Trends for:", keyword);

  try {
    const [timeline, related] = await Promise.all([
      fetchTimelineData(keyword),
      fetchRelatedTopics(keyword)
    ]);

    // Transform timeline data
    let timelineData = [];
    if (timeline.timeline_data && Array.isArray(timeline.timeline_data)) {
      timelineData = timeline.timeline_data.map((point, index) => {
        const value = point.value || 
                     (point.values && point.values[0]) || 
                     point.formattedValue || 
                     index + 1;
        
        const formattedTime = point.formattedTime || 
                             point.formattedAxisTime || 
                             point.time || 
                             `Day ${index + 1}`;

        return {
          value: value,
          formattedTime: formattedTime
        };
      });
    }

    res.json({
      keyword,
      timeline_data: timelineData,
      related_topics: related.related_topics || { rising: [], top: [] },
      success: true
    });
  } catch (err) {
    console.error("❌ Combined trends fetch failed:", err.message);
    res.status(500).json({ 
      error: "Failed to fetch trends data",
      details: err.message,
      success: false
    });
  }
});
registerHeatmapRoutes(app, db);

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));