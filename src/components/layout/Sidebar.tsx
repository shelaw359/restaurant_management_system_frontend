// src/components/layout/Sidebar.tsx

import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { navigationItems } from '../../config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();

  // Filter navigation items based on user role
  const allowedNavItems = navigationItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-slate-900/80 backdrop-blur-xl
          border-r border-slate-700/50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Golden Dragon</h1>
              <p className="text-xs text-slate-400">Restaurant POS</p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {allowedNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section - User Role */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-slate-400 mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-md">
              {user?.role}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};