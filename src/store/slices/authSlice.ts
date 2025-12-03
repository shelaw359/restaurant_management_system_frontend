// src/store/slices/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { AuthState } from '../../types/auth.types';
import type { LoginDto } from '../../types/auth.types';
import { tokenStorage } from '../../utils/tokenStorage';

// Initial state
const initialState: AuthState = {
  user: null,
  access_token: tokenStorage.getAccessToken(),
  refresh_token: tokenStorage.getRefreshToken(),
  isAuthenticated: tokenStorage.hasTokens(),
  isLoading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginDto, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Async thunk for fetching user profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getProfile();
      return user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },

    setTokens: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
      tokenStorage.setAccessToken(action.payload.access_token);
      tokenStorage.setRefreshToken(action.payload.refresh_token);
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // If profile fetch fails, user is not authenticated
        state.isAuthenticated = false;
        state.user = null;
        state.access_token = null;
        state.refresh_token = null;
        tokenStorage.clearTokens();
      });
  },
});

export const { logout, clearError, setTokens } = authSlice.actions;
export default authSlice.reducer;