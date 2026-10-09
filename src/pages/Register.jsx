import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/layout/AuthForm';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setSubmitting(true);
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data); // auto-login right after registering
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AuthForm mode="register" onSubmit={handleRegister} submitting={submitting} />
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Register;