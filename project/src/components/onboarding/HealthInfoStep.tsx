import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { X } from 'lucide-react';

interface HealthInfoStepProps {
  formData: Partial<UserProfile>;
  onChange: (field: keyof UserProfile, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const HealthInfoStep: React.FC<HealthInfoStepProps> = ({ formData, onChange, onNext, onBack }) => {
  const [allergyInput, setAllergyInput] = useState('');
  const [healthIssueInput, setHealthIssueInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addAllergy = () => {
    if (allergyInput.trim() && !formData.allergies?.includes(allergyInput.trim())) {
      onChange('allergies', [...(formData.allergies || []), allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy: string) => {
    onChange('allergies', formData.allergies?.filter(a => a !== allergy) || []);
  };

  const addHealthIssue = () => {
    if (healthIssueInput.trim() && !formData.healthIssues?.includes(healthIssueInput.trim())) {
      onChange('healthIssues', [...(formData.healthIssues || []), healthIssueInput.trim()]);
      setHealthIssueInput('');
    }
  };

  const removeHealthIssue = (issue: string) => {
    onChange('healthIssues', formData.healthIssues?.filter(i => i !== issue) || []);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Health Information</h2>
      <p className="text-gray-600 mb-6">
        This information helps us customize your fitness and nutrition plans to accommodate any health considerations.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Allergies or Intolerances
            </label>
            <div className="flex">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="e.g., Peanuts, Lactose, Gluten"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addAllergy}
                className="px-4 py-2 bg-emerald-600 text-white rounded-r-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            
            {formData.allergies && formData.allergies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.allergies.map((allergy, index) => (
                  <div 
                    key={index} 
                    className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    {allergy}
                    <button 
                      type="button" 
                      onClick={() => removeAllergy(allergy)}
                      className="ml-1 text-emerald-600 hover:text-emerald-800 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Conditions or Limitations
            </label>
            <div className="flex">
              <input
                type="text"
                value={healthIssueInput}
                onChange={(e) => setHealthIssueInput(e.target.value)}
                placeholder="e.g., Back pain, Asthma, Diabetes"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={addHealthIssue}
                className="px-4 py-2 bg-emerald-600 text-white rounded-r-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            
            {formData.healthIssues && formData.healthIssues.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.healthIssues.map((issue, index) => (
                  <div 
                    key={index} 
                    className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {issue}
                    <button 
                      type="button" 
                      onClick={() => removeHealthIssue(issue)}
                      className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

export default HealthInfoStep;