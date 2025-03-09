import React, { useState } from 'react';
import { useNutritionStore } from '../store/nutritionStore';
import { useUserStore } from '../store/userStore';
import { Droplets, Plus, Minus, Clock } from 'lucide-react';
import { generateId, calculateWaterIntake, formatTime } from '../utils/helpers';

const WaterPage: React.FC = () => {
  const { user } = useUserStore();
  const { waterLogs, addWaterLog, getTotalWaterForDate } = useNutritionStore();
  
  const [amount, setAmount] = useState(250); // Default 250ml
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate recommended water intake
  const recommendedIntake = user ? calculateWaterIntake(user.weight) : 2400; // Default to 2400ml if no user
  
  // Get total water intake for today
  const totalWaterToday = getTotalWaterForDate(today);
  
  // Calculate progress percentage
  const progressPercentage = Math.min((totalWaterToday / recommendedIntake) * 100, 100);
  
  const handleAddWater = () => {
    const now = new Date();
    const time = now.toTimeString().substring(0, 5); // HH:MM format
    
    addWaterLog({
      id: generateId(),
      date: today,
      amount,
      time
    });
  };
  
  const increaseAmount = () => {
    setAmount(prev => prev + 50);
  };
  
  const decreaseAmount = () => {
    setAmount(prev => Math.max(50, prev - 50));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Water Tracker</h1>
      </div>

      {/* Water Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 bg-blue-50 rounded-full flex flex-col items-center justify-center">
                <Droplets size={32} className="text-blue-500 mb-1" />
                <span className="text-2xl font-bold text-blue-600">{totalWaterToday} ml</span>
                <span className="text-sm text-gray-500">of {recommendedIntake} ml</span>
              </div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercentage) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          
          <div className="mt-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">0 ml</span>
              <span className="text-sm text-gray-500">{recommendedIntake} ml</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Water */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Add Water</h2>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decreaseAmount}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <Minus size={20} />
          </button>
          <div className="w-32 text-center">
            <span className="text-3xl font-bold text-blue-600">{amount}</span>
            <span className="text-lg text-gray-500 ml-1">ml</span>
          </div>
          <button
            onClick={increaseAmount}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAddWater}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Water
          </button>
        </div>
      </div>

      {/* Water Log */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Today's Log</h2>
        </div>
        <div className="p-6">
          {waterLogs.filter(log => log.date === today).length > 0 ? (
            <div className="space-y-3">
              {waterLogs
                .filter(log => log.date === today)
                .sort((a, b) => b.time.localeCompare(a.time))
                .map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Droplets size={16} className="text-blue-600" />
                      </div>
                      <span className="font-medium">{log.amount} ml</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{formatTime(log.time)}</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No water logged today. Stay hydrated!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterPage;