// src/pages/DashboardPage.tsx

import { useAuth } from '../hooks/useAuth';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats] = useState([
    {
      name: 'Total Revenue',
      value: 'KSh 0',
      change: '+0%',
      icon: DollarSign,
      color: 'emerald',
    },
    {
      name: 'Orders Today',
      value: '0',
      change: '+0%',
      icon: ShoppingBag,
      color: 'blue',
    },
    {
      name: 'Active Tables',
      value: '0/0',
      change: '+0%',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      name: 'Customers',
      value: '0',
      change: '+0%',
      icon: Users,
      color: 'orange',
    },
  ]);

  useEffect(() => {
    // TODO: Replace with real API calls
    // const fetchDashboardStats = async () => {
    //   const data = await dashboardService.getStats();
    //   setStats(data);
    // };

    // const fetchRecentOrders = async () => {
    //   const data = await orderService.getRecent();
    //   setRecentActivity(data);
    // };

    // fetchDashboardStats();
    // fetchRecentOrders();
  }, []);

  const quickActions = [
    { name: 'Staff Management', path: '/staff', roles: [user?.role === 'ADMIN' || user?.role === 'OWNER'] },
    { name: 'Menu', path: '/menu', roles: [true] },
    { name: 'Orders', path: '/orders', roles: [true] },
    { name: 'Tables', path: '/tables', roles: [user?.role !== 'CHEF'] },
  ].filter(action => action.roles[0]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: 'bg-emerald-500/20' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'bg-blue-500/20' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'bg-purple-500/20' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', icon: 'bg-orange-500/20' },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-slate-400">
          Here's what's happening with your restaurant today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colors.icon}`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <span className="flex items-center text-sm font-medium text-emerald-400">
                  {stat.change}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all text-left group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {action.name}
              </h3>
              <p className="text-sm text-slate-400 mt-2">Click to manage</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-white">Order #{1230 + i} completed</p>
                <p className="text-xs text-slate-400">Table {i} • ${(35 + i * 10).toFixed(2)}</p>
              </div>
              <span className="text-xs text-slate-500">{i * 5}m ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;