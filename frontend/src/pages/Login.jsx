import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', padding:20,
      background:'radial-gradient(ellipse at 50% 0%, rgba(124,106,255,0.08) 0%, transparent 60%)' }}>
      <div className="card" style={{ width:'100%', maxWidth:420 }}>
        {/* Logo */}
        <div style={{ width:48, height:48, background:'rgba(124,106,255,0.12)',
          borderRadius:14, display:'flex', alignItems:'center',
          justifyContent:'center', marginBottom:20 }}>
          <Zap size={24} color="#7c6aff" fill="#7c6aff" />
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26,
          fontWeight:700, marginBottom:6 }}>Welcome back</h1>
        <p style={{ color:'var(--text2)', fontSize:14, marginBottom:28 }}>
          Sign in to your ContentForge account
        </p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label>Email</label>
            <div style={{ position:'relative' }}>
              <Mail size={15} style={{ position:'absolute', left:12, top:'50%',
                transform:'translateY(-50%)', color:'var(--text3)', pointerEvents:'none' }} />
              <input type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required style={{ paddingLeft:36 }} />
            </div>
          </div>

          <div>
            <label>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={15} style={{ position:'absolute', left:12, top:'50%',
                transform:'translateY(-50%)', color:'var(--text3)', pointerEvents:'none' }} />
              <input type="password" placeholder="Your password"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required style={{ paddingLeft:36 }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full"
            disabled={loading} style={{ padding:'13px', fontSize:15, marginTop:4 }}>
            {loading
              ? <span className="spinner" />
              : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:13, color:'var(--text2)', marginTop:20 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'var(--accent2)', textDecoration:'none', fontWeight:500 }}>
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}