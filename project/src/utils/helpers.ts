import { format, parseISO, isToday, isYesterday, addDays } from 'date-fns';

// Format date to display
export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM dd, yyyy');
};

// Format time to display
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Calculate BMI
export const calculateBMI = (height: number, weight: number): number => {
  // Height in meters
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
export const calculateBMR = (
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female' | 'other'
): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
export const calculateTDEE = (
  bmr: number, 
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
): number => {
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    very_active: 1.9 // Very hard exercise & physical job or 2x training
  };
  
  return bmr * activityMultipliers[activityLevel];
};

// Calculate macronutrient distribution based on goal
export const calculateMacros = (
  calories: number, 
  goal: 'lose_weight' | 'maintain' | 'gain_muscle'
): { protein: number; carbs: number; fats: number } => {
  let proteinPercentage, carbsPercentage, fatsPercentage;
  
  switch (goal) {
    case 'lose_weight':
      proteinPercentage = 0.4; // 40% protein
      carbsPercentage = 0.3; // 30% carbs
      fatsPercentage = 0.3; // 30% fats
      break;
    case 'maintain':
      proteinPercentage = 0.3; // 30% protein
      carbsPercentage = 0.4; // 40% carbs
      fatsPercentage = 0.3; // 30% fats
      break;
    case 'gain_muscle':
      proteinPercentage = 0.3; // 30% protein
      carbsPercentage = 0.5; // 50% carbs
      fatsPercentage = 0.2; // 20% fats
      break;
    default:
      proteinPercentage = 0.3;
      carbsPercentage = 0.4;
      fatsPercentage = 0.3;
  }
  
  // Protein and carbs have 4 calories per gram, fats have 9 calories per gram
  const protein = Math.round((calories * proteinPercentage) / 4);
  const carbs = Math.round((calories * carbsPercentage) / 4);
  const fats = Math.round((calories * fatsPercentage) / 9);
  
  return { protein, carbs, fats };
};

// Get days of the week
export const getDaysOfWeek = (): string[] => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
};

// Get next 7 days
export const getNext7Days = (): { date: Date; formatted: string }[] => {
  const today = new Date();
  const next7Days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    next7Days.push({
      date,
      formatted: format(date, 'yyyy-MM-dd')
    });
  }
  
  return next7Days;
};

// Calculate water intake recommendation based on weight
export const calculateWaterIntake = (weight: number): number => {
  // Recommendation: 30ml per kg of body weight
  return weight * 30;
};

// Calculate sleep recommendation based on age
export const calculateSleepRecommendation = (age: number): number => {
  if (age <= 12) return 9;
  if (age <= 18) return 8.5;
  if (age <= 64) return 8;
  return 7.5;
};