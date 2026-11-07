import React, { useState } from "react";
import { apiRequest } from "./api";
import ThemeToggle from "./ThemeToggle";
import "./Login.css";

async function postJson(path, body) {
  return apiRequest(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export default function Login({ onLogin, initialMessage = "" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");

  const submit = async (action) => {
    setLoading(true);
    setMessage("");
    try {
      await action();
    } catch (error) {
      setMessage(error.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!email || !password) return setMessage("Enter your email and password.");
    return submit(async () => onLogin(await postJson("/auth/login", { email, password })));
  };

  const handleSignup = () => {
    if (!email || !password) return setMessage("Enter your email and password.");
    return submit(async () => {
      const response = await postJson("/auth/signup", { email, password });
      setStep("verify");
      setMessage(response.message);
    });
  };

  const handleVerifySignup = () => {
    if (!otp) return setMessage("Enter the verification code from your email.");
    return submit(async () => {
      const session = await postJson("/auth/verify-signup", { email, otp });
      onLogin(session);
    });
  };

  const handleForgot = () => {
    if (!email) return setMessage("Enter your email address.");
    return submit(async () => {
      const response = await postJson("/auth/forgot-password", { email });
      setStep("reset");
      setMessage(response.message);
    });
  };

  const handleResetPassword = () => {
    if (!otp || !newPassword) {
      return setMessage("Enter the reset code and your new password.");
    }
    return submit(async () => {
      const response = await postJson("/auth/reset-password", { email, otp, newPassword });
      setStep("login");
      setOtp("");
      setNewPassword("");
      setMessage(response.message);
    });
  };

  const switchStep = (nextStep) => {
    setStep(nextStep);
    setMessage("");
    setOtp("");
  };

  return (
    <div className="page-login">
      <div className="card-login">
        <div className="login-theme-toggle"><ThemeToggle /></div>
        <h1 className="title-login">🌳 Career Tree</h1>
        <p className="subtitle-login">
          {step === "login"
            ? "Sign in"
            : step === "signup"
              ? "Create account"
              : step === "verify"
                ? "Verify your email"
                : "Reset password"}
        </p>
        <p className="auth-description">
          {step === "login"
            ? "Sign in to continue your coding roadmaps and saved progress."
            : step === "signup"
              ? "Create an account to save completed topics and access your learning dashboard."
              : step === "verify"
                ? "Enter the six-digit code sent to your email to verify your account."
                : step === "forgot"
                  ? "Enter your account email and we will send a password reset code if an account is registered."
                  : "Enter the reset code from your email and choose a new password."}
        </p>
        {step !== "verify" && (
          <div className="form-login">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-login"
              autoComplete="email"
            />
            {step === "signup" || step === "login" ? (
              <input
                type="password"
                placeholder="Enter password (at least 8 characters)"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-login"
                autoComplete={step === "signup" ? "new-password" : "current-password"}
              />
            ) : (
              <>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="6-digit reset code"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="input-login"
                />
                <input
                  type="password"
                  placeholder="New password (at least 8 characters)"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="input-login"
                  autoComplete="new-password"
                />
              </>
            )}
            {step === "login" && (
              <>
                <button onClick={handleLogin} disabled={loading} className="button-login">
                  {loading ? "Signing in..." : "Login"}
                </button>
                <p><span onClick={() => switchStep("forgot")} className="link">Forgot password?</span></p>
                <p>
                  No account?{" "}
                  <span onClick={() => switchStep("signup")} className="link">Sign up</span>
                </p>
              </>
            )}
            {step === "signup" && (
              <>
                <button onClick={handleSignup} disabled={loading} className="button-login">
                  {loading ? "Sending code..." : "Sign up"}
                </button>
                <p>
                  Already registered?{" "}
                  <span onClick={() => switchStep("login")} className="link">Login</span>
                </p>
              </>
            )}
            {step === "forgot" && (
              <>
                <button onClick={handleForgot} disabled={loading} className="button-login">
                  {loading ? "Sending code..." : "Send password reset code"}
                </button>
                <p><span onClick={() => switchStep("login")} className="link">Back to login</span></p>
              </>
            )}
            {step === "reset" && (
              <>
                <button onClick={handleResetPassword} disabled={loading} className="button-login">
                  {loading ? "Updating password..." : "Reset password"}
                </button>
                <p><span onClick={() => switchStep("forgot")} className="link">Send a new reset code</span></p>
              </>
            )}
          </div>
        )}
        {step === "verify" && (
          <div className="form-login">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="6-digit verification code"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="input-login"
            />
            <button onClick={handleVerifySignup} disabled={loading} className="button-login">
              {loading ? "Verifying..." : "Verify email"}
            </button>
            <p>
              Code expired?{" "}
              <span onClick={handleSignup} className="link">Send another code</span>
            </p>
            <p><span onClick={() => switchStep("login")} className="link">Back to login</span></p>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
