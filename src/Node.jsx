import React from "react";
import "./Node.css";
import Check from "./Check";
const Node = ({ id, position, text, isSubnode = false, onClick, userId, map }) => {
  return (
    <div
      className="node"
      style={{
        position: "absolute",
        top: position?.y,
        left: position?.x,
        zIndex: 10,
        transform: "translate(-50%, -50%)",
      }}
    >
      {isSubnode && <Check text={text} map={map} userId={userId} />}
      <button
        onClick={isSubnode ? onClick : undefined}
        className={`btn ${!isSubnode ? "disabled" : ""}`}
      >
        <div className="wrapper">
          <p className="text">{text}</p>
          {[...Array(6)].map((_, i) => (
            <div key={`${id}-flower-${i}`} className={`flower flower${i + 1}`}>
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
          ))}
        </div>
      </button>
    </div>
  );
};
export default Node;