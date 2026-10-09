import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { authStatus } = useAuth();

  if (authStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (authStatus === 'guest') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;