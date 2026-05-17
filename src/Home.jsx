import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Vines from "./Vines";
import Footer from "./Footer";
import "./Home.css";
const HomePage = () => {
  return (
    <div className="homepage">
      <Vines />
      <Header />
      <main className="hero-section">
        <h1>Grow Your Career, Branch by Branch 🌱</h1>
        <p>
          Career Tree helps you explore and develop your skills to reach your dream career.
        </p>
        <Link className="start-button" to="/login">
          Start
        </Link>
      </main>
      <section id="about-us" className="hero-section">
        <div className="section-content">
          <h2>About Us</h2>
          <p>
            Career Tree is committed to empowering learners by providing interactive tools,
            skill tracking, and personalized growth paths. Our mission is to make career
            development accessible and engaging for everyone.
          </p>
        </div>
      </section>
      <section id="our-team" className="hero-section">
        <div className="section-content">
          <h2>Our Team</h2>
          <p>
            Our dedicated team of educators, developers, and career advisors work together
            to ensure Career Tree offers the best experience for your personal and professional growth.
          </p>
        </div>
      </section>
      <section id="contact-us" className="hero-section">
        <div className="section-content">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:career.tree.support@example.com">carrertree010@gmail.com</a></p>
        </div>
      </section>
      <section id="feedback" className="hero-section">
        <div className="section-content">
          <h2>Feedback</h2>
          <p>We’d love to hear from you!</p>
          <a className="feedback-button" href="mailto:career.tree.feedback@example.com">
            Send Feedback
          </a>
        </div>
      </section>
      <section id="terms" className="hero-section">
        <div className="section-content">
          <h2>Terms of Use</h2>
          <p>
            By using Career Tree, you agree to our terms of use. We respect your privacy
            and strive to provide a safe and helpful platform for career development.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default HomePage;