// src/services/staffService.ts

import { api } from './api';
import type { Staff, CreateStaffDto, UpdateStaffStatusDto } from '../types/staff.types';
import { UserRole } from '../types/auth.types';

export const staffService = {
  /**
   * Get all staff members
   */
  getAllStaff: async (filters?: { role?: UserRole; isActive?: boolean }): Promise<Staff[]> => {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
    
    const response = await api.get<Staff[]>(`/auth/staff?${params.toString()}`);
    return response.data;
  },

  /**
   * Get staff member by ID
   */
  getStaffById: async (id: number): Promise<Staff> => {
    const response = await api.get<Staff>(`/auth/staff/${id}`);
    return response.data;
  },

  /**
   * Create new staff member
   */
  createStaff: async (data: CreateStaffDto): Promise<Staff> => {
    const response = await api.post<Staff>('/auth/staff', data);
    return response.data;
  },

  /**
   * Update staff status
   */
  updateStaffStatus: async (id: number, data: UpdateStaffStatusDto): Promise<Staff> => {
    const response = await api.patch<Staff>(`/auth/staff/${id}/status`, data);
    return response.data;
  },
};