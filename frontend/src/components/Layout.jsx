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
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, minWidth: 240, background: 'var(--bg2)',
        borderRight: '1px solid var(--border)', display: 'flex',
        flexDirection: 'column', padding: '20px 12px', gap: 8,
        position: 'relative', zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px 20px',
          fontFamily:'var(--font-display)', fontWeight:700, fontSize:18 }}>
          <Zap size={22} color="#7c6aff" fill="#7c6aff" />
          ContentForge
        </div>

        {/* Nav */}
        <nav style={{ display:'flex', flexDirection:'column', gap:4, flex:1 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, textDecoration: 'none',
              fontSize: 14, fontWeight: 500, transition: 'all 0.2s',
              background: isActive ? 'rgba(124,106,255,0.12)' : 'transparent',
              color: isActive ? 'var(--accent2)' : 'var(--text2)',
            })}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div style={{ display:'flex', alignItems:'center', gap:10,
          padding:12, borderTop:'1px solid var(--border)' }}>
          <div style={{
            width:34, height:34, borderRadius:'50%',
            background:'linear-gradient(135deg, #7c6aff, #a78bfa)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:700, fontSize:14, color:'white', flexShrink:0
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {user?.name}
            </div>
            <div style={{ fontSize:11, color:'var(--text3)',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {user?.email}
            </div>
          </div>
          <button onClick={handleLogout} style={{
            background:'none', border:'none', cursor:'pointer',
            color:'var(--text3)', padding:4, borderRadius:6, display:'flex'
          }}>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ flex:1, padding:32, maxWidth:1100, width:'100%', margin:'0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}