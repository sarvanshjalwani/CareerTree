import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { apiRequest, AUTH_CHANGE_EVENT, getAuthToken, setAuthToken } from "./api";
import Map from "./Map";
import Map2 from "./Map2"
import Skills from "./Skills";
import C from "./C";
import Profile from "./Profile";
import AuthPage from "./Login";
import HomePage from "./Home";
import "./loader.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    let active = true;
    const restoreSession = async () => {
      if (!getAuthToken()) {
        setLoading(false);
        return;
      }
      try {
        const session = await apiRequest("/auth/me");
        if (active) setUser(session);
      } catch (error) {
        if (active) {
          setAuthToken(null);
          setAuthMessage(error.message || "Your session expired. Please sign in again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    const handleAuthChange = () => {
      if (!getAuthToken()) setUser(null);
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    restoreSession();
    return () => {
      active = false;
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  const handleLogin = (session) => {
    setAuthToken(session.token);
    setUser(session.user);
    setAuthMessage("");
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
  };

  if (loading)
    return (
      <div className="loader">
        <div className="hacker-loader">
          <div className="binary-ring"></div>
          <div className="core"></div>
          <div className="binary-digits">
            <span>0</span><span>1</span><span>0</span><span>1</span>
            <span>1</span><span>0</span><span>1</span><span>0</span>
          </div>
          <div className="loading-text">Loading</div>
        </div>
      </div>);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <AuthPage onLogin={handleLogin} initialMessage={authMessage} /> : <Navigate to="/skills" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/details_c" element={user ? <Map user={user} /> : <Navigate to="/login" />} />
        <Route path="/details_dsa" element={user ? <Map2 user={user} /> : <Navigate to="/login" />} />
        <Route path="/c" element={user ? <C user={user} /> : <Navigate to="/login" />} />
        <Route path="/skills" element={user ? <Skills user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
