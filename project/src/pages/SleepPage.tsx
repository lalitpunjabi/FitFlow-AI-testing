import React, { useState } from 'react';
import { useSleepStore } from '../store/sleepStore';
import { useUserStore } from '../store/userStore';
import { Moon, Clock, Calendar, Star, Plus, Minus } from 'lucide-react';
import { generateId, calculateSleepRecommendation } from '../utils/helpers';

const SleepPage: React.FC = () => {
  const { user } = useUserStore();
  const { sleepLogs, addSleepLog, getSleepLogForDate } = useSleepStore();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate recommended sleep duration
  const recommendedSleep = user ? calculateSleepRecommendation(user.age) : 8; // Default to 8 hours if no user
  
  // Get sleep log for today
  const todaySleepLog = getSleepLogForDate(today);
  
  // Form state
  const [duration, setDuration] = useState(8);
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [notes, setNotes] = useState('');
  
  const handleAddSleep = () => {
    addSleepLog({
      id: generateId(),
      date: today,
      duration,
      quality,
      notes
    });
    
    // Reset form
    setNotes('');
  };
  
  const increaseDuration = () => {
    setDuration(prev => Math.min(12, prev + 0.5));
  };
  
  const decreaseDuration = () => {
    setDuration(prev => Math.max(1, prev - 0.5));
  };

  // Get last 7 days of sleep logs
  const last7DaysSleep = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const log = getSleepLogForDate(dateString);
    return {
      date: dateString,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      duration: log?.duration || 0,
      quality: log?.quality || 'poor'
    };
  }).reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Sleep Tracker</h1>
      </div>

      {/* Sleep Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <Moon size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Sleep Overview</h2>
              <p className="text-gray-500">Track your sleep patterns</p>
            </div>
          </div>
          <div className="bg-indigo-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-indigo-600">
              Recommended: <span className="font-semibold">{recommendedSleep} hours</span>
            </p>
          </div>
        </div>
        
        {/* Sleep Chart */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Last 7 Days</h3>
          <div className="grid grid-cols-7 gap-2">
            {last7DaysSleep.map((day) => {
              const heightPercentage = (day.duration / 12) * 100; // 12 hours max
              const qualityColor = {
                poor: 'bg-red-400',
                fair: 'bg-yellow-400',
                good: 'bg-green-400',
                excellent: 'bg-indigo-400'
              }[day.quality || 'poor'];
              
              return (
                <div key={day.date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                  <div className="relative w-full h-32 bg-gray-100 rounded-t-lg">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 ${qualityColor} rounded-t-lg transition-all duration-300`}
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium mt-1">
                    {day.duration > 0 ? `${day.duration}h` : '-'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Poor</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Fair</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Good</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Sleep */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Log Sleep</h2>
        
        {todaySleepLog ? (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-center text-indigo-600">
              You've already logged your sleep for today: <span className="font-semibold">{todaySleepLog.duration} hours</span> with <span className="font-semibold capitalize">{todaySleepLog.quality}</span> quality.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Duration
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={decreaseDuration}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus size={20} />
                </button>
                <div className="w-32 text-center">
                  <span className="text-3xl font-bold text-indigo-600">{duration}</span>
                  <span className="text-lg text-gray-500 ml-1">hours</span>
                </div>
                <button
                  onClick={increaseDuration}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Quality
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['poor', 'fair', 'good', 'excellent'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuality(q)}
                    className={`py-2 px-4 rounded-md flex items-center justify-center ${
                      quality === q 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="capitalize">{q}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did you sleep? Any disturbances?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleAddSleep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Log Sleep
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sleep History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Sleep History</h2>
        </div>
        <div className="p-6">
          {sleepLogs.length > 0 ? (
            <div className="space-y-3">
              {sleepLogs
                .sort((a, b) => b.date.localeCompare(a.date))
                .map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3">
                        <Moon size={16} className="text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium">{log.duration} hours</div>
                        <div className="text-sm text-gray-500 capitalize">{log.quality} quality</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{new Date(log.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No sleep logs yet. Start tracking your sleep!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepPage;