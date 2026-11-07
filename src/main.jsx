import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import "./theme.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
