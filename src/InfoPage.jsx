import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Vines from "./Vines";
import Footer from "./Footer";
import "./InfoPage.css";

const CONTACT_EMAIL = "jalwanis2005@gmail.com";

const pages = {
  about: {
    eyebrow: "ABOUT CAREER TREE",
    title: "Grow your skills, one branch at a time.",
    intro: "Career Tree is a self-guided learning platform for people who want a clearer, more organized way to build programming fundamentals.",
    cards: [
      { icon: "🌱", title: "Structured roadmaps", text: "Explore guided learning paths for C programming and data structures and algorithms." },
      { icon: "💻", title: "Practice with purpose", text: "Study lesson material, explore examples, and work through practice questions as you progress." },
      { icon: "📈", title: "See your progress", text: "Keep track of completed topics and bring your learning activity together in your profile." },
    ],
    note: "Learn at your own pace. Career Tree is a practice companion—not a promise of employment or a substitute for official technical documentation.",
    action: { label: "Explore the roadmaps", to: "/skills" },
  },
  "how-it-works": {
    eyebrow: "YOUR LEARNING JOURNEY",
    title: "A simple path from curious to confident.",
    intro: "Choose a roadmap, learn a topic, practice what you learned, and keep moving forward.",
    cards: [
      { icon: "01", title: "Choose a path", text: "Open Skills and select the C programming or DSA roadmap that fits your goals." },
      { icon: "02", title: "Learn a topic", text: "Select a lesson to read its explanations, view available videos, and explore examples." },
      { icon: "03", title: "Practice and reflect", text: "Try the questions, experiment with C code when the compiler is available, and mark topics complete." },
      { icon: "04", title: "Review your growth", text: "Visit your profile to review roadmap progress, coding statistics, activity, and search trends." },
    ],
    note: "Progress is tied to your account. Sign in to save completed topics and revisit your dashboard.",
    action: { label: "Get started", to: "/login" },
  },
  contact: {
    eyebrow: "WE'RE HERE TO HELP",
    title: "Get in touch with Career Tree.",
    intro: "Questions about using the site, signing in, or your learning experience? Send us an email and include a short description of what you need.",
    cards: [
      { icon: "✉️", title: "Email support", text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { icon: "🧭", title: "Help us understand", text: "For technical issues, mention the page you were using and what happened. Never include your password, OTP, or other private credentials." },
    ],
    action: { label: "Email Career Tree", href: `mailto:${CONTACT_EMAIL}?subject=Career%20Tree%20support` },
  },
  feedback: {
    eyebrow: "HELP US GROW",
    title: "Your feedback shapes the next branch.",
    intro: "Tell us what is working well, what feels confusing, or which topics you would like to see added.",
    cards: [
      { icon: "✨", title: "Share an idea", text: "Suggest a feature, a roadmap improvement, or a new learning topic." },
      { icon: "🛠️", title: "Report a problem", text: "Describe what you expected and what happened instead. Include the page name, but leave out passwords and OTPs." },
      { icon: "💬", title: "Keep it constructive", text: "Clear, specific feedback helps us understand how to make Career Tree more useful for learners." },
    ],
    action: { label: "Send feedback", href: `mailto:${CONTACT_EMAIL}?subject=Career%20Tree%20feedback` },
  },
  terms: {
    eyebrow: "PLEASE READ",
    title: "Terms of use.",
    intro: "Career Tree is provided as a learning and practice tool. By using it, please follow these guidelines.",
    cards: [
      { icon: "🎓", title: "Learning use", text: "Use lessons and roadmaps for personal education and practice. Check official documentation when you need authoritative technical guidance." },
      { icon: "🔐", title: "Your account", text: "Keep your password and verification codes private. You are responsible for activity performed through your account." },
      { icon: "🌐", title: "Third-party services", text: "Google Trends, Codeforces, LeetCode, email providers, and embedded videos are external services. Their availability, data, and terms are managed by their respective providers." },
      { icon: "⚠️", title: "Code execution", text: "The C compiler uses execution timeouts, output limits, and temporary workspaces, but it is not a complete sandbox. Submitted programs still run as processes on the server host, so do not submit sensitive data or rely on it for secure isolation." },
      { icon: "🔄", title: "Availability and changes", text: "Features and data may change or become temporarily unavailable. Use the service with that limitation in mind." },
    ],
  },
};

export default function InfoPage({ page }) {
  const content = pages[page];
  if (!content) return null;

  return (
    <div className="info-page">
      <Vines />
      <Header />
      <main className="info-main">
        <section className="info-hero">
          <p className="info-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="info-intro">{content.intro}</p>
        </section>
        <section className={`info-cards${content.cards.length === 2 ? " info-cards-two" : ""}`} aria-label={content.eyebrow}>
          {content.cards.map((card) => (
            <article className="info-card" key={card.title}>
              <span className="info-card-icon" aria-hidden="true">{card.icon}</span>
              <h2>{card.title}</h2>
              <p>
                {card.href
                  ? <a href={card.href}>{card.text}</a>
                  : card.text}
              </p>
            </article>
          ))}
        </section>
        {content.note && <p className="info-note">{content.note}</p>}
        {content.action && (
          <div className="info-actions">
            {content.action.to
              ? <Link className="info-button" to={content.action.to}>{content.action.label}</Link>
              : <a className="info-button" href={content.action.href}>{content.action.label}</a>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
