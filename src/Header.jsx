import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CHANGE_EVENT, getAuthToken, setAuthToken } from "./api";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";
export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));
  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthState = () => setIsAuthenticated(Boolean(getAuthToken()));
    window.addEventListener(AUTH_CHANGE_EVENT, updateAuthState);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, updateAuthState);
  }, []);

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <h1> <img height="60" src="logo2.png" alt="" /> Career Tree</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><ThemeToggle /></li>
          <li id="Profile">
            <Link to="/profile"><img
              src="profile.png"
              alt="Profile"
              width="30"
              height="30"
            /></Link>
          </li>
          {isAuthenticated && (
            <li>
              <button type="button" className="logout-button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}