import React from 'react';
import { UserProfile, BodyType } from '../../types';
import { calculateBMI } from '../../utils/helpers';

interface BodyInfoStepProps {
  formData: Partial<UserProfile>;
  onChange: (field: keyof UserProfile, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const BodyInfoStep: React.FC<BodyInfoStepProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const bodyTypes: { type: BodyType; title: string; description: string }[] = [
    {
      type: 'ectomorph',
      title: 'Ectomorph',
      description: 'Naturally thin with a lean build, narrow shoulders and hips, and difficulty gaining weight.'
    },
    {
      type: 'mesomorph',
      title: 'Mesomorph',
      description: 'Athletic build with wider shoulders, narrow waist, and responds well to exercise.'
    },
    {
      type: 'endomorph',
      title: 'Endomorph',
      description: 'Naturally higher body fat, wider hips, and slower metabolism.'
    }
  ];

  const bmi = formData.height && formData.weight 
    ? calculateBMI(formData.height, formData.weight).toFixed(1) 
    : 'N/A';

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = bmi !== 'N/A' ? getBmiCategory(parseFloat(bmi)) : null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Body Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                min="100"
                max="250"
                value={formData.height || ''}
                onChange={(e) => onChange('height', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                min="30"
                max="250"
                step="0.1"
                value={formData.weight || ''}
                onChange={(e) => onChange('weight', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* BMI Display */}
          {bmi !== 'N/A' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Your BMI</h3>
                  <p className="text-2xl font-bold">{bmi}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-700">Category</h3>
                  <p className={`text-lg font-semibold ${bmiInfo?.color}`}>
                    {bmiInfo?.category}
                  </p>
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Body Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bodyTypes.map((bodyType) => (
                <div 
                  key={bodyType.type}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.bodyType === bodyType.type 
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500' 
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                  onClick={() => onChange('bodyType', bodyType.type)}
                >
                  <h3 className="font-medium text-gray-900">{bodyType.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{bodyType.description}</p>
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

export default BodyInfoStep;