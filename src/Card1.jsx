import React from "react";
import EnrollButton from "./Button1";
import "./Card1.css";
import Progress from "./Progress";
const CourseCard = ({ title, description, total, completed, logo,onClick }) => {
  return (
    <div className="course-card">
      <div className="up">
        <h2 className="course-title">{title}</h2>
        <img src={logo} alt="" />
      </div>
      <p className="course-description">{description}</p>
      <Progress total={total} completed={completed} />
      <EnrollButton
        onClick={onClick} 
      />
    </div>
  );
};
export default CourseCard;