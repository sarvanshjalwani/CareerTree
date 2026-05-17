import React from "react";
import "./Header.css";
export default function Header() {
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
        </ul>
      </nav>
    </header>
  );
}