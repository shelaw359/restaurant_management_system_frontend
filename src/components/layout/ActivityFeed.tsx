// src/components/layout/ActivityFeed.tsx

import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Activity {
  id: number;
  type: 'order' | 'payment' | 'customer' | 'stat';
  title: string;
  description: string;
  time: string;
  color: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export const ActivityFeed = () => {
  const [activities] = useState<Activity[]>([]);
  const [stats] = useState<Stat[]>([
    { label: 'Today Orders', value: '0', change: '+0%', icon: ShoppingBag, color: 'emerald' },
    { label: 'Revenue', value: 'KSh 0', change: '+0%', icon: DollarSign, color: 'blue' },
    { label: 'Customers', value: '0', change: '+0%', icon: Users, color: 'purple' },
  ]);

  useEffect(() => {
    // TODO: Replace with real API calls
    // const fetchTodayStats = async () => {
    //   const data = await statsService.getTodayStats();
    //   setStats(data);
    // };

    // const fetchRecentActivity = async () => {
    //   const data = await activityService.getRecent();
    //   setActivities(data);
    // };

    // fetchTodayStats();
    // fetchRecentActivity();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return ShoppingBag;
      case 'payment':
        return DollarSign;
      case 'customer':
        return Users;
      default:
        return TrendingUp;
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      emerald: 'bg-emerald-500/20 text-emerald-400',
      blue: 'bg-blue-500/20 text-blue-400',
      purple: 'bg-purple-500/20 text-purple-400',
      green: 'bg-green-500/20 text-green-400',
    };
    return colors[color] || colors.emerald;
  };

  return (
    <aside className="hidden xl:block w-80 bg-slate-900/80 backdrop-blur-xl border-l border-slate-700/50 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-white">Activity Feed</h2>
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs text-slate-400">Real-time updates</p>
      </div>

      {/* Quick Stats */}
      <div className="p-6 space-y-3 border-b border-slate-700/50">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-emerald-400">{stat.change}</span>
              </div>
              <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Activity List */}
      <div className="p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Recent Activity</h3>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">No recent activity</p>
            <p className="text-xs mt-1">Activity will appear here when orders are placed</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 group cursor-pointer hover:bg-slate-800/30 p-2 rounded-lg transition-all"
                >
                  <div className={`p-2 rounded-lg ${getColorClasses(activity.color)} flex-shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button - Only show if there are activities */}
        {activities.length > 0 && (
          <button className="w-full mt-6 py-2 bg-slate-800/50 hover:bg-slate-800/70 text-emerald-400 text-sm font-medium rounded-lg transition-all">
            View All Activity
          </button>
        )}
      </div>
    </aside>
  );
};