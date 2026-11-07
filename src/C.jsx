import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./C.css";
import Header from "./Header";
import Vines from "./Vines";
import Footer from "./Footer";
import { API_URL, authFetch } from "./api";
const C = () => {
  const location = useLocation();
  const { link = [], content = [], text, compiler, question = [] } =
    location.state || {};
  const [code, setCode] = useState(`#include <stdio.h>
int main() {
    printf("Hello from C!\\n");
    return 0;
}`);
  const [output, setOutput] = useState("");
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId[1]}`;
    }
    return url;
  };
  const runCode = async () => {
    setOutput("⏳ Running...");
    try {
      const res = await authFetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.error || data.output || "Program finished without output.");
    } catch {
      setOutput("❌ Error connecting to compiler server");
    }
  };
  return (
    <div>
      <Vines/>
      <Header/>
    <div className="c-container">
      <section className="lesson-guide">
        <p>LEARN · PRACTICE · REVIEW</p>
        <h1>Make this lesson your own</h1>
        <span>
          Read the lesson notes and watch the videos, then try the practice
          questions. When the compiler is available, experiment with a small
          program and compare its output with what you expect.
        </span>
      </section>
      <div className="title">{text}</div>
      <div className="player-container">
        {Array.isArray(link) &&
          link.map((video, index) => (
            <div className="player" key={index}>
              <iframe
                src={getYouTubeEmbedUrl(video)}
                title={`Video Player ${index + 1}`}
                width="100%"
                height="100%"
                allowFullScreen
              />
              <a
                className="video-open-link"
                href={video.trim()}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          ))}
      </div>
      <div className="content">
        {Array.isArray(content) ? (
          content.map((para, idx) => <p key={idx}>{para}</p>)
        ) : (
          <p>{content}</p>
        )}
      </div>
      {question.length > 0 && (
        <div className="questions">
          <h3>Practice Questions</h3>
          <ul>
            {question.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      )}
      {compiler && (
        <div className="compiler">
          <h3>Online Compiler</h3>
          <p>Write or edit your C program, select Run Code, and review the compiler output below.</p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="12"
            style={{
              width: "100%",
              background: "#222",
              color: "#0f0",
              fontFamily: "monospace",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
            }}
          />
          <button
            onClick={runCode}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Run Code
          </button>
          <h4>Output:</h4>
          <pre
            style={{
              background: "#000",
              color: "#0f0",
              padding: "10px",
              borderRadius: "5px",
              minHeight: "100px",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};
export default C;