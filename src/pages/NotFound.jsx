import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '3rem' }}>
    <h1>404</h1>
    <p>Page not found.</p>
    <Link to="/">Go back home</Link>
  </div>
);

export default NotFound;