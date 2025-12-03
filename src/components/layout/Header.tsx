// src/components/layout/Header.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { CommandPalette } from './CommandPalette';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [notifications] = useState<any[]>([]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // TODO: Replace with real API call
  useEffect(() => {
    // const fetchNotifications = async () => {
    //   const data = await notificationService.getRecent();
    //   setNotifications(data);
    // };
    // fetchNotifications();
  }, []);

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={() => {
              console.log('🔍 Mobile Search clicked!');
              setShowCommandPalette(true);
            }}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>

          {/* Desktop Search Bar */}
          <button
            onClick={() => {
              console.log('🔍 Search button clicked!');
              setShowCommandPalette(true);
            }}
            className="hidden md:flex items-center bg-slate-800/50 rounded-lg px-4 py-2 w-96 group hover:bg-slate-800/70 transition-all"
          >
            <Search className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span className="ml-3 text-sm text-slate-500">Search anything...</span>
            <kbd className="ml-auto px-2 py-1 text-xs text-slate-500 bg-slate-700/50 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
                <div className="p-3 border-b border-slate-700/50">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <p>No notifications</p>
                    <p className="text-xs mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors ${
                            notif.unread ? 'bg-slate-700/20' : ''
                          }`}
                        >
                          <p className="text-sm text-slate-200">{notif.text}</p>
                          <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-slate-700/50">
                      <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-slate-800/50 rounded-lg transition-all group"
            >
              <div className="h-9 w-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
                <div className="p-3 border-b border-slate-700/50">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
    </header>
  );
};