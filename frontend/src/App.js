import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from './lib/authStore';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AccountsPage from './pages/AccountsPage';
import GoalsPage from './pages/GoalsPage';
import ProtectedRoute from './components/ProtectedRoute';
export default function App() {
    const { isAuthenticated } = useAuthStore();
    return (_jsxs(_Fragment, { children: [_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: isAuthenticated ? _jsx(Navigate, { to: "/dashboard", replace: true }) : _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: isAuthenticated ? _jsx(Navigate, { to: "/dashboard", replace: true }) : _jsx(SignupPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/transactions", element: _jsx(ProtectedRoute, { children: _jsx(TransactionsPage, {}) }) }), _jsx(Route, { path: "/accounts", element: _jsx(ProtectedRoute, { children: _jsx(AccountsPage, {}) }) }), _jsx(Route, { path: "/goals", element: _jsx(ProtectedRoute, { children: _jsx(GoalsPage, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: isAuthenticated ? '/dashboard' : '/login', replace: true }) })] }) }), _jsx(Toaster, { position: "top-right" })] }));
}
