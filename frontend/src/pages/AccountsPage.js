import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
import { toast } from 'sonner';
export default function AccountsPage() {
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
                toast.error('Failed to load accounts');
            }
            finally {
                setIsLoading(false);
            }
        };
        if (token) {
            fetchAccounts();
        }
    }, [token]);
    if (isLoading) {
        return _jsx("div", { className: "text-center py-8", children: "Loading accounts..." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Accounts" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Manage your financial accounts." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: accounts.map((account) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: account.name }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "Type:" }), " ", account.type] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "Currency:" }), " ", account.currency] })] }) })] }, account.id))) }), accounts.length === 0 && (_jsx(Card, { children: _jsx(CardContent, { className: "py-12", children: _jsxs("div", { className: "text-center text-gray-500", children: [_jsx("p", { children: "No accounts found." }), _jsx(Button, { className: "mt-4", children: "Add Account" })] }) }) }))] }));
}
