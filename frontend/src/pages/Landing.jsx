import { useNavigate } from 'react-router-dom';
import { Zap, Sparkles, Clock, BarChart2, ArrowRight, GitBranch, Users, Globe, Shield } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Prompt Engineering', desc: 'Structured prompts for 8 content types — not a generic text box. Each type has its own structural instructions built in.' },
  { icon: Clock, title: 'Version History', desc: 'Compare all your generations side-by-side like a Git diff for writing. Never lose a good draft again.' },
  { icon: BarChart2, title: 'AI Improvement Engine', desc: 'Get a quality score and 3 specific actionable suggestions on every piece of content you generate.' },
  { icon: Zap, title: 'Token Analytics', desc: 'Full visibility into AI usage, tokens consumed, and your content productivity over time.' },
  { icon: GitBranch, title: 'Multi-Version Control', desc: 'Every regeneration is saved as a new version. Switch between v1, v2, v3 anytime — just like Git commits for writing.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Generate content in English, Hindi, Spanish, French, German, Marathi and more with the same quality.' },
  { icon: Users, title: 'Audience Targeting', desc: 'Specify your exact target audience and the AI adjusts vocabulary, tone, and examples accordingly.' },
  { icon: Shield, title: 'Rate Limited & Secure', desc: 'JWT authentication, bcrypt password hashing, and rate limiting built in — production security from day one.' },
];

const contentTypes = ['Blog Post', 'LinkedIn Post', 'Tweet Thread', 'Cold Email', 'YouTube Script', 'Instagram Caption', 'Product Description', 'Cold Outreach'];

const stats = [
  { value: '8', label: 'Content Types' },
  { value: '6', label: 'Tone Options' },
  { value: '6+', label: 'Languages' },
  { value: '$0', label: 'Monthly Cost' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>

      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 5%',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 100
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18
        }}>
          <div style={{
            width: 30, height: 30,
            background: 'linear-gradient(135deg, #7c6aff, #a78bfa)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Zap size={16} color="white" fill="white" />
          </div>
          ContentForge
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-ghost"
            onClick={() => navigate('/login')}
            style={{ padding: '8px 16px', fontSize: 14 }}>
            Log in
          </button>
          <button className="btn btn-primary"
            onClick={() => navigate('/register')}
            style={{ padding: '8px 18px', fontSize: 14 }}>
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        textAlign: 'center',
        padding: '90px 5% 70px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(124,106,255,0.1) 0%, transparent 65%)',
        position: 'relative'
      }}>
        <span className="badge badge-purple" style={{ marginBottom: 20, display: 'inline-flex' }}>
          <Sparkles size={12} /> Powered by Groq LLaMA 3.3-70B — Free & Fast
        </span>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 62px)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-2px',
          marginBottom: 20,
          maxWidth: 750,
          margin: '0 auto 20px'
        }}>
          Generate content that{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c6aff, #a78bfa, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            actually sounds human
          </span>
        </h1>
        <p style={{
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'var(--text2)',
          maxWidth: 520,
          margin: '0 auto 32px',
          lineHeight: 1.7
        }}>
          Not another generic AI wrapper. ContentForge uses structured prompt engineering,
          version control, and AI critique to make every piece of content exceptional.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <button className="btn btn-primary"
            onClick={() => navigate('/register')}
            style={{ padding: '13px 28px', fontSize: 15 }}>
            Start Generating Free <ArrowRight size={16} />
          </button>
          <button className="btn btn-ghost"
            onClick={() => navigate('/login')}
            style={{ padding: '13px 28px', fontSize: 15 }}>
            Log In
          </button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 48 }}>
          No credit card · Free forever · 1,500 generations/day
        </p>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0,
          flexWrap: 'wrap',
          maxWidth: 600,
          margin: '0 auto 48px',
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{
              flex: 1,
              minWidth: 100,
              padding: '20px 16px',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 800,
                color: 'var(--accent2)'
              }}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: 8,
          maxWidth: 620, margin: '0 auto'
        }}>
          {contentTypes.map(t => (
            <span key={t} style={{
              padding: '6px 14px', borderRadius: 100,
              border: '1px solid var(--border)', fontSize: 13,
              color: 'var(--text2)', background: 'var(--bg2)'
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Features — 8 cards, fills full screen */}
      <section style={{ padding: '80px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: '-0.5px'
          }}>
            Why ContentForge is different
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            Built with real engineering concepts — not just a UI wrapper around an AI API
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20
        }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                transition: 'all 0.25s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,106,255,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <div style={{
                width: 44, height: 44,
                background: 'rgba(124,106,255,0.1)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16
              }}>
                <Icon size={20} color="#7c6aff" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 16, fontWeight: 700, marginBottom: 8
              }}>{title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '0 5% 80px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,106,255,0.15), rgba(167,139,250,0.08))',
          border: '1px solid rgba(124,106,255,0.25)',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 60px)',
          textAlign: 'center',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3vw, 34px)',
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: '-0.5px'
          }}>
            Ready to 10x your content output?
          </h2>
          <p style={{
            color: 'var(--text2)', fontSize: 15,
            marginBottom: 28, maxWidth: 400, margin: '0 auto 28px'
          }}>
            Join ContentForge today — completely free, no credit card required.
          </p>
          <button className="btn btn-primary"
            onClick={() => navigate('/register')}
            style={{ padding: '14px 32px', fontSize: 15 }}>
            Create Free Account <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '40px 5%',
        background: 'var(--bg2)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
          marginBottom: 32
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 16, marginBottom: 10
            }}>
              <div style={{
                width: 26, height: 26,
                background: 'linear-gradient(135deg, #7c6aff, #a78bfa)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap size={14} color="white" fill="white" />
              </div>
              ContentForge
            </div>
            <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>
              AI-powered content generation for developers, marketers, and creators.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{
              fontSize: 13, fontWeight: 600,
              color: 'var(--text)', marginBottom: 12,
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Product</h4>
            {['Features', 'How it works', 'Pricing', 'Changelog'].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <span style={{
                  fontSize: 13, color: 'var(--text3)',
                  cursor: 'pointer', transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{
              fontSize: 13, fontWeight: 600,
              color: 'var(--text)', marginBottom: 12,
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Built With</h4>
            {['React + Vite', 'Node.js + Express', 'MongoDB Atlas', 'Groq LLaMA 3.3'].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Developer */}
          <div>
            <h4 style={{
              fontSize: 13, fontWeight: 600,
              color: 'var(--text)', marginBottom: 12,
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>Developer</h4>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12, lineHeight: 1.6 }}>
              Built by Ritu Choudhary
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://github.com/Rituchoudhary67/AI-Content-Generator-"
                target="_blank" rel="noreferrer"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: 12,
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text2)';
                }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ritu-choudhary-3368b7251/"
                target="_blank" rel="noreferrer"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: 12,
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text2)';
                }}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 24,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>
            © 2026 ContentForge AI — Built by Ritu Choudhary
          </p>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>
            React · Node.js · MongoDB · Groq AI · Deployed on Vercel + Render
          </p>
        </div>
      </footer>
    </div>
  );
}