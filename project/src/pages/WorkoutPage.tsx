import React from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { mockWorkoutPlan } from '../utils/mockData';
import { Play, Clock, Flame, ChevronRight } from 'lucide-react';

const WorkoutPage: React.FC = () => {
  const { currentPlan, setCurrentPlan } = useWorkoutStore();
  
  // Set mock workout plan if none exists
  React.useEffect(() => {
    if (!currentPlan) {
      setCurrentPlan(mockWorkoutPlan);
    }
  }, [currentPlan, setCurrentPlan]);

  if (!currentPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading workout plan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Your Workout Plan</h1>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
          Change Plan
        </button>
      </div>

      {/* Plan Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold">{currentPlan.name}</h2>
          <p className="text-gray-600 mt-1">{currentPlan.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-semibold">{currentPlan.duration} weeks</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Frequency</p>
              <p className="text-lg font-semibold">{currentPlan.frequency} days/week</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Level</p>
              <p className="text-lg font-semibold capitalize">{currentPlan.forFitnessLevel}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Equipment</p>
              <p className="text-lg font-semibold">{currentPlan.isGymRequired ? 'Gym Required' : 'Home Friendly'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Weekly Schedule</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => {
              const workout = currentPlan.workouts.find(w => w.dayOfWeek === index);
              
              return (
                <div 
                  key={day} 
                  className={`p-4 rounded-lg ${workout ? 'bg-gray-50' : 'bg-gray-50 opacity-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{day}</h3>
                    {workout ? (
                      <span className="text-sm text-emerald-600 font-medium">Workout Day</span>
                    ) : (
                      <span className="text-sm text-gray-500">Rest Day</span>
                    )}
                  </div>
                  
                  {workout && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{workout.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              <span>{workout.duration} min</span>
                            </div>
                            <div className="flex items-center">
                              <Flame size={14} className="mr-1" />
                              <span>{workout.caloriesBurn} cal</span>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center justify-center w-10 h-10 bg-emerald-600 text-white rounded-full hover:bg-emerald-700">
                          <Play size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      {currentPlan.workouts.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Today's Workout</h2>
          </div>
          <div className="p-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold">{currentPlan.workouts[0].name}</h3>
              <p className="text-gray-600 mt-1">{currentPlan.workouts[0].description}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{currentPlan.workouts[0].duration} min</span>
                </div>
                <div className="flex items-center">
                  <Flame size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{currentPlan.workouts[0].caloriesBurn} cal</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                {currentPlan.workouts[0].exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-700">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-500">{exercise.sets} sets × {exercise.reps} reps</p>
                      </div>
                      <ChevronRight size={20} className="ml-auto text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Start Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;