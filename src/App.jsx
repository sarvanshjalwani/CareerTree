import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
        <Route path="/login" element={!user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/skills" />} />
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

