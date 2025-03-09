import { create } from 'zustand';
import { WorkoutPlan, Workout, WorkoutLog } from '../types';

interface WorkoutState {
  currentPlan: WorkoutPlan | null;
  workoutLogs: WorkoutLog[];
  setCurrentPlan: (plan: WorkoutPlan) => void;
  addWorkoutLog: (log: WorkoutLog) => void;
  updateWorkoutLog: (id: string, updates: Partial<WorkoutLog>) => void;
  getWorkoutLogsForDate: (date: string) => WorkoutLog[];
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  currentPlan: null,
  workoutLogs: [],
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  addWorkoutLog: (log) => set((state) => ({
    workoutLogs: [...state.workoutLogs, log]
  })),
  updateWorkoutLog: (id, updates) => set((state) => ({
    workoutLogs: state.workoutLogs.map(log => 
      log.id === id ? { ...log, ...updates } : log
    )
  })),
  getWorkoutLogsForDate: (date) => {
    return get().workoutLogs.filter(log => log.date === date);
  }
}));