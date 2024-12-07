import { create } from "zustand";
import type { AuthState, User } from "@/types/auth";

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  logout: () => set({ user: null, isAuthenticated: false }),
}));
