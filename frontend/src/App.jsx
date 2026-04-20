import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import History from './pages/History';
import Stats from './pages/Stats';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div className="spinner" style={{ width:40, height:40 }} />
    </div>
  );
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1a1a24', color: '#f0f0f8', border: '1px solid rgba(255,255,255,0.08)' }
        }} />
        <Routes>
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/generate" element={<PrivateRoute><Layout><Generator /></Layout></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><Layout><History /></Layout></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute><Layout><Stats /></Layout></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}