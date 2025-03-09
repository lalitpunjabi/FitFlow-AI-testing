import { create } from 'zustand';
import { MealPlan, Meal, MealLog, WaterLog } from '../types';

interface NutritionState {
  currentMealPlan: MealPlan | null;
  mealLogs: MealLog[];
  waterLogs: WaterLog[];
  setCurrentMealPlan: (plan: MealPlan) => void;
  addMealLog: (log: MealLog) => void;
  updateMealLog: (id: string, updates: Partial<MealLog>) => void;
  addWaterLog: (log: WaterLog) => void;
  getMealLogsForDate: (date: string) => MealLog[];
  getWaterLogsForDate: (date: string) => WaterLog[];
  getTotalWaterForDate: (date: string) => number;
}

export const useNutritionStore = create<NutritionState>((set, get) => ({
  currentMealPlan: null,
  mealLogs: [],
  waterLogs: [],
  setCurrentMealPlan: (plan) => set({ currentMealPlan: plan }),
  addMealLog: (log) => set((state) => ({
    mealLogs: [...state.mealLogs, log]
  })),
  updateMealLog: (id, updates) => set((state) => ({
    mealLogs: state.mealLogs.map(log => 
      log.id === id ? { ...log, ...updates } : log
    )
  })),
  addWaterLog: (log) => set((state) => ({
    waterLogs: [...state.waterLogs, log]
  })),
  getMealLogsForDate: (date) => {
    return get().mealLogs.filter(log => log.date === date);
  },
  getWaterLogsForDate: (date) => {
    return get().waterLogs.filter(log => log.date === date);
  },
  getTotalWaterForDate: (date) => {
    return get().waterLogs
      .filter(log => log.date === date)
      .reduce((total, log) => total + log.amount, 0);
  }
}));