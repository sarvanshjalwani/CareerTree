import React, { useState, useEffect } from "react";
import "./Check.css";
import { authFetch } from "./api";
const Check = ({ text, map, userId, backendURL = "http://localhost:5000" }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!userId || !map || !text) return;
    const fetchStatus = async () => {
      try {
        const res = await authFetch(`${backendURL}/user_progress/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ map, topic: text }),
        });
        const data = await res.json();
        setChecked(data.completed === 1);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchStatus();
  }, [userId, map, text, backendURL]);
  const handleChange = async () => {
    if (!userId) return alert("Please log in first");
    const newValue = !checked;
    setChecked(newValue);
    try {
      await authFetch(`${backendURL}/user_progress/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ map, topic: text, completed: newValue ? 1 : 0 }),
      });
    } catch (err) {
      console.error("Error updating progress:", err);
      setChecked(!newValue);
    }
  };
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <svg viewBox="0 0 44 44" className="sizer checkmark">
        <path
          d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
          transform="translate(-2.000000, -2.000000)"
          className={checked ? "checked" : ""}
        />
      </svg>
    </label>
  );
};
export default Check;