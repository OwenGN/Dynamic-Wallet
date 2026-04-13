import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import apiCall from '@/lib/api';
import { toast } from 'sonner';
export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await apiCall('/goals/', {});
                setGoals(data);
            }
            catch (error) {
                toast.error('Failed to load goals');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchGoals();
    }, []);
    if (isLoading) {
        return _jsx("div", { className: "text-center py-8", children: "Loading goals..." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Goals" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Track your financial goals and targets." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: goals.map((goal) => {
                    const progress = (goal.current_amount / goal.target_amount) * 100;
                    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { className: "text-lg", children: goal.name }), _jsx("span", { className: "text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded", children: goal.type })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "Progress" }), _jsxs("span", { className: "font-semibold", children: [Math.round(progress), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-indigo-600 h-2 rounded-full transition-all", style: { width: `${Math.min(progress, 100)}%` } }) })] }), _jsx("div", { className: "flex justify-between text-sm", children: _jsxs("span", { className: "text-gray-600", children: ["$", goal.current_amount.toFixed(2), " / $", goal.target_amount.toFixed(2)] }) }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Target: ", new Date(goal.target_date).toLocaleDateString()] })] }) })] }, goal.id));
                }) }), goals.length === 0 && (_jsx(Card, { children: _jsx(CardContent, { className: "py-12", children: _jsxs("div", { className: "text-center text-gray-500", children: [_jsx("p", { children: "No goals found." }), _jsx(Button, { className: "mt-4", children: "Create Goal" })] }) }) }))] }));
}
