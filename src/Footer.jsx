import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col about">
          <h1>Career Tree</h1>
          <p>
            Your partner in navigating the path to professional success and
            continuous learning.
          </p>
        </div>
        <div className="footer-col links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">About Us</a></li>
            <li><a href="/home">Our Team</a></li>
          </ul>
        </div>
        <div className="footer-col links">
          <h3>Support</h3>
          <ul>
            <li><a href="/home">Feedback</a></li>
            <li><a href="/home">Terms of Service</a></li>
            <li><a href="/home">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col linkz">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Career Tree. All Rights Reserved.</p>
      </div>
    </footer>
  );
}