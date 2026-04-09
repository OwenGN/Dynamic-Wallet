import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/authStore';
import { Button } from '@/components/ui/button';
export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuthStore();
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Transactions', path: '/transactions', icon: '💳' },
        { label: 'Accounts', path: '/accounts', icon: '🏦' },
        { label: 'Goals', path: '/goals', icon: '🎯' },
    ];
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsxs("aside", { className: "w-64 bg-white shadow-lg border-r", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center", children: _jsx("span", { className: "text-white text-lg font-bold", children: "\uD83D\uDCB0" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "font-bold text-lg", children: "Dynamic Wallet" }), _jsx("p", { className: "text-xs text-gray-500", children: "Finance Manager" })] })] }) }), _jsx("nav", { className: "p-4 space-y-2", children: navItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-indigo-100 text-indigo-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx("span", { className: "text-lg", children: item.icon }), _jsx("span", { children: item.label })] }, item.path))) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 border-t bg-white w-64", children: _jsx(Button, { onClick: handleLogout, variant: "outline", className: "w-full", children: "Logout" }) })] }), _jsxs("main", { className: "flex-1 flex flex-col", children: [_jsx("header", { className: "bg-white border-b h-16 flex items-center px-8", children: _jsx("div", { className: "flex-1", children: _jsx("p", { className: "text-sm text-gray-600", children: "Welcome to Dynamic Wallet" }) }) }), _jsx("div", { className: "flex-1 overflow-auto p-8", children: children })] })] }));
}
