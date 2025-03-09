import React from 'react';
import { UserProfile } from '../../types';
import { calculateBMI } from '../../utils/helpers';
import { Check, ChevronRight } from 'lucide-react';

interface SummaryStepProps {
  formData: Partial<UserProfile>;
  onSubmit: () => void;
  onBack: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ formData, onSubmit, onBack }) => {
  const bmi = formData.height && formData.weight 
    ? calculateBMI(formData.height, formData.weight).toFixed(1) 
    : 'N/A';

  const formatBodyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatGoalPhysique = (goal: string) => {
    return goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <p className="text-gray-600 mb-6">
        Please review your information before finalizing your profile.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{formData.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{formData.gender}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Body Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-medium">{formData.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{formData.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">BMI</p>
              <p className="font-medium">{bmi}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Body Type</p>
              <p className="font-medium">{formData.bodyType && formatBodyType(formData.bodyType)}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Fitness Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Goal Physique</p>
              <p className="font-medium">{formData.goalPhysique && formatGoalPhysique(formData.goalPhysique)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Calorie Intake</p>
              <p className="font-medium">{formData.currentCaloriesCount} calories/day</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fitness Level</p>
              <p className="font-medium capitalize">{formData.fitnessLevel}</p>
            </div>
          </div>
        </div>

        {(formData.allergies?.length || formData.healthIssues?.length) ? (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Health Information</h3>
            
            {formData.allergies && formData.allergies.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Allergies/Intolerances</p>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <span key={index} className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.healthIssues && formData.healthIssues.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Health Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {formData.healthIssues.map((issue, index) => (
                    <span key={index} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
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
          type="button"
          onClick={onSubmit}
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center"
        >
          <span>Complete Setup</span>
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;