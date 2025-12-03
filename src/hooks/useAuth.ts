// src/hooks/useAuth.ts

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { login, logout, fetchProfile, clearError } from '../store/slices/authSlice';
import type { LoginDto } from '../types/auth.types';
import { UserRole } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: LoginDto) => {
    return dispatch(login(credentials)).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFetchProfile = async () => {
    return dispatch(fetchProfile()).unwrap();
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!auth.user) return false;
    
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(auth.user.role);
  };

  const isAdmin = (): boolean => {
    return hasRole([UserRole.ADMIN, UserRole.OWNER]);
  };

  return {
    // State
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    
    // Actions
    login: handleLogin,
    logout: handleLogout,
    fetchProfile: handleFetchProfile,
    clearError: handleClearError,
    
    // Helpers
    hasRole,
    isAdmin,
  };
};