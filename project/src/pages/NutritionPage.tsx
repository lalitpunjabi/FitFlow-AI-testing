import React from 'react';
import { useNutritionStore } from '../store/nutritionStore';
import { mockMealPlan } from '../utils/mockData';
import { Clock, Utensils, PieChart } from 'lucide-react';
import { formatTime } from '../utils/helpers';

const NutritionPage: React.FC = () => {
  const { currentMealPlan, setCurrentMealPlan } = useNutritionStore();
  
  // Set mock meal plan if none exists
  React.useEffect(() => {
    if (!currentMealPlan) {
      setCurrentMealPlan(mockMealPlan);
    }
  }, [currentMealPlan, setCurrentMealPlan]);

  if (!currentMealPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading nutrition plan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Your Nutrition Plan</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Change Plan
        </button>
      </div>

      {/* Plan Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold">{currentMealPlan.name}</h2>
          <p className="text-gray-600 mt-1">{currentMealPlan.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Daily Calories</p>
              <p className="text-lg font-semibold">{currentMealPlan.totalCalories} kcal</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-lg font-semibold">{currentMealPlan.macros.protein}g</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="text-lg font-semibold">{currentMealPlan.macros.carbs}g</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Fats</p>
              <p className="text-lg font-semibold">{currentMealPlan.macros.fats}g</p>
            </div>
          </div>
          
          {/* Macros Chart Placeholder */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Macronutrient Distribution</h3>
                <div className="flex items-center">
                  <PieChart size={16} className="text-gray-500 mr-1" />
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${(currentMealPlan.macros.protein * 4 / currentMealPlan.totalCalories) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${(currentMealPlan.macros.carbs * 4 / currentMealPlan.totalCalories) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-yellow-500" 
                    style={{ width: `${(currentMealPlan.macros.fats * 9 / currentMealPlan.totalCalories) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span>Protein</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>Carbs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                  <span>Fats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Meal Plan */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Daily Meal Plan</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {currentMealPlan.meals.map((meal) => (
              <div key={meal.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Utensils size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{meal.name}</h3>
                      <div className="flex items-center mt-1">
                        <Clock size={14} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{formatTime(meal.time)}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{meal.totalCalories} kcal</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                    Log Meal
                  </button>
                </div>
                
                <div className="mt-4 space-y-2">
                  {meal.foods.map((food) => (
                    <div key={food.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{food.name}</h4>
                          <p className="text-sm text-gray-500">{food.portion}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{food.calories} kcal</p>
                          <p className="text-xs text-gray-500">
                            P: {food.macros.protein}g • C: {food.macros.carbs}g • F: {food.macros.fats}g
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Food Logger */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Quick Food Logger</h2>
        </div>
        <div className="p-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Describe your meal (e.g., 'Grilled chicken with rice and vegetables')"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Log
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Our AI will analyze your meal and estimate calories and macronutrients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;