import React, { useState } from 'react';
import { useReminderStore } from '../store/reminderStore';
import { Bell, Clock, Calendar, Trash2, Plus, Edit } from 'lucide-react';
import { generateId, getDaysOfWeek } from '../utils/helpers';

const RemindersPage: React.FC = () => {
  const { reminders, addReminder, updateReminder, deleteReminder } = useReminderStore();
  const daysOfWeek = getDaysOfWeek();
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<'workout' | 'meal' | 'water' | 'sleep'>('workout');
  const [time, setTime] = useState('08:00');
  const [message, setMessage] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri by default
  
  const resetForm = () => {
    setType('workout');
    setTime('08:00');
    setMessage('');
    setSelectedDays([1, 3, 5]);
    setIsAdding(false);
    setEditingId(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateReminder(editingId, {
        type,
        time,
        message,
        daysOfWeek: selectedDays
      });
    } else {
      addReminder({
        id: generateId(),
        type,
        time,
        message,
        daysOfWeek: selectedDays,
        isActive: true
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      setType(reminder.type);
      setTime(reminder.time);
      setMessage(reminder.message);
      setSelectedDays(reminder.daysOfWeek);
      setEditingId(id);
      setIsAdding(true);
    }
  };
  
  const handleToggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const getTypeIcon = (reminderType: 'workout' | 'meal' | 'water' | 'sleep') => {
    switch (reminderType) {
      case 'workout':
        return <div className="p-2 bg-emerald-100 rounded-full"><Bell size={16} className="text-emerald-600" /></div>;
      case 'meal':
        return <div className="p-2 bg-blue-100 rounded-full"><Bell size={16} className="text-blue-600" /></div>;
      case 'water':
        return <div className="p-2 bg-cyan-100 rounded-full"><Bell size={16} className="text-cyan-600" /></div>;
      case 'sleep':
        return <div className="p-2 bg-indigo-100 rounded-full"><Bell size={16} className="text-indigo-600" /></div>;
    }
  };
  
  const getTypeColor = (reminderType: 'workout' | 'meal' | 'water' | 'sleep') => {
    switch (reminderType) {
      case 'workout': return 'text-emerald-600';
      case 'meal': return 'text-blue-600';
      case 'water': return 'text-cyan-600';
      case 'sleep': return 'text-indigo-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reminders</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Reminder
          </button>
        )}
      </div>

      {/* Add/Edit Reminder Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Reminder' : 'Add New Reminder'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['workout', 'meal', 'water', 'sleep'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-2 px-4 rounded-md flex items-center justify-center capitalize ${
                        type === t 
                          ? `bg-${t === 'workout' ? 'emerald' : t === 'meal' ? 'blue' : t === 'water' ? 'cyan' : 'indigo'}-600 text-white` 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <input
                  type="text"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., Time for your workout!"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat on Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleDay(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedDays.includes(index) 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {editingId ? 'Update' : 'Add'} Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reminders List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Your Reminders</h2>
        </div>
        <div className="p-6">
          {reminders.length > 0 ? (
            <div className="space-y-3">
              {reminders.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getTypeIcon(reminder.type)}
                    <div className="ml-3">
                      <div className="font-medium">{reminder.message}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{reminder.time}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{reminder.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {reminder.daysOfWeek.map(day => (
                          <span 
                            key={day} 
                            className={`text-xs px-2 py-1 rounded-full ${getTypeColor(reminder.type)} bg-opacity-10`}
                          >
                            {daysOfWeek[day].substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(reminder.id)}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No reminders set. Add a reminder to stay on track with your fitness goals!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;