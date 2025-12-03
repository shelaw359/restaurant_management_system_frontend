import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * PublicRoute - Only accessible when NOT authenticated
 * Used for Login page (redirect to dashboard if already logged in)
 */
export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};