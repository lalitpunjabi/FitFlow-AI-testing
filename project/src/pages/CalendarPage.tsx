import React from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { useNutritionStore } from '../store/nutritionStore';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Dumbbell, Utensils } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay } from 'date-fns';

const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { workoutLogs } = useWorkoutStore();
  const { mealLogs } = useNutritionStore();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day of week for the first day of the month (0 = Sunday, 6 = Saturday)
  const startDay = monthStart.getDay();

  // Create array for empty cells before the first day of the month
  const daysBeforeMonth = Array.from({ length: startDay }, (_, i) => null);

  // Combine empty cells and month days
  const calendarDays = [...daysBeforeMonth, ...monthDays];

  // Function to check if a day has workout or meal logs
  const getDayActivities = (day: Date) => {
    const hasWorkout = workoutLogs.some(log => {
      const logDate = parseISO(log.date);
      return isSameDay(logDate, day);
    });
    
    const hasMeal = mealLogs.some(log => {
      const logDate = parseISO(log.date);
      return isSameDay(logDate, day);
    });
    
    return { hasWorkout, hasMeal };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {calendarDays.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} className="border-t border-r p-2 bg-gray-50"></div>;
            }

            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isCurrentDay = isToday(day);
            const { hasWorkout, hasMeal } = getDayActivities(day);

            return (
              <div
                key={day.toString()}
                className={`border-t border-r p-2 min-h-[100px] ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${isCurrentDay ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between">
                  <span
                    className={`text-sm font-medium ${
                      isCurrentDay ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="flex space-x-1">
                    {hasWorkout && (
                      <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Dumbbell size={10} className="text-emerald-600" />
                      </div>
                    )}
                    {hasMeal && (
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <Utensils size={10} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Legend</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
              <Dumbbell size={10} className="text-emerald-600" />
            </div>
            <span className="text-sm">Workout</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <Utensils size={10} className="text-blue-600" />
            </div>
            <span className="text-sm">Meal</span>
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10">
        <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <CalendarIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;