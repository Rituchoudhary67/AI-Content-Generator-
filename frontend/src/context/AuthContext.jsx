import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cf_token');
    const stored = localStorage.getItem('cf_user');
    if (token && stored) {
      setUser(JSON.parse(stored));
      api.get('/auth/me')
        .then(res => {
          setUser(res.data.user);
          localStorage.setItem('cf_user', JSON.stringify(res.data.user));
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('cf_token', res.data.token);
    localStorage.setItem('cf_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('cf_token', res.data.token);
    localStorage.setItem('cf_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('cf_token');
    localStorage.removeItem('cf_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);