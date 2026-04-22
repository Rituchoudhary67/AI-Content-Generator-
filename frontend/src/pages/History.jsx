import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { CONTENT_TYPE_LABELS, TONE_LABELS, timeAgo } from '../utils/helpers';
import { Search, Star, Trash2, ArrowRight } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '', contentType: '', tone: '', favorite: false
  });

  const fetchHistory = async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 10 });
      if (filters.search) params.append('search', filters.search);
      if (filters.contentType) params.append('contentType', filters.contentType);
      if (filters.tone) params.append('tone', filters.tone);
      if (filters.favorite) params.append('favorite', 'true');
      const res = await api.get(`/history?${params}`);
      setItems(res.data.contents);
      setTotal(res.data.total);
      setPage(p);
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(1); }, [filters]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Delete this content?')) return;
    await api.delete(`/content/${id}`);
    toast.success('Deleted');
    fetchHistory(page);
  };

  const handleFavorite = async (e, id) => {
    e.stopPropagation();
    await api.patch(`/content/${id}/favorite`);
    fetchHistory(page);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700 }}>Content History</h1>
        <p style={{ color:'var(--text2)', marginTop:4 }}>{total} pieces generated</p>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, minWidth:200 }}>
          <Search size={15} style={{ position:'absolute', left:12, top:'50%',
            transform:'translateY(-50%)', color:'var(--text3)', pointerEvents:'none' }} />
          <input placeholder="Search by title or topic..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            style={{ paddingLeft:36 }} />
        </div>
        <select value={filters.contentType} style={{ width:'auto' }}
          onChange={e => setFilters(f => ({ ...f, contentType: e.target.value }))}>
          <option value="">All Types</option>
          {Object.entries(CONTENT_TYPE_LABELS).map(([k, v]) =>
            <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filters.tone} style={{ width:'auto' }}
          onChange={e => setFilters(f => ({ ...f, tone: e.target.value }))}>
          <option value="">All Tones</option>
          {Object.entries(TONE_LABELS).map(([k, v]) =>
            <option key={k} value={k}>{v}</option>)}
        </select>
        <button className={`btn ${filters.favorite ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setFilters(f => ({ ...f, favorite: !f.favorite }))}
          style={{ padding:'9px 14px' }}>
          <Star size={15} fill={filters.favorite ? 'currentColor' : 'none'} /> Favorites
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:60 }}>
          <div className="spinner" style={{ width:32, height:32 }} />
        </div>
      ) : items.length === 0 ? (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          gap:16, padding:80, color:'var(--text2)' }}>
          <p>No content found. Start generating!</p>
          <button className="btn btn-primary" onClick={() => navigate('/generate')}>
            Generate Now
          </button>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {items.map(item => (
            <div key={item._id} className="card"
              onClick={() => navigate(`/history/${item._id}`)}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                cursor:'pointer', transition:'all 0.2s', padding:'16px 20px', gap:16 }}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-hover)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:500, fontSize:14, marginBottom:8,
                  whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {item.title}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span className="badge badge-purple">{CONTENT_TYPE_LABELS[item.contentType]}</span>
                  <span className="badge badge-amber">{TONE_LABELS[item.tone]}</span>
                  <span style={{ color:'var(--text3)', fontSize:12 }}>{timeAgo(item.updatedAt)}</span>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                <button style={{ background:'none', border:'none', cursor:'pointer',
                  padding:4, borderRadius:6, display:'flex' }}
                  onClick={e => handleFavorite(e, item._id)}>
                  <Star size={16}
                    fill={item.isFavorite ? '#fbbf24' : 'none'}
                    color={item.isFavorite ? '#fbbf24' : 'var(--text3)'} />
                </button>
                <button style={{ background:'none', border:'none', cursor:'pointer',
                  padding:4, borderRadius:6, display:'flex' }}
                  onClick={e => handleDelete(e, item._id)}>
                  <Trash2 size={16} color="var(--text3)" />
                </button>
                <ArrowRight size={16} color="var(--text3)" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 10 && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
          <button className="btn btn-ghost" disabled={page === 1}
            onClick={() => fetchHistory(page - 1)}>Previous</button>
          <span style={{ color:'var(--text2)', fontSize:14 }}>
            Page {page} of {Math.ceil(total / 10)}
          </span>
          <button className="btn btn-ghost" disabled={page >= Math.ceil(total / 10)}
            onClick={() => fetchHistory(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}