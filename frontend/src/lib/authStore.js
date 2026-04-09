import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create()(persist((set) => ({
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    setToken: (token) => set({
        token,
        isAuthenticated: !!token,
        error: null,
    }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: () => set({
        token: null,
        isAuthenticated: false,
        error: null,
    }),
}), {
    name: 'auth-store',
}));
