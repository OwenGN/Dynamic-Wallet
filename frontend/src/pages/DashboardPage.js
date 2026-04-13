import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiCall from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalBalance: 0,
        monthlySpend: 0,
        accountCount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [accounts, transactions] = await Promise.all([
                    apiCall('/accounts/', {}),
                    apiCall('/transactions/', {}),
                ]);
                const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const monthlyTransactions = transactions.filter((t) => {
                    const date = new Date(t.date);
                    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                });
                const monthlyExpenses = monthlyTransactions.reduce((sum, t) => sum + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
                setStats({
                    totalTransactions: transactions.length,
                    totalBalance,
                    monthlySpend: monthlyExpenses,
                    accountCount: accounts.length,
                });
                // Generate last 7 days data
                const days = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayTransactions = transactions.filter((t) => t.date === dateStr);
                    const dayTotal = dayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
                    days.push({
                        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        amount: dayTotal,
                    });
                }
                setChartData(days);
            }
            catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    if (isLoading) {
        return _jsx("div", { className: "p-8", children: "Loading dashboard..." });
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Welcome back! Here's your financial overview." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Total Balance" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: ["$", stats.totalBalance.toFixed(2)] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Across all accounts" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Monthly Spend" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold text-red-600", children: ["$", stats.monthlySpend.toFixed(2)] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "This month" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Total Transactions" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.totalTransactions }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "All time" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Accounts" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.accountCount }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Active accounts" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Last 7 Days Activity" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "amount", fill: "#4F46E5" })] }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Spending Trend" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "amount", stroke: "#4F46E5" })] }) }) })] })] })] }));
}
