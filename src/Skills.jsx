import React, { useEffect, useState } from "react";
import Header from "./Header";
import Vines from "./Vines";
import "./Skills.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import CourseCard from "./Card1";
const Skills = ({ user, backendURL = "http://localhost:5000" }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({}); 
  const handleCourseClickC = () => {
    navigate("/details_c"); 
  };
  const handleCourseClickD = () => {
    navigate("/details_dsa"); 
  };
  const userId = user.userId;
  useEffect(() => {
    if (!userId) return;
    const fetchProgress = async () => {
      try {
        const res = await fetch(`${backendURL}/user_progress/steps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
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
      await fetch(`${backendURL}/user_progress/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
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
      <div className="cards">
        <CourseCard
          title="C"
          description="Begginer Language"
          logo="c.png"
          total={31}
          completed={progress["C"] || 0} 
          onClick={handleCourseClickC}
          toggleStep={(topic, isChecked) => toggleStep("C", topic, isChecked)} 
        />
        <CourseCard
          title="DSA"
          description="Top Structures and Algo"
          logo="dsa.jpg"
          total={15}
          completed={progress["DSA"] || 0} 
          onClick={handleCourseClickD}
          toggleStep={(topic, isChecked) => toggleStep("DSA", topic, isChecked)} 
        />
      </div>
      <Footer />
    </>
  );
}
export default Skills;