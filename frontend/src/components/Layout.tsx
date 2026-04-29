import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Transactions', path: '/transactions', icon: '💳' },
    { label: 'Accounts', path: '/accounts', icon: '🏦' },
    { label: 'Goals', path: '/goals', icon: '🎯' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-lg font-bold">💰</span>
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-lg">Dynamic Wallet</h1>
              <p className="text-xs text-gray-500">Finance Manager</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center px-8">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Welcome to Dynamic Wallet</p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 pl-16">
          {children}
        </div>
      </main>
    </div>
  );
}
