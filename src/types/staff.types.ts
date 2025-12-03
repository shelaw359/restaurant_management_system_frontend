// src/types/staff.types.ts

import { UserRole } from './auth.types';

export interface Staff {
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

export interface CreateStaffDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

export interface UpdateStaffStatusDto {
  isActive?: boolean;
  canLogin?: boolean;
}