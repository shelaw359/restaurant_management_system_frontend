import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, fetchProfile, user } = useAuth();

  useEffect(() => {
    // If authenticated but no user data, fetch profile
    if (isAuthenticated && !user && !isLoading) {
      fetchProfile();
    }
  }, [isAuthenticated, user, isLoading, fetchProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};