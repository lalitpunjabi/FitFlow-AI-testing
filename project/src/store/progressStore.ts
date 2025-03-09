import { create } from 'zustand';
import { Progress } from '../types';

interface ProgressState {
  progressLogs: Progress[];
  addProgressLog: (log: Progress) => void;
  updateProgressLog: (date: string, updates: Partial<Progress>) => void;
  getProgressLogForDate: (date: string) => Progress | undefined;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progressLogs: [],
  addProgressLog: (log) => set((state) => ({
    progressLogs: [...state.progressLogs, log]
  })),
  updateProgressLog: (date, updates) => set((state) => ({
    progressLogs: state.progressLogs.map(log => 
      log.date === date ? { ...log, ...updates } : log
    )
  })),
  getProgressLogForDate: (date) => {
    return get().progressLogs.find(log => log.date === date);
  }
}));