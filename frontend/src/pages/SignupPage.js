import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/authStore';
import apiCall from '@/lib/api';
import { toast } from 'sonner';
export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken, setError } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await apiCall('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            toast.success('Account created! Signing you in...');
            // Auto-login after signup
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            const result = await fetch('http://127.0.0.1:8000/auth/token', {
                method: 'POST',
                body: formData,
            }).then(r => r.json());
            setToken(result.access_token);
            navigate('/dashboard');
        }
        catch (err) {
            const message = err.status === 400 ? 'Email already registered' : 'Signup failed';
            setError(message);
            toast.error(message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-2 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center", children: _jsx("span", { className: "text-white text-xl font-bold", children: "\uD83D\uDCB0" }) }) }), _jsx(CardTitle, { children: "Create Account" }), _jsx("p", { className: "text-sm text-gray-600", children: "Join Dynamic Wallet today" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: isLoading, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), disabled: isLoading, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", placeholder: "Confirm your password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), disabled: isLoading, required: true })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Creating account...' : 'Create Account' })] }), _jsxs("div", { className: "mt-4 text-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Already have an account? " }), _jsx("button", { onClick: () => navigate('/login'), className: "text-indigo-600 hover:text-indigo-700 font-medium", children: "Sign in" })] })] })] }) }));
}
