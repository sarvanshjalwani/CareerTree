import React, { useEffect, useState } from "react";
import Header from "./Header";
import Vines from "./Vines";
import "./Skills.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import CourseCard from "./Card1";
import { authFetch } from "./api";
const Skills = ({ user, backendURL = "http://localhost:5000" }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({}); 
  const handleCourseClickC = () => {
    navigate("/details_c"); 
  };
  const handleCourseClickD = () => {
    navigate("/details_dsa"); 
  };
  const handleCourseClickWeb = () => {
    navigate("/web-development");
  };
  const userId = user.userId;
  useEffect(() => {
    if (!userId) return;
    const fetchProgress = async () => {
      try {
        const res = await authFetch(`${backendURL}/user_progress/steps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json(); 
        setProgress(data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, [userId, backendURL]);
  const toggleStep = async (map, topic, isChecked) => {
    try {
      await authFetch(`${backendURL}/user_progress/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          map,
          topic,
          completed: isChecked ? 1 : 0
        }),
      });
      setProgress(prev => ({
        ...prev,
        [map]: isChecked ? (prev[map] || 0) + 1 : Math.max((prev[map] || 1) - 1, 0)
      }));
    } catch (err) {
      console.error("Error updating step:", err);
    }
  };
  return (
    <>
      <Vines />
      <Header />
      <main className="skills-page">
        <section className="skills-intro">
          <p className="skills-eyebrow">YOUR LEARNING PATH</p>
          <h1>Choose a roadmap and grow your skills</h1>
          <p>
            Start with a topic that interests you, open its roadmap, and work through
            the lessons at your own pace. Mark topics complete as you learn; your
            progress is saved to your account.
          </p>
        </section>
      <div className="cards">
        <CourseCard
          title="C"
          description="Build programming foundations with C, from the basics to practical concepts."
          logo="c.png"
          total={31}
          completed={progress["C"] || 0} 
          onClick={handleCourseClickC}
          toggleStep={(topic, isChecked) => toggleStep("C", topic, isChecked)} 
        />
        <CourseCard
          title="DSA"
          description="Learn C++ fundamentals, core data structures, and problem-solving algorithms."
          logo="dsa.jpg"
          total={28}
          completed={progress["DSA"] || 0} 
          onClick={handleCourseClickD}
          toggleStep={(topic, isChecked) => toggleStep("DSA", topic, isChecked)} 
        />
        <CourseCard
          title="Web Development"
          description="Build full-stack web skills with HTML, CSS, JavaScript, React, Node, and databases."
          logo="logo.png"
          total={20}
          completed={progress["Web Development"] || 0}
          onClick={handleCourseClickWeb}
          toggleStep={(topic, isChecked) => toggleStep("Web Development", topic, isChecked)}
        />
      </div>
      </main>
      <Footer />
    </>
  );
}
export default Skills;