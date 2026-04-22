import { useNavigate } from "react-router-dom";
import { Zap, Sparkles, Clock, BarChart2, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Prompt Engineering",
    desc: "Structured prompts for 8 content types — not a generic text box",
  },
  {
    icon: Clock,
    title: "Version History",
    desc: "Compare all your generations side-by-side like a Git diff for writing",
  },
  {
    icon: BarChart2,
    title: "AI Improvement Engine",
    desc: "Get a score and 3 specific suggestions on every piece of content",
  },
  {
    icon: Zap,
    title: "Token Analytics",
    desc: "Full visibility into AI usage and your content productivity",
  },
];

const contentTypes = [
  "Blog Post",
  "LinkedIn Post",
  "Tweet Thread",
  "Cold Email",
  "YouTube Script",
  "Instagram Caption",
  "Product Description",
  "Cold Outreach",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid var(--border)",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          <Zap size={20} color="#7c6aff" fill="#7c6aff" /> ContentForge
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px 60px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,106,255,0.08) 0%, transparent 60%)",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <span
          className="badge badge-purple"
          style={{ marginBottom: 24, display: "inline-flex" }}
        >
          <Sparkles size={12} /> Powered by Google Gemini AI
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 58px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            marginBottom: 20,
            maxWidth: 800,
            margin: "0 auto 20px",
          }}
        >
          Generate content that{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7c6aff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            actually sounds human
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--text2)",
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Not another generic AI wrapper. ContentForge uses structured prompt
          engineering, version control, and AI critique to make every piece of
          content exceptional.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
          style={{ padding: "14px 32px", fontSize: 16, marginBottom: 12 }}
        >
          Start Generating Free <ArrowRight size={18} />
        </button>
        <p style={{ fontSize: 13, color: "var(--text3)" }}>
          No credit card · Free forever
        </p>

        {/* Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            maxWidth: 600,
            margin: "40px auto 0",
          }}
        >
          {contentTypes.map((t) => (
            <span
              key={t}
              style={{
                padding: "6px 16px",
                borderRadius: 100,
                border: "1px solid var(--border)",
                fontSize: 13,
                color: "var(--text2)",
                background: "var(--bg2)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{ padding: "80px 60px", maxWidth: 1100, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Why ContentForge is different
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(124,106,255,0.1)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Icon size={22} color="#7c6aff" />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {title}
              </h3>
              <p
                style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.6 }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: 24,
          color: "var(--text3)",
          fontSize: 13,
          borderTop: "1px solid var(--border)",
        }}
      >
        Built with React + Node.js + Google Gemini AI
      </footer>
    </div>
  );
}
