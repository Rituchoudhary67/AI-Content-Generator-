import { useState, useEffect } from 'react';
import api from '../utils/api';
import { CONTENT_TYPE_LABELS, TONE_LABELS } from '../utils/helpers';
import { Zap, FileText, Star, TrendingUp } from 'lucide-react';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stats').then(r => setStats(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', padding:80 }}>
      <div className="spinner" style={{ width:36, height:36 }} />
    </div>
  );

  const totalTypes = stats?.byContentType?.reduce((a, b) => a + b.count, 0) || 1;
  const totalTones = stats?.byTone?.reduce((a, b) => a + b.count, 0) || 1;
  const colors = ['#7c6aff','#34d399','#fbbf24','#f87171','#a78bfa','#60a5fa'];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700 }}>Analytics</h1>
        <p style={{ color:'var(--text2)', marginTop:4 }}>Track your content generation activity</p>
      </div>

      {/* Overview cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:16 }}>
        {[
          { label:'Total Generations', value: stats?.totalGenerations || 0, icon: Zap, color:'#7c6aff' },
          { label:'Content Saved', value: stats?.totalSaved || 0, icon: FileText, color:'#34d399' },
          { label:'Favorites', value: stats?.favoriteCount || 0, icon: Star, color:'#fbbf24' },
          { label:'Total Tokens', value: `${((stats?.totalTokensUsed || 0)/1000).toFixed(1)}k`, icon: TrendingUp, color:'#a78bfa' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:`${color}18`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700 }}>{value}</div>
            <div style={{ fontSize:12, color:'var(--text2)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {/* By content type */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700 }}>
            Content by Type
          </h3>
          {stats?.byContentType?.length === 0
            ? <p style={{ color:'var(--text3)', fontSize:14 }}>No data yet. Start generating!</p>
            : stats?.byContentType?.map((item, i) => (
              <div key={item._id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:12, color:'var(--text2)', minWidth:130 }}>
                  {CONTENT_TYPE_LABELS[item._id] || item._id}
                </span>
                <div style={{ flex:1, height:8, background:'var(--bg3)',
                  borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:4, background: colors[i % colors.length],
                    width:`${(item.count / totalTypes) * 100}%`, transition:'width 0.6s ease' }} />
                </div>
                <span style={{ fontSize:12, color:'var(--text2)', minWidth:20 }}>{item.count}</span>
              </div>
            ))}
        </div>

        {/* By tone */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700 }}>
            Tone Usage
          </h3>
          {stats?.byTone?.length === 0
            ? <p style={{ color:'var(--text3)', fontSize:14 }}>No data yet.</p>
            : stats?.byTone?.map((item, i) => (
              <div key={item._id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:12, color:'var(--text2)', minWidth:130 }}>
                  {TONE_LABELS[item._id] || item._id}
                </span>
                <div style={{ flex:1, height:8, background:'var(--bg3)',
                  borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:4, background: colors[i % colors.length],
                    width:`${(item.count / totalTones) * 100}%`, transition:'width 0.6s ease' }} />
                </div>
                <span style={{ fontSize:12, color:'var(--text2)', minWidth:20 }}>{item.count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Token card */}
      <div className="card" style={{
        background:'linear-gradient(135deg, rgba(124,106,255,0.06), var(--bg2))',
        border:'1px solid rgba(124,106,255,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <TrendingUp size={18} color="var(--accent2)" />
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700 }}>
            Token Usage
          </h3>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:20 }}>
          {[
            { label:'Total Tokens Used', value:(stats?.totalTokensUsed || 0).toLocaleString() },
            { label:'Avg Tokens / Generation', value: stats?.totalGenerations
                ? Math.round((stats.totalTokensUsed || 0) / stats.totalGenerations) : 0 },
            { label:'Estimated Cost', value:'$0.00', color:'#34d399' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ padding:16, background:'var(--bg3)', borderRadius:'var(--radius)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:26,
                fontWeight:700, marginBottom:4, color: color || 'var(--text)' }}>{value}</div>
              <div style={{ fontSize:12, color:'var(--text2)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}