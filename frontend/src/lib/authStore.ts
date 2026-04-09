import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setToken: (token: string | null) =>
        set({
          token,
          isAuthenticated: !!token,
          error: null,
        }),
      setError: (error: string | null) => set({ error }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      logout: () =>
        set({
          token: null,
          isAuthenticated: false,
          error: null,
        }),
    }),
    {
      name: 'auth-store',
    }
  )
);
