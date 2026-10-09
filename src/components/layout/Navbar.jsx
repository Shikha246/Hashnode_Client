import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
const Navbar = () => {
  const { user, authStatus, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
const themeToggleStyle = {
  background: 'none',
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  padding: '0.3rem 0.6rem',
  fontSize: '1rem',
  color: 'var(--text-color)',
};
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="./src/assets/logo.png" alt="logo" className="navbar-logo"/>
      </Link>

      <div className="navbar-links">
        <Link to="/">Feed</Link>
        <Link to="/tags">Tags</Link>

        {authStatus === 'authenticated' && user ? (
          <>
            <Link to="/editor/new">Write</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to={`/profile/${user._id}`}>
              <img
                src={user.avatarUrl || 'https://i.pravatar.cc/32'}
                alt={user.name}
                style={{ width: 28, height: 28, borderRadius: '50%' }}
              />
            </Link>
            <button onClick={toggleTheme} style={themeToggleStyle} aria-label="Toggle dark mode">
  {theme === 'light' ? '🌙' : '☀️'}
</button>
            <button onClick={handleLogout} style={logoutBtnStyle}>
              Logout
            </button>
          </>
        ) : authStatus === 'guest' ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : null /* loading: render nothing to avoid a flash */}
      </div>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#fff',
  borderBottom: '1px solid #eee',
};

const logoutBtnStyle = {
  background: 'none',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '0.3rem 0.7rem',
};

export default Navbar;