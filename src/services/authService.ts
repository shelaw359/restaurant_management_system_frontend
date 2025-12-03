// src/services/authService.ts

import { api } from './api';
import type { LoginDto, RefreshTokenDto, AuthResponse, User } from '../types/auth.types';
import { tokenStorage } from '../utils/tokenStorage';

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Save tokens to localStorage
    tokenStorage.setAccessToken(response.data.access_token);
    tokenStorage.setRefreshToken(response.data.refresh_token);
    
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    } as RefreshTokenDto);
    
    // Save new tokens
    tokenStorage.setAccessToken(response.data.access_token);
    tokenStorage.setRefreshToken(response.data.refresh_token);
    
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Logout - Clear tokens
   */
  logout: (): void => {
    tokenStorage.clearTokens();
  },
};