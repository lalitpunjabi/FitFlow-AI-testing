import { create } from 'zustand';
import { SleepLog } from '../types';

interface SleepState {
  sleepLogs: SleepLog[];
  addSleepLog: (log: SleepLog) => void;
  updateSleepLog: (id: string, updates: Partial<SleepLog>) => void;
  getSleepLogForDate: (date: string) => SleepLog | undefined;
}

export const useSleepStore = create<SleepState>((set, get) => ({
  sleepLogs: [],
  addSleepLog: (log) => set((state) => ({
    sleepLogs: [...state.sleepLogs, log]
  })),
  updateSleepLog: (id, updates) => set((state) => ({
    sleepLogs: state.sleepLogs.map(log => 
      log.id === id ? { ...log, ...updates } : log
    )
  })),
  getSleepLogForDate: (date) => {
    return get().sleepLogs.find(log => log.date === date);
  }
}));