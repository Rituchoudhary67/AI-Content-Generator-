import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, LayoutDashboard, PenTool, Clock, BarChart2, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/generate', icon: PenTool, label: 'Generate' },
  { to: '/history', icon: Clock, label: 'History' },
  { to: '/stats', icon: BarChart2, label: 'Analytics' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          minWidth: 240,
          background: "var(--bg2)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          gap: 6,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 8px 24px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "-0.3px",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #7c6aff, #a78bfa)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} color="white" fill="white" />
          </div>
          ContentForge
        </div>

        {/* Nav label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--text3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0 12px",
            marginBottom: 4,
          }}
        >
          MENU
        </div>

        {/* Nav */}
        <nav
          style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
        >
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.2s",
                background: isActive ? "rgba(124,106,255,0.12)" : "transparent",
                color: isActive ? "var(--accent2)" : "var(--text2)",
                borderLeft: isActive
                  ? "3px solid var(--accent)"
                  : "3px solid transparent",
              })}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div
          style={{ height: 1, background: "var(--border)", margin: "8px 0" }}
        />

        {/* User section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px",
            borderRadius: "var(--radius)",
            background: "var(--bg3)",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c6aff, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "white",
              flexShrink: 0,
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text3)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.2)",
              cursor: "pointer",
              color: "var(--danger)",
              padding: "6px 8px",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 500,
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(248,113,113,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(248,113,113,0.1)")
            }
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "32px 40px",
            maxWidth: 1100,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}