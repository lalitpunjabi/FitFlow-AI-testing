export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  bodyType: BodyType;
  goalPhysique: GoalPhysique;
  currentCaloriesCount: number;
  allergies: string[];
  healthIssues: string[];
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

export type GoalPhysique = 
  | 'classic_physique' 
  | 'mens_physique' 
  | 'womens_physique' 
  | 'powerlifter' 
  | 'bodybuilder' 
  | 'general_fitness' 
  | 'hybrid_training' 
  | 'crossfit';

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  workouts: Workout[];
  duration: number; // in weeks
  frequency: number; // workouts per week
  forGoalPhysique: GoalPhysique;
  forBodyType: BodyType;
  forFitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  isGymRequired: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number; // in minutes
  caloriesBurn: number; // estimated
  type: 'strength' | 'cardio' | 'flexibility' | 'balance';
  dayOfWeek: number; // 0-6, where 0 is Sunday
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string[];
  sets: number;
  reps: number;
  restTime: number; // in seconds
  videoUrl: string;
  imageUrl: string;
  instructions: string[];
  equipment: string[];
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  totalCalories: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fats: number; // in grams
  };
  forGoalPhysique: GoalPhysique;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  time: string; // e.g., "08:00"
  foods: Food[];
  totalCalories: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fats: number; // in grams
  };
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Food {
  id: string;
  name: string;
  portion: string; // e.g., "100g", "1 cup"
  calories: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fats: number; // in grams
  };
  micronutrients: Record<string, number>; // e.g., { "vitamin C": 30 }
}

export interface WorkoutLog {
  id: string;
  date: string;
  workoutId: string;
  completed: boolean;
  exerciseLogs: ExerciseLog[];
  duration: number; // actual duration in minutes
  caloriesBurned: number;
  heartRate: {
    average: number;
    peak: number;
  };
  notes: string;
}

export interface ExerciseLog {
  exerciseId: string;
  sets: {
    weight: number;
    reps: number;
    completed: boolean;
  }[];
}

export interface MealLog {
  id: string;
  date: string;
  mealId: string;
  completed: boolean;
  actualFoods: {
    foodId: string;
    portion: string;
  }[];
  totalCalories: number;
  notes: string;
}

export interface WaterLog {
  id: string;
  date: string;
  amount: number; // in ml
  time: string;
}

export interface SleepLog {
  id: string;
  date: string;
  duration: number; // in hours
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes: string;
}

export interface Reminder {
  id: string;
  type: 'workout' | 'meal' | 'water' | 'sleep';
  time: string;
  message: string;
  isActive: boolean;
  daysOfWeek: number[]; // 0-6, where 0 is Sunday
}

export interface Progress {
  date: string;
  weight: number;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    thighs: number;
  };
  photos: string[]; // URLs to progress photos
}