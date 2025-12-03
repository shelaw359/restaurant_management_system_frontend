// src/types/auth.types.ts

export const UserRole = {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  WAITER: 'WAITER',
  CHEF: 'CHEF',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  restaurantId: number;
  isActive: boolean;
  canLogin: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}