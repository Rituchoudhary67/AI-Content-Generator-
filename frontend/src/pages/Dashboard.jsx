import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { CONTENT_TYPE_LABELS, timeAgo } from '../utils/helpers';
import { PenTool, Zap, Clock, Star, TrendingUp, ArrowRight } from 'lucide-react';

const QUICK_TEMPLATES = [
  { label: 'LinkedIn Post', contentType: 'linkedin-post', tone: 'professional', topic: 'lessons from my career journey' },
  { label: 'Blog Post', contentType: 'blog-post', tone: 'conversational', topic: 'productivity tips for developers' },
  { label: 'Tweet Thread', contentType: 'tweet-thread', tone: 'witty', topic: 'common mistakes beginners make' },
  { label: 'Cold Email', contentType: 'cold-outreach', tone: 'professional', topic: 'SaaS product pitch' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api.get('/stats').then(r => setStats(r.data)).catch(console.error);
    api.get('/history?limit=5').then(r => setRecent(r.data.contents)).catch(console.error);
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
      {/* Greeting */}
      <div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, marginBottom:4 }}>
          Good {getGreeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color:'var(--text2)' }}>What are you creating today?</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:16 }}>
        {[
          { label:'Total Generated', value: stats?.totalGenerations ?? '—', icon: Zap, color:'#7c6aff' },
          { label:'Content Saved', value: stats?.totalSaved ?? '—', icon: Clock, color:'#34d399' },
          { label:'Favorites', value: stats?.favoriteCount ?? '—', icon: Star, color:'#fbbf24' },
          { label:'Tokens Used', value: stats?.totalTokensUsed ? `${(stats.totalTokensUsed/1000).toFixed(1)}k` : '—', icon: TrendingUp, color:'#a78bfa' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:`${color}18`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700 }}>{value}</div>
              <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700 }}>Quick Start Templates</h2>
          <button className="btn btn-primary" onClick={() => navigate('/generate')} style={{ padding:'8px 16px', fontSize:13 }}>
            <PenTool size={14} /> Custom Generate
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:12 }}>
          {QUICK_TEMPLATES.map(t => (
            <button key={t.label} className="card" onClick={() => navigate('/generate', { state: t })}
              style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer',
                transition:'all 0.2s', textAlign:'left', border:'1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; }}>
              <span style={{ fontWeight:600, fontSize:14, flex:1 }}>{t.label}</span>
              <span style={{ fontSize:12, color:'var(--text3)' }}>{t.tone}</span>
              <ArrowRight size={14} color="var(--text3)" />
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700 }}>Recent Content</h2>
            <button className="btn btn-ghost" onClick={() => navigate('/history')}
              style={{ fontSize:13, padding:'6px 14px' }}>View All</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {recent.map(item => (
              <div key={item._id} className="card" onClick={() => navigate(`/history/${item._id}`)}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                  cursor:'pointer', transition:'all 0.2s', padding:'16px 20px' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-hover)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                <div>
                  <div style={{ fontWeight:500, fontSize:14, marginBottom:6 }}>{item.title}</div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span className="badge badge-purple">{CONTENT_TYPE_LABELS[item.contentType]}</span>
                    <span style={{ color:'var(--text3)', fontSize:12 }}>{timeAgo(item.updatedAt)}</span>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text3)" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}