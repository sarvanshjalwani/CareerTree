import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_CHANGE_EVENT, getAuthToken, setAuthToken } from "./api";
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
          <li><a href="/home">Home</a></li>
          <li><a href="/Skills">Skills</a></li>
          <li id="Profile">
            <a href="/Profile"><img
              src="profile.png"
              alt="Profile"
              width="30"
              height="30"
            /></a>
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