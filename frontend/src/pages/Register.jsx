import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Zap, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to ContentForge 🚀');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key:'name', label:'Name', type:'text', icon:User, placeholder:'Your name' },
    { key:'email', label:'Email', type:'email', icon:Mail, placeholder:'you@example.com' },
    { key:'password', label:'Password', type:'password', icon:Lock, placeholder:'Min. 6 characters' },
  ];

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', padding:20,
      background:'radial-gradient(ellipse at 50% 0%, rgba(124,106,255,0.08) 0%, transparent 60%)' }}>
      <div className="card" style={{ width:'100%', maxWidth:420 }}>
        <div style={{ width:48, height:48, background:'rgba(124,106,255,0.12)',
          borderRadius:14, display:'flex', alignItems:'center',
          justifyContent:'center', marginBottom:20 }}>
          <Zap size={24} color="#7c6aff" fill="#7c6aff" />
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26,
          fontWeight:700, marginBottom:6 }}>Create your account</h1>
        <p style={{ color:'var(--text2)', fontSize:14, marginBottom:28 }}>
          Start generating content for free
        </p>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {fields.map(({ key, label, type, icon: Icon, placeholder }) => (
            <div key={key}>
              <label>{label}</label>
              <div style={{ position:'relative' }}>
                <Icon size={15} style={{ position:'absolute', left:12, top:'50%',
                  transform:'translateY(-50%)', color:'var(--text3)', pointerEvents:'none' }} />
                <input type={type} placeholder={placeholder}
                  value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  required style={{ paddingLeft:36 }} />
              </div>
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full"
            disabled={loading} style={{ padding:'13px', fontSize:15, marginTop:4 }}>
            {loading
              ? <span className="spinner" />
              : <><span>Create Account</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:13, color:'var(--text2)', marginTop:20 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'var(--accent2)', textDecoration:'none', fontWeight:500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}