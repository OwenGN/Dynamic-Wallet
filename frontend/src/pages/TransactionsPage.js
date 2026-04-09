import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
export default function TransactionsPage() {
    const { token } = useAuthStore();
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await apiCall('/accounts/', {}, token);
                setAccounts(data);
            }
            catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        if (token) {
            fetchAccounts();
        }
    }, [token]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Transactions" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Manage and track your financial transactions." })] }), isLoading ? (_jsx("div", { children: "Loading..." })) : (_jsxs(Tabs, { defaultValue: "list", className: "w-full", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "list", children: "Transaction List" }), _jsx(TabsTrigger, { value: "add", children: "Add Transaction" })] }), _jsx(TabsContent, { value: "list", className: "mt-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Transactions" }) }), _jsx(CardContent, { children: _jsx(TransactionList, {}) })] }) }), _jsx(TabsContent, { value: "add", className: "mt-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Add New Transaction" }) }), _jsx(CardContent, { children: _jsx(TransactionForm, {}) })] }) })] }))] }));
}
