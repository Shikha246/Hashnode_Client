import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/layout/AuthForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setSubmitting(true);
    try {
      const res = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      login(res.data); // saves token + user in AuthContext
      navigate('/'); // redirect to the feed
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AuthForm mode="login" onSubmit={handleLogin} submitting={submitting} />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;