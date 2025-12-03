// src/components/staff/CreateStaffModal.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Eye, EyeOff, User, Mail, Lock, Phone, Briefcase } from 'lucide-react';
import type { CreateStaffDto } from '../../types/staff.types';
import { UserRole } from '../../types/auth.types';

const createStaffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Please select a role'),
  phone: z.string().optional(),
});

type CreateStaffFormData = z.infer<typeof createStaffSchema>;

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStaffDto) => Promise<void>;
  isLoading: boolean;
}

export const CreateStaffModal = ({ isOpen, onClose, onSubmit, isLoading }: CreateStaffModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStaffFormData>({
    resolver: zodResolver(createStaffSchema),
  });

  const handleFormSubmit = async (data: CreateStaffFormData) => {
    await onSubmit({
      ...data,
      role: data.role as UserRole,
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-slate-900 rounded-xl shadow-2xl w-full max-w-md border border-slate-700/50 animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-bold text-white">Create New Staff</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register('name')}
                  type="text"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Role *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <select
                  {...register('role')}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                >
                  <option value="">Select a role</option>
                  <option value="OWNER">Owner</option>
                  <option value="MANAGER">Manager</option>
                  <option value="WAITER">Waiter</option>
                  <option value="CHEF">Chef</option>
                </select>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Creating...' : 'Create Staff'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};