import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AccountsPage from './pages/AccountsPage';
import GoalsPage from './pages/GoalsPage';
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/transactions", element: _jsx(TransactionsPage, {}) }), _jsx(Route, { path: "/accounts", element: _jsx(AccountsPage, {}) }), _jsx(Route, { path: "/goals", element: _jsx(GoalsPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }), _jsx(Toaster, { position: "top-right" })] }));
}
