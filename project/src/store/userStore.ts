import { create } from 'zustand';
import { UserProfile } from '../types';

interface UserState {
  user: UserProfile | null;
  isOnboarded: boolean;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isOnboarded: false,
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  completeOnboarding: () => set({ isOnboarded: true })
}));