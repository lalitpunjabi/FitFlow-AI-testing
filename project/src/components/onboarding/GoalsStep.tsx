import React from 'react';
import { UserProfile, GoalPhysique } from '../../types';

interface GoalsStepProps {
  formData: Partial<UserProfile>;
  onChange: (field: keyof UserProfile, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const goalPhysiques: { type: GoalPhysique; title: string; description: string }[] = [
    {
      type: 'classic_physique',
      title: 'Classic Physique',
      description: 'Focus on balanced proportions, symmetry, and moderate muscle mass with a small waist.'
    },
    {
      type: 'mens_physique',
      title: 'Men\'s Physique',
      description: 'Emphasis on V-taper, defined abs, and upper body development with less focus on legs.'
    },
    {
      type: 'womens_physique',
      title: 'Women\'s Physique',
      description: 'Balanced muscle development with feminine lines, moderate definition, and symmetry.'
    },
    {
      type: 'powerlifter',
      title: 'Powerlifter',
      description: 'Focus on strength in squat, bench press, and deadlift with less emphasis on aesthetics.'
    },
    {
      type: 'bodybuilder',
      title: 'Bodybuilder',
      description: 'Maximum muscle mass, definition, and symmetry across all muscle groups.'
    },
    {
      type: 'general_fitness',
      title: 'General Fitness',
      description: 'Overall health, moderate muscle tone, and cardiovascular fitness.'
    },
    {
      type: 'hybrid_training',
      title: 'Hybrid Training',
      description: 'Balance of strength, muscle, and endurance for versatile athletic performance.'
    },
    {
      type: 'crossfit',
      title: 'CrossFit',
      description: 'Functional fitness with a mix of strength, endurance, and cardiovascular capacity.'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Fitness Goals</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="currentCaloriesCount" className="block text-sm font-medium text-gray-700 mb-1">
              Current Daily Calorie Intake (estimate)
            </label>
            <input
              type="number"
              id="currentCaloriesCount"
              min="1000"
              max="5000"
              value={formData.currentCaloriesCount || ''}
              onChange={(e) => onChange('currentCaloriesCount', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              This helps us calculate your nutrition plan. If you're not sure, make your best guess.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Goal Physique
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalPhysiques.map((goal) => (
                <div 
                  key={goal.type}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.goalPhysique === goal.type 
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500' 
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                  onClick={() => onChange('goalPhysique', goal.type)}
                >
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalsStep;