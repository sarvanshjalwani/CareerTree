import Header from "./Header";
import Vines from "./Vines";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import Trends from "./Trends"
import Heatmap from "./Hello"
import { authFetch } from "./api";
export default function Profile({ user, onLogout, backendURL = "http://localhost:5000" }) {
  const [progress, setProgress] = useState({});
  const [cfHandle, setCfHandle] = useState("");
  const [lcUsername, setLcUsername] = useState("");
  const [cfSolved, setCfSolved] = useState(null);
  const [lcSolved, setLcSolved] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const userId = user?.userId;
  useEffect(() => {
    if (!userId) return;
    const fetchProgress = async () => {
      try {
        const res = await authFetch(`${backendURL}/user_progress/steps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setProgress(data || {});
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, [userId, backendURL]);
  useEffect(() => {
    if (!userId) return;
    const fetchHandles = async () => {
      try {
        const res = await authFetch(`${backendURL}/user/handles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.codeforces_handle) setCfHandle(data.codeforces_handle);
        if (data.leetcode_username) setLcUsername(data.leetcode_username);
        if (data.codeforces_handle || data.leetcode_username) {
          fetchStats(data.codeforces_handle, data.leetcode_username);
        }
      } catch (err) {
        console.error("Error fetching handles:", err);
      }
    };
    fetchHandles();
  }, [userId, backendURL]);
  const fetchStats = async (cf, lc) => {
    try {
      if (cf) {
        const res = await axios.get(
          `https://codeforces.com/api/user.status?handle=${encodeURIComponent(cf)}&from=1&count=10000`
        );
        const subs = res.data.result || [];
        const solved = new Set();
        subs.forEach((s) => {
          if (s.verdict === "OK") {
            solved.add(`${s.problem.contestId}-${s.problem.index}`);
          }
        });
        setCfSolved(solved.size);
      } else {
        setCfSolved(null);
      }
      if (lc) {
        const res = await axios.get(
          `https://leetcode-stats.tashif.codes/${encodeURIComponent(lc)}`
        );
        setLcSolved(res.data?.totalSolved ?? null);
      } else {
        setLcSolved(null);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setCfSolved(null);
      setLcSolved(null);
    }
  };
  const handleSaveHandles = async () => {
    if (!userId) return alert("User not logged in");
    if (!cfHandle && !lcUsername) return alert("Enter at least one handle!");
    setSaving(true);
    try {
      const res = await authFetch(`${backendURL}/user/update_handles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeforces_handle: cfHandle,
          leetcode_username: lcUsername,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Handles saved successfully!");
        setEditMode(false);
        fetchStats(cfHandle, lcUsername);
      } else {
        alert("Failed to save handles.");
      }
    } catch (err) {
      console.error("Error saving handles:", err);
      alert("Network error while saving handles.");
    } finally {
      setSaving(false);
    }
  };
  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };
  const skills = [
    { name: "C", completed: progress["C"] || 0, goal: 31 },
    { name: "DSA", completed: progress["DSA"] || 0, goal: 15 },
  ];
  return (
    <div className="page">
      <Vines />
      <Header />
      <h1 className="title">🚀 My Coding Roadmap</h1>
      <div className="sp">
      <div className="section">
        <h2>👤 Coding Handles</h2>
        {editMode || !cfHandle || !lcUsername ? (
          <div className="handles-form">
            <input
              type="text"
              placeholder="Codeforces handle"
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value.trim())}
            />
            <input
              type="text"
              placeholder="LeetCode username"
              value={lcUsername}
              onChange={(e) => setLcUsername(e.target.value.trim())}
            />
            <button onClick={handleSaveHandles} disabled={saving}>
              {saving ? "Saving..." : "Save Handles"}
            </button>
          </div>
        ) : (
          <div className="handles-display">
            <p><strong>Codeforces:</strong> {cfHandle}</p>
            <p><strong>LeetCode:</strong> {lcUsername}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </div>
      <div className="section">
        <h2>📚 Skill Progress</h2>
        {skills.map((skill) => {
          const percent = (skill.completed / skill.goal) * 100;
          return (
            <div key={skill.name} className="skill">
              <div className="skill-header">
                <span>{skill.name}</span>
                <span>
                  {skill.completed}/{skill.goal}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill blue"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div> </div>
      <div className="stats-grid">
        <div className="card">
          <h2>Codeforces</h2>
          <p className="number">{cfSolved ?? "..."}</p>
          <p className="label">problems solved</p>
        </div>
        <div className="card">
          <h2>LeetCode</h2>
          <p className="number">{lcSolved ?? "..."}</p>
          <p className="label">problems solved</p>
        </div>
      </div>
      <Trends
      />
      <Heatmap
      userId={userId}
      />
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogoutClick}>
          🚪 Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}