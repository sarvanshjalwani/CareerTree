import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { API_URL } from "./api";
import "./Trends.css"
const Trends = () => {
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [relatedTopics, setRelatedTopics] = useState({ rising: [], top: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchTrends = async (kw) => {
    if (!kw || kw.trim() === "") {
      setTimeline([]);
      setRelatedTopics({ rising: [], top: [] });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/trends/${encodeURIComponent(kw)}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      const timelineData = data.timeline_data || [];
      const formattedTimeline = timelineData.map(item => ({
        ...item,
        formattedTime: item.formattedTime || item.time || item.date || '',
        value: item.value || item.values || 0
      })); 
      setTimeline(formattedTimeline);
      setRelatedTopics(data.related_topics || { rising: [], top: [] });
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch trends. Make sure your backend is running.");
      setTimeline([]);
      setRelatedTopics({ rising: [], top: [] });
    }
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedKeyword = inputValue.trim();
    if (trimmedKeyword) {
      setKeyword(trimmedKeyword);
      fetchTrends(trimmedKeyword);
    }
  };
  return (
    <div className="trends-container">
      <h2 className="trends-title">Trends</h2>
      <form onSubmit={handleSubmit} className="trends-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter keyword"
          className="trends-input"
        />
        <button type="submit" className="trends-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="trends-error">{error}</p>}
      {loading && <p className="trends-loading">Loading trends for "{keyword}"...</p>}
      {!loading && timeline.length > 0 && (
        <div className="trends-timeline">
          <h3 className="trends-subtitle">Timeline for "{keyword}"</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeline} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis 
                dataKey="formattedTime" 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {!loading && relatedTopics.top && relatedTopics.top.length > 0 && (
        <div className="trends-related-top">
          <h3 className="trends-subtitle">Top Related Topics</h3>
          <ul className="trends-list">
            {relatedTopics.top.map((topic, idx) => (
              <li key={idx} className="trends-list-item">
                  {topic.topic?.title || topic.title}        
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && keyword && timeline.length === 0 && relatedTopics.top.length === 0 && (
        <p className="trends-no-data">No data available for "{keyword}"</p>
      )}
    </div>
  );
};
export default Trends;