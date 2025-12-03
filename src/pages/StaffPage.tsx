// src/pages/StaffPage.tsx

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, UserCheck, UserX, Lock, Unlock } from 'lucide-react';
import { staffService } from '../services/staffService';
import { CreateStaffModal } from '../components/staff/CreateStaffModal';
import type { Staff, CreateStaffDto, UpdateStaffStatusDto } from '../types/staff.types';
import { UserRole } from '../types/auth.types';

const StaffPage = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [staff, searchTerm, roleFilter, statusFilter]);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const data = await staffService.getAllStaff();
      setStaff(data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStaff = () => {
    let filtered = [...staff];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((s) => s.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.isActive === (statusFilter === 'active'));
    }

    setFilteredStaff(filtered);
  };

  const handleCreateStaff = async (data: CreateStaffDto) => {
    try {
      await staffService.createStaff(data);
      await fetchStaff();
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create staff');
    }
  };

  const handleToggleStatus = async (staffId: number, currentStatus: boolean) => {
    try {
      const update: UpdateStaffStatusDto = { isActive: !currentStatus };
      await staffService.updateStaffStatus(staffId, update);
      await fetchStaff();
      setActiveMenuId(null);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleToggleLogin = async (staffId: number, currentCanLogin: boolean) => {
    try {
      const update: UpdateStaffStatusDto = { canLogin: !currentCanLogin };
      await staffService.updateStaffStatus(staffId, update);
      await fetchStaff();
      setActiveMenuId(null);
    } catch (error) {
      alert('Failed to update login access');
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      ADMIN: 'bg-red-500/20 text-red-400',
      OWNER: 'bg-purple-500/20 text-purple-400',
      MANAGER: 'bg-blue-500/20 text-blue-400',
      WAITER: 'bg-emerald-500/20 text-emerald-400',
      CHEF: 'bg-orange-500/20 text-orange-400',
    };
    return colors[role] || 'bg-slate-500/20 text-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Staff Management</h1>
          <p className="text-slate-400 mt-1">Manage your restaurant staff members</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-5 w-5" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Roles</option>
              <option value="MANAGER">Manager</option>
              <option value="WAITER">Waiter</option>
              <option value="CHEF">Chef</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 text-sm">Total Staff</p>
          <p className="text-2xl font-bold text-white mt-1">{staff.length}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {staff.filter((s) => s.isActive).length}
          </p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 text-sm">Managers</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {staff.filter((s) => s.role === 'MANAGER').length}
          </p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <p className="text-slate-400 text-sm">Waiters</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {staff.filter((s) => s.role === 'WAITER').length}
          </p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Login Access
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading staff...
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No staff members found
                  </td>
                </tr>
              ) : (
                filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                        {member.phone && (
                          <p className="text-xs text-slate-500">{member.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.isActive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.canLogin
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {member.canLogin ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {member.lastLogin
                        ? new Date(member.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenuId(activeMenuId === member.id ? null : member.id)
                          }
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {activeMenuId === member.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 z-10">
                            <button
                              onClick={() => handleToggleStatus(member.id, member.isActive)}
                              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors"
                            >
                              {member.isActive ? (
                                <>
                                  <UserX className="h-4 w-4" />
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4" />
                                  <span>Activate</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleToggleLogin(member.id, member.canLogin)}
                              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors"
                            >
                              {member.canLogin ? (
                                <>
                                  <Lock className="h-4 w-4" />
                                  <span>Disable Login</span>
                                </>
                              ) : (
                                <>
                                  <Unlock className="h-4 w-4" />
                                  <span>Enable Login</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Staff Modal */}
      <CreateStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStaff}
        isLoading={isLoading}
      />
    </div>
  );
};

export default StaffPage;