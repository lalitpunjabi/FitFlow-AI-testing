import React from 'react';
import { useUserStore } from '../store/userStore';
import { useWorkoutStore } from '../store/workoutStore';
import { useNutritionStore } from '../store/nutritionStore';
import { Calendar, Dumbbell, Utensils, Droplets, Moon, LineChart } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { user } = useUserStore();
  const { currentPlan } = useWorkoutStore();
  const { currentMealPlan } = useNutritionStore();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name || 'Fitness Enthusiast'}
        </h1>
        <span className="text-sm text-gray-500">{formatDate(today)}</span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Dumbbell size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
              <p className="text-lg font-semibold">{currentPlan?.name || 'No active plan'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Utensils size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nutrition Plan</h3>
              <p className="text-lg font-semibold">{currentMealPlan?.name || 'No active plan'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <LineChart size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Weight</h3>
              <p className="text-lg font-semibold">{user?.weight || '--'} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {currentPlan ? (
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-full mr-3">
                  <Dumbbell size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium">Workout: Upper Body Strength</h3>
                  <p className="text-sm text-gray-500">60 minutes • 400 calories</p>
                </div>
                <button className="ml-auto px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700">
                  Start
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No workout scheduled for today
              </div>
            )}

            {currentMealPlan && (
              <>
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Utensils size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Breakfast: Protein-Packed Breakfast</h3>
                    <p className="text-sm text-gray-500">8:00 AM • 240 calories</p>
                  </div>
                  <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Log
                  </button>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Utensils size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Lunch: Balanced Lunch</h3>
                    <p className="text-sm text-gray-500">1:00 PM • 311 calories</p>
                  </div>
                  <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Log
                  </button>
                </div>
              </>
            )}

            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-cyan-100 rounded-full mr-3">
                <Droplets size={20} className="text-cyan-600" />
              </div>
              <div>
                <h3 className="font-medium">Water Intake</h3>
                <p className="text-sm text-gray-500">Target: 2400ml</p>
              </div>
              <button className="ml-auto px-3 py-1 bg-cyan-600 text-white text-sm rounded-md hover:bg-cyan-700">
                Log
              </button>
            </div>

            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-indigo-100 rounded-full mr-3">
                <Moon size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">Sleep Schedule</h3>
                <p className="text-sm text-gray-500">Target: 8 hours</p>
              </div>
              <button className="ml-auto px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Weekly Overview</h2>
        </div>
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {Array.from({ length: 7 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + index);
              const isToday = new Date().getDate() === date.getDate();
              
              return (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg flex flex-col items-center justify-center ${
                    isToday ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'
                  }`}
                >
                  <p className="text-xs text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <p className="text-lg font-bold">{date.getDate()}</p>
                  {isToday && <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;