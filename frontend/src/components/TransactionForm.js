import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
export default function TransactionForm() {
    const { token } = useAuthStore();
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [accountsRes, categoriesRes] = await Promise.all([
                    apiCall('/accounts/', {}, token),
                    apiCall('/categories/', {}, token),
                ]);
                setAccounts(accountsRes);
                setCategories(categoriesRes);
            }
            catch (error) {
                toast.error('Failed to load accounts and categories');
            }
        };
        if (token) {
            fetchOptions();
        }
    }, [token]);
    const [formData, setFormData] = useState({
        account_id: '',
        category_id: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await apiCall('/transactions/', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                    category_id: formData.category_id ? parseInt(formData.category_id) : null,
                    account_id: parseInt(formData.account_id),
                }),
            }, token);
            toast.success('Transaction added successfully!');
            setFormData({
                account_id: '',
                category_id: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
                description: '',
            });
        }
        catch (error) {
            toast.error(error.message || 'Failed to add transaction');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "grid gap-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "account_id", children: "Account" }), _jsxs("select", { id: "account_id", name: "account_id", value: formData.account_id, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900", required: true, children: [_jsx("option", { value: "", children: "Select an account" }), accounts.map((acc) => (_jsx("option", { value: acc.id, children: acc.name }, acc.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "category_id", children: "Category" }), _jsxs("select", { id: "category_id", name: "category_id", value: formData.category_id, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900", children: [_jsx("option", { value: "", children: "Select a category" }), categories.map((cat) => (_jsx("option", { value: cat.id, children: cat.name }, cat.id)))] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "date", children: "Date" }), _jsx(Input, { id: "date", type: "date", name: "date", value: formData.date, onChange: handleChange, required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "amount", children: "Amount" }), _jsx(Input, { id: "amount", type: "number", step: "0.01", name: "amount", placeholder: "0.00", value: formData.amount, onChange: handleChange, required: true })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Input, { id: "description", name: "description", placeholder: "Transaction description", value: formData.description, onChange: handleChange })] }), _jsx(Button, { type: "submit", disabled: isLoading, className: "w-full", children: isLoading ? 'Adding...' : 'Add Transaction' })] }));
}
