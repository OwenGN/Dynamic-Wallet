import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
export default function TransactionList() {
    const { token } = useAuthStore();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        account: '',
        category: '',
        startDate: '',
        endDate: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transRes, accRes, catRes] = await Promise.all([
                    apiCall('/transactions/', {}, token),
                    apiCall('/accounts/', {}, token),
                    apiCall('/categories/', {}, token),
                ]);
                setTransactions(transRes);
                setFilteredTransactions(transRes);
                setAccounts(accRes);
                setCategories(catRes);
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token]);
    useEffect(() => {
        let filtered = transactions;
        if (filters.account) {
            filtered = filtered.filter((t) => t.account_id.toString() === filters.account);
        }
        if (filters.category) {
            filtered = filtered.filter((t) => t.category_id?.toString() === filters.category);
        }
        if (filters.startDate) {
            filtered = filtered.filter((t) => t.date >= filters.startDate);
        }
        if (filters.endDate) {
            filtered = filtered.filter((t) => t.date <= filters.endDate);
        }
        setFilteredTransactions(filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, [filters, transactions]);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };
    const accountName = (id) => accounts.find((acc) => acc.id === id)?.name || `Account ${id}`;
    const categoryName = (id) => (id ? categories.find((cat) => cat.id === id)?.name || `Category ${id}` : '-');
    if (isLoading) {
        return _jsx("div", { className: "text-center py-8 text-gray-500", children: "Loading transactions..." });
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3", children: [_jsxs("select", { name: "account", value: filters.account, onChange: handleFilterChange, className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 text-sm", children: [_jsx("option", { value: "", children: "All Accounts" }), accounts.map((acc) => (_jsx("option", { value: acc.id, children: acc.name }, acc.id)))] }), _jsxs("select", { name: "category", value: filters.category, onChange: handleFilterChange, className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 text-sm", children: [_jsx("option", { value: "", children: "All Categories" }), categories.map((cat) => (_jsx("option", { value: cat.id, children: cat.name }, cat.id)))] }), _jsx("input", { type: "date", name: "startDate", value: filters.startDate, onChange: handleFilterChange, className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm", placeholder: "Start date" }), _jsx("input", { type: "date", name: "endDate", value: filters.endDate, onChange: handleFilterChange, className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm", placeholder: "End date" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Date" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Account" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Category" }), _jsx("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-900", children: "Description" }), _jsx("th", { className: "px-4 py-3 text-right text-sm font-semibold text-gray-900", children: "Amount" })] }) }), _jsx("tbody", { children: filteredTransactions.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-4 py-8 text-center text-gray-500", children: "No transactions found." }) })) : (filteredTransactions.map((tx) => (_jsxs("tr", { className: "border-b hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: new Date(tx.date).toLocaleDateString() }), _jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: accountName(tx.account_id) }), _jsx("td", { className: "px-4 py-3 text-sm text-gray-900", children: categoryName(tx.category_id) }), _jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: tx.description || '-' }), _jsxs("td", { className: "px-4 py-3 text-sm text-right font-semibold text-gray-900", children: ["$", tx.amount.toFixed(2)] })] }, tx.id)))) })] }) })] }));
}
