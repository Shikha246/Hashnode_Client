import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

// mode: 'login' | 'register'
const AuthForm = ({ mode, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '360px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>
        {mode === 'login' ? 'Log In' : 'Create your account'}
      </h2>

      <ErrorMessage message={error} />

      {mode === 'register' && (
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          style={inputStyle}
        />
      </div>

      <button type="submit" disabled={submitting} style={buttonStyle}>
        {submitting ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Register'}
      </button>
    </form>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.25rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const buttonStyle = {
  width: '100%',
  padding: '0.6rem',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
};

export default AuthForm;