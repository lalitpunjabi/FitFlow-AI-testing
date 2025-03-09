import { create } from 'zustand';
import { Reminder } from '../types';

interface ReminderState {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  getActiveReminders: () => Reminder[];
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: [],
  addReminder: (reminder) => set((state) => ({
    reminders: [...state.reminders, reminder]
  })),
  updateReminder: (id, updates) => set((state) => ({
    reminders: state.reminders.map(reminder => 
      reminder.id === id ? { ...reminder, ...updates } : reminder
    )
  })),
  deleteReminder: (id) => set((state) => ({
    reminders: state.reminders.filter(reminder => reminder.id !== id)
  })),
  getActiveReminders: () => {
    return get().reminders.filter(reminder => reminder.isActive);
  }
}));