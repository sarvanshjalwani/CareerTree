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
        <p className="home-eyebrow">YOUR NEXT SKILL STARTS HERE</p>
        <h1>Grow Your Career, Branch by Branch 🌱</h1>
        <p>
          Build programming foundations with focused roadmaps, hands-on practice,
          and progress tracking designed to keep you moving forward.
        </p>
        <div className="home-actions">
          <Link className="start-button" to="/login">Start learning</Link>
          <Link className="home-secondary-button" to="/about">Discover Career Tree</Link>
        </div>
      </main>
      <section className="home-highlights">
        <article><span aria-hidden="true">🌿</span><h2>Learn in clear steps</h2><p>Follow focused paths through C, C++, data structures, and full-stack web development.</p></article>
        <article><span aria-hidden="true">🧩</span><h2>Practice what you learn</h2><p>Open lessons, explore examples, and take on practice questions.</p></article>
        <article><span aria-hidden="true">🌳</span><h2>Keep growing</h2><p>Save your progress and see your learning journey take shape.</p></article>
      </section>

      <Footer />
    </div>
  );
};
export default HomePage;