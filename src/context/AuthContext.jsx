import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authStatus, setAuthStatus] = useState('loading'); // 'loading' | 'authenticated' | 'guest'

  // On first load, if we have a saved token, validate it against the server
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setAuthStatus('guest');
        return;
      }

      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
        setAuthStatus('authenticated');
      } catch (error) {
        // token was invalid or expired
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setAuthStatus('guest');
      }
    };

    loadUser();
  }, [token]);

  const login = (userData) => {
    // userData comes from the login/register API response: { _id, name, email, token }
    localStorage.setItem('token', userData.token);
    setToken(userData.token);
    setUser(userData);
    setAuthStatus('authenticated');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthStatus('guest');
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{ user, token, authStatus, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};