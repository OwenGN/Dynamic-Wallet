import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/authStore';
import { apiCallForm } from '@/lib/api';
import { toast } from 'sonner';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken, setError } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            const result = await apiCallForm('/auth/token', {
                method: 'POST',
                headers: {},
                body: formData,
            });
            setToken(result.access_token);
            toast.success('Login successful!');
            navigate('/dashboard');
        }
        catch (err) {
            const message = err.status === 401 ? 'Invalid email or password' : 'Login failed';
            setError(message);
            toast.error(message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-2 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center", children: _jsx("span", { className: "text-white text-xl font-bold", children: "\uD83D\uDCB0" }) }) }), _jsx(CardTitle, { children: "Dynamic Wallet" }), _jsx("p", { className: "text-sm text-gray-600", children: "Sign in to your account" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: isLoading, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), disabled: isLoading, required: true })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Signing in...' : 'Sign In' })] }), _jsxs("div", { className: "mt-4 text-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Don't have an account? " }), _jsx("button", { onClick: () => navigate('/signup'), className: "text-indigo-600 hover:text-indigo-700 font-medium", children: "Sign up" })] })] })] }) }));
}
