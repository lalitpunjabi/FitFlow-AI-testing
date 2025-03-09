import React, { useState } from 'react';
import { useProgressStore } from '../store/progressStore';
import { useUserStore } from '../store/userStore';
import { LineChart, BarChart, Camera, Plus, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { generateId } from '../utils/helpers';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressPage: React.FC = () => {
  const { user } = useUserStore();
  const { progressLogs, addProgressLog } = useProgressStore();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [weight, setWeight] = useState(user?.weight || 70);
  const [measurements, setMeasurements] = useState({
    chest: 0,
    waist: 0,
    hips: 0,
    arms: 0,
    thighs: 0
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProgressLog({
      date: today,
      weight,
      measurements,
      photos: []
    });
    
    setIsAdding(false);
  };
  
  const handleMeasurementChange = (key: keyof typeof measurements, value: number) => {
    setMeasurements({
      ...measurements,
      [key]: value
    });
  };
  
  // Sort logs by date for charts
  const sortedLogs = [...progressLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Prepare data for weight chart
  const weightChartData = {
    labels: sortedLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: sortedLogs.map(log => log.weight),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };
  
  // Calculate weight change
  const calculateChange = (metric: 'weight' | keyof typeof measurements) => {
    if (sortedLogs.length < 2) return { value: 0, isPositive: false };
    
    const latest = sortedLogs[sortedLogs.length - 1];
    const previous = sortedLogs[sortedLogs.length - 2];
    
    if (metric === 'weight') {
      const change = latest.weight - previous.weight;
      return { value: Math.abs(change), isPositive: change > 0 };
    } else {
      const change = latest.measurements[metric] - previous.measurements[metric];
      return { value: Math.abs(change), isPositive: change > 0 };
    }
  };
  
  const weightChange = calculateChange('weight');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Progress Tracker</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Log Progress
          </button>
        )}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <BarChart size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Weight</h3>
              <div className="flex items-center">
                <p className="text-lg font-semibold">
                  {sortedLogs.length > 0 ? sortedLogs[sortedLogs.length - 1].weight : user?.weight || '--'} kg
                </p>
                {sortedLogs.length > 1 && (
                  <div className={`flex items-center ml-2 text-sm ${weightChange.isPositive ? 'text-red-500' : 'text-green-500'}`}>
                    {weightChange.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{weightChange.value.toFixed(1)} kg</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <LineChart size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Progress Entries</h3>
              <p className="text-lg font-semibold">{progressLogs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Calendar size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Update</h3>
              <p className="text-lg font-semibold">
                {sortedLogs.length > 0 
                  ? new Date(sortedLogs[sortedLogs.length - 1].date).toLocaleDateString() 
                  : 'No entries yet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Progress Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Log Today's Progress</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  min="30"
                  max="250"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Body Measurements (cm)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="chest" className="block text-sm text-gray-500 mb-1">
                      Chest
                    </label>
                    <input
                      type="number"
                      id="chest"
                      min="0"
                      max="200"
                      step="0.1"
                      value={measurements.chest}
                      onChange={(e) => handleMeasurementChange('chest', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="waist" className="block text-sm text-gray-500 mb-1">
                      Waist
                    </label>
                    <input
                      type="number"
                      id="waist"
                      min="0"
                      max="200"
                      step="0.1"
                      value={measurements.waist}
                      onChange={(e) => handleMeasurementChange('waist', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hips" className="block text-sm text-gray-500 mb-1">
                      Hips
                    </label>
                    <input
                      type="number"
                      id="hips"
                      min="0"
                      max="200"
                      step="0.1"
                      value={measurements.hips}
                      onChange={(e) => handleMeasurementChange('hips', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="arms" className="block text-sm text-gray-500 mb-1">
                      Arms
                    </label>
                    <input
                      type="number"
                      id="arms"
                      min="0"
                      max="100"
                      step="0.1"
                      value={measurements.arms}
                      onChange={(e) => handleMeasurementChange('arms', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="thighs" className="block text-sm text-gray-500 mb-1">
                      Thighs
                    </label>
                    <input
                      type="number"
                      id="thighs"
                      min="0"
                      max="100"
                      step="0.1"
                      value={measurements.thighs}
                      onChange={(e) => handleMeasurementChange('thighs', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Photos (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Camera size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Upload progress photos</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Select Photos
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Save Progress
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Weight Chart */}
      {progressLogs.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Weight Progress</h2>
          <div className="h-64">
            <Line 
              data={weightChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              }} 
            />
          </div>
        </div>
      )}

      {/* Progress History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Progress History</h2>
        </div>
        <div className="p-6">
          {progressLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chest
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waist
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hips
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Arms
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thighs
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...progressLogs]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((log) => (
                      <tr key={log.date}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(log.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.weight} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.measurements.chest > 0 ? `${log.measurements.chest} cm` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.measurements.waist > 0 ? `${log.measurements.waist} cm` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.measurements.hips > 0 ? `${log.measurements.hips} cm` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.measurements.arms > 0 ? `${log.measurements.arms} cm` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.measurements.thighs > 0 ? `${log.measurements.thighs} cm` : '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No progress logs yet. Start tracking your fitness journey!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;