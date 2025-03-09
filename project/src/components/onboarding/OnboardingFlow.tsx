import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { UserProfile, BodyType, GoalPhysique } from '../../types';
import { generateId } from '../../utils/helpers';
import PersonalInfoStep from './PersonalInfoStep';
import BodyInfoStep from './BodyInfoStep';
import GoalsStep from './GoalsStep';
import HealthInfoStep from './HealthInfoStep';
import FitnessLevelStep from './FitnessLevelStep';
import SummaryStep from './SummaryStep';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, completeOnboarding } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    id: generateId(),
    name: '',
    age: 30,
    gender: 'male',
    height: 175,
    weight: 70,
    bodyType: 'mesomorph',
    goalPhysique: 'general_fitness',
    currentCaloriesCount: 2000,
    allergies: [],
    healthIssues: [],
    fitnessLevel: 'beginner'
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    // Save user data
    setUser(formData as UserProfile);
    completeOnboarding();
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <BodyInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <GoalsStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <HealthInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <FitnessLevelStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <SummaryStep
            formData={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to FitFlow AI</h1>
          <p className="text-gray-600">Let's personalize your fitness journey</p>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Start</span>
            <span>Complete</span>
          </div>
        </div>
        
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;