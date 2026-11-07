import React from "react";
import { Link } from "react-router-dom";
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
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
          </ul>
        </div>
        <div className="footer-col links">
          <h3>Support</h3>
          <ul>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-col linkz">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="mailto:jalwanis2005@gmail.com">Email Career Tree</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career Tree. For learning and practice.</p>
      </div>
    </footer>
  );
}