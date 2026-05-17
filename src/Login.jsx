import React, { useState } from "react";
import "./Login.css";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");
  const backendURL = "http://localhost:5000";
  const handleLogin = async () => {
    if (!email || !password) return setMessage("Please enter email and password");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin({ email, userId: data.userId });
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };
  const handleSignup = async () => {
    if (!email || !password) return setMessage("Please enter email and password");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verify");
        setMessage("OTP sent to your email");
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!otp) return setMessage("Please enter OTP");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin({ email, userId: data.userId });
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };
  const handleForgot = async () => {
    if (!email) return setMessage("Please enter your email");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verifyReset");
        setMessage("OTP sent to your email");
      } else {
        setMessage(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };
  const handleVerifyReset = async () => {
    if (!otp) return setMessage("Please enter OTP");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("reset");
        setMessage("OTP verified. You can now reset your password.");
      } else {
        setMessage(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };
  const handleResetPassword = async () => {
    if (!newPassword) return setMessage("Please enter new password");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${backendURL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("login");
        setMessage("Password reset successful. Please log in.");
      } else {
        setMessage(data.error || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
    setLoading(false);
  };
  return (
    <div className="page-login">
      <div className="card-login">
        <h1 className="title-login">🌳 Career Tree</h1>
        <p className="subtitle-login">
          {step === "login"
            ? "Sign in"
            : step === "signup"
            ? "Create account"
            : step === "verify"
            ? "Verify OTP"
            : step === "forgot"
            ? "Forgot Password"
            : step === "verifyReset"
            ? "Verify Reset OTP"
            : "Reset Password"}
        </p>
        {step === "login" && (
          <div className="form-login">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-login"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p>
              <span onClick={() => setStep("forgot")} className="link">
                Forgot password?
              </span>
            </p>
            <p>
              No account?{" "}
              <span onClick={() => setStep("signup")} className="link">
                Sign up
              </span>
            </p>
          </div>
        )}
        {step === "signup" && (
          <div className="form-login">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-login"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleSignup}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setStep("login")} className="link">
                Login
              </span>
            </p>
          </div>
        )}
        {step === "verify" && (
          <div className="form-login">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
        {step === "forgot" && (
          <div className="form-login">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleForgot}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p>
              <span onClick={() => setStep("login")} className="link">
                Back to login
              </span>
            </p>
          </div>
        )}
        {step === "verifyReset" && (
          <div className="form-login">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleVerifyReset}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
        {step === "reset" && (
          <div className="form-login">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-login"
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="button-login"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}