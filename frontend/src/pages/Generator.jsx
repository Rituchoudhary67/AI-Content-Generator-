import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { copyToClipboard, exportMarkdown, exportText, CONTENT_TYPE_LABELS, TONE_LABELS, WORD_COUNT_LABELS } from '../utils/helpers';
import { Sparkles, Copy, Download, Lightbulb, RefreshCw } from 'lucide-react';

const CONTENT_TYPES = Object.keys(CONTENT_TYPE_LABELS);
const TONES = Object.keys(TONE_LABELS);

export default function Generator() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefill = location.state || {};

  const [form, setForm] = useState({
    topic: prefill.topic || '',
    contentType: prefill.contentType || 'blog-post',
    tone: prefill.tone || 'professional',
    targetAudience: '',
    wordCount: 'medium',
    language: 'English',
    title: ''
  });

  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [improvements, setImprovements] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleGenerate = async () => {
    if (!form.topic.trim()) return toast.error('Please enter a topic');
    setLoading(true);
    setGenerated(null);
    setImprovements(null);
    try {
      const res = await api.post('/content/generate', form);
      setGenerated(res.data.content);
      toast.success('Content generated!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!generated) return;
    setRegenerating(true);
    setImprovements(null);
    try {
      const res = await api.post(`/content/${generated._id}/regenerate`);
      setGenerated(res.data.content);
      toast.success('New version generated!');
    } catch (err) {
      toast.error('Regeneration failed');
    } finally {
      setRegenerating(false);
    }
  };

  const handleImprove = async () => {
    if (!generated) return;
    setImproving(true);
    try {
      const res = await api.post(`/content/${generated._id}/improve`);
      setImprovements(res.data.improvements);
      toast.success('AI analysis complete!');
    } catch (err) {
      toast.error('Analysis failed');
    } finally {
      setImproving(false);
    }
  };

  const currentText = generated?.versions?.[generated.currentVersion]?.text || '';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700 }}>Generate Content</h1>
        <p style={{ color:'var(--text2)', marginTop:4 }}>Fill in the details and let AI do the heavy lifting</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'420px 1fr', gap:24, alignItems:'start' }}>
        {/* Form */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label>Topic / Prompt *</label>
            <textarea rows={3} placeholder="e.g. Why developers should learn system design in 2025"
              value={form.topic} onChange={e => set('topic', e.target.value)}
              style={{ resize:'vertical' }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Content Type</label>
              <select value={form.contentType} onChange={e => set('contentType', e.target.value)}>
                {CONTENT_TYPES.map(t => <option key={t} value={t}>{CONTENT_TYPE_LABELS[t]}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Tone</label>
              <select value={form.tone} onChange={e => set('tone', e.target.value)}>
                {TONES.map(t => <option key={t} value={t}>{TONE_LABELS[t]}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Target Audience</label>
              <input placeholder="e.g. startup founders"
                value={form.targetAudience} onChange={e => set('targetAudience', e.target.value)} />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Length</label>
              <select value={form.wordCount} onChange={e => set('wordCount', e.target.value)}>
                {Object.entries(WORD_COUNT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Language</label>
              <select value={form.language} onChange={e => set('language', e.target.value)}>
                {['English','Hindi','Spanish','French','German','Marathi'].map(l =>
                  <option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label>Title (optional)</label>
              <input placeholder="Auto-generated if blank"
                value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
          </div>

          <button className="btn btn-primary w-full" onClick={handleGenerate}
            disabled={loading} style={{ marginTop:8, padding:'13px', fontSize:15 }}>
            {loading
              ? <><span className="spinner" /> Generating...</>
              : <><Sparkles size={17} /> Generate Content</>}
          </button>
        </div>

        {/* Output */}
        <div style={{ minHeight:400 }}>
          {!generated && !loading && (
            <div style={{ height:400, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:12,
              color:'var(--text3)', background:'var(--bg2)',
              border:'1px dashed var(--border)', borderRadius:'var(--radius-lg)' }}>
              <Sparkles size={48} />
              <p>Your generated content will appear here</p>
            </div>
          )}

          {loading && (
            <div style={{ height:400, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:12,
              color:'var(--text3)', background:'var(--bg2)',
              border:'1px solid var(--border)', borderRadius:'var(--radius-lg)' }}>
              <div className="spinner" style={{ width:36, height:36 }} />
              <p>AI is crafting your content...</p>
            </div>
          )}

          {generated && !loading && (
            <div className="card fade-in" style={{ padding:0, overflow:'hidden' }}>
              {/* Actions bar */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'14px 20px', borderBottom:'1px solid var(--border)', flexWrap:'wrap', gap:10 }}>
                <div style={{ display:'flex', gap:8 }}>
                  <span className="badge badge-purple">{CONTENT_TYPE_LABELS[generated.contentType]}</span>
                  <span className="badge badge-green">v{generated.currentVersion + 1} of {generated.versions.length}</span>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-ghost" style={{ padding:'7px 12px', fontSize:13 }}
                    onClick={() => copyToClipboard(currentText).then(() => toast.success('Copied!'))}>
                    <Copy size={14} /> Copy
                  </button>
                  <button className="btn btn-ghost" style={{ padding:'7px 12px', fontSize:13 }}
                    onClick={() => exportMarkdown(currentText, generated.title)}>
                    <Download size={14} /> .md
                  </button>
                  <button className="btn btn-ghost" style={{ padding:'7px 12px', fontSize:13 }}
                    onClick={() => exportText(currentText, generated.title)}>
                    <Download size={14} /> .txt
                  </button>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding:24, whiteSpace:'pre-wrap', fontSize:14,
                lineHeight:1.8, maxHeight:500, overflowY:'auto' }}>
                {currentText}
              </div>

              {/* Bottom actions */}
              <div style={{ display:'flex', gap:10, padding:'14px 20px',
                borderTop:'1px solid var(--border)' }}>
                <button className="btn btn-ghost" onClick={handleRegenerate} disabled={regenerating}>
                  {regenerating ? <span className="spinner" /> : <RefreshCw size={15} />}
                  {regenerating ? 'Generating...' : 'Regenerate'}
                </button>
                <button className="btn btn-ghost" onClick={handleImprove} disabled={improving}>
                  {improving ? <span className="spinner" /> : <Lightbulb size={15} />}
                  {improving ? 'Analyzing...' : 'AI Improve'}
                </button>
              </div>

              {/* Improvements */}
              {improvements && (
                <div className="fade-in" style={{ margin:'0 20px 20px',
                  border:'1px solid rgba(251,191,36,0.2)', borderRadius:'var(--radius)',
                  background:'rgba(251,191,36,0.04)', overflow:'hidden' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10,
                    padding:'14px 16px', borderBottom:'1px solid rgba(251,191,36,0.15)',
                    fontSize:14, flexWrap:'wrap' }}>
                    <Lightbulb size={16} color="#fbbf24" />
                    <span>Score: <strong>{improvements.score}/10</strong></span>
                    <span style={{ color:'var(--text2)', fontSize:13 }}>{improvements.summary}</span>
                  </div>
                  {improvements.improvements?.map((imp, i) => (
                    <div key={i} style={{ padding:'12px 16px',
                      borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ fontWeight:600, fontSize:13, color:'var(--accent2)', marginBottom:4 }}>
                        {imp.title}
                      </div>
                      <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.5 }}>
                        {imp.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}