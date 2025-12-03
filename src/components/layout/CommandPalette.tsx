// src/components/layout/CommandPalette.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Hash, ArrowRight } from 'lucide-react';
import { navigationItems } from '../../config/navigation';
import { useAuth } from '../../hooks/useAuth';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter navigation items based on user role
  const allowedNavItems = navigationItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  );

  // Filter items based on search
  const filteredItems = allowedNavItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Quick actions
  const quickActions = [
    { name: 'Create New Staff', action: () => navigate('/staff'), icon: Hash },
    { name: 'View Orders', action: () => navigate('/orders'), icon: Hash },
    { name: 'Check Tables', action: () => navigate('/tables'), icon: Hash },
  ];

  const allResults = [
    ...filteredItems.map((item) => ({
      name: item.name,
      type: 'page',
      action: () => navigate(item.path),
    })),
    ...quickActions
      .filter((action) => action.name.toLowerCase().includes(search.toLowerCase()))
      .map((action) => ({
        name: action.name,
        type: 'action',
        action: action.action,
      })),
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % allResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allResults.length) % allResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (allResults[selectedIndex]) {
          allResults[selectedIndex].action();
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allResults]);

  const handleClose = () => {
    setSearch('');
    setSelectedIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Command Palette */}
      <div className="flex min-h-full items-start justify-center p-4 pt-[15vh]">
        <div className="relative bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl border border-slate-700/50">
          {/* Search Input */}
          <div className="flex items-center border-b border-slate-700/50 p-4">
            <Search className="h-5 w-5 text-slate-400 mr-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search pages, actions, staff..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs text-slate-500 bg-slate-800 rounded">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-2">
            {allResults.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <p>No results found</p>
                <p className="text-sm mt-1">Try searching for something else</p>
              </div>
            ) : (
              <div className="space-y-1">
                {allResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      result.action();
                      handleClose();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          index === selectedIndex
                            ? 'bg-emerald-500/20'
                            : 'bg-slate-800/50'
                        }`}
                      >
                        <Hash className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{result.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700/50 p-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↑↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Enter</kbd>
                <span>Select</span>
              </span>
            </div>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};