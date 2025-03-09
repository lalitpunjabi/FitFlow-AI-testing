import React from 'react';
import { UserProfile } from '../../types';
import { Activity, Dumbbell, Trophy } from 'lucide-react';

interface FitnessLevelStepProps {
  formData: Partial<UserProfile>;
  onChange: (field: keyof UserProfile, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const FitnessLevelStep: React.FC<FitnessLevelStepProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const fitnessLevels = [
    {
      level: 'beginner',
      title: 'Beginner',
      icon: <Activity size={32} className="text-emerald-500" />,
      description: 'New to fitness or returning after a long break. Little to no experience with structured workouts.'
    },
    {
      level: 'intermediate',
      title: 'Intermediate',
      icon: <Dumbbell size={32} className="text-emerald-600" />,
      description: 'Consistent with workouts for 6+ months. Familiar with proper form and various exercises.'
    },
    {
      level: 'advanced',
      title: 'Advanced',
      icon: <Trophy size={32} className="text-emerald-700" />,
      description: 'Experienced with fitness for 2+ years. Strong understanding of nutrition and training principles.'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Fitness Level</h2>
      <p className="text-gray-600 mb-6">
        This helps us tailor your workout plans to your current fitness level for optimal results.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {fitnessLevels.map((level) => (
            <div 
              key={level.level}
              className={`border rounded-lg p-5 cursor-pointer transition-all ${
                formData.fitnessLevel === level.level 
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500' 
                  : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
              }`}
              onClick={() => onChange('fitnessLevel', level.level as 'beginner' | 'intermediate' | 'advanced')}
            >
              <div className="flex items-start">
                <div className="mr-4">
                  {level.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">{level.title}</h3>
                  <p className="text-gray-500 mt-1">{level.description}</p>
                </div>
                <div className="ml-auto">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.fitnessLevel === level.level 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.fitnessLevel === level.level && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default FitnessLevelStep;