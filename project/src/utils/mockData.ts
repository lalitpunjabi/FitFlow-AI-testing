import { 
  UserProfile, 
  WorkoutPlan, 
  Workout, 
  Exercise, 
  MealPlan, 
  Meal, 
  Food 
} from '../types';

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  age: 30,
  gender: 'male',
  height: 180,
  weight: 80,
  bodyType: 'mesomorph',
  goalPhysique: 'classic_physique',
  currentCaloriesCount: 2500,
  allergies: ['peanuts'],
  healthIssues: [],
  fitnessLevel: 'intermediate'
};

// Mock exercises
export const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Barbell Bench Press',
    description: 'A compound exercise that targets the chest, shoulders, and triceps.',
    muscleGroup: ['chest', 'shoulders', 'triceps'],
    sets: 4,
    reps: 10,
    restTime: 90,
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/barbell-bench-press-benefits.jpg',
    instructions: [
      'Lie on a flat bench with your feet flat on the floor.',
      'Grip the barbell slightly wider than shoulder-width apart.',
      'Unrack the barbell and lower it to your mid-chest.',
      'Press the barbell back up to the starting position.'
    ],
    equipment: ['barbell', 'bench']
  },
  {
    id: 'ex2',
    name: 'Squat',
    description: 'A compound exercise that targets the quadriceps, hamstrings, and glutes.',
    muscleGroup: ['quadriceps', 'hamstrings', 'glutes'],
    sets: 4,
    reps: 8,
    restTime: 120,
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.jpg',
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Place the barbell on your upper back.',
      'Bend your knees and lower your body until your thighs are parallel to the floor.',
      'Push through your heels to return to the starting position.'
    ],
    equipment: ['barbell', 'squat rack']
  },
  {
    id: 'ex3',
    name: 'Deadlift',
    description: 'A compound exercise that targets the back, hamstrings, and glutes.',
    muscleGroup: ['back', 'hamstrings', 'glutes'],
    sets: 3,
    reps: 6,
    restTime: 180,
    videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/deadlift-muscles.jpg',
    instructions: [
      'Stand with your feet hip-width apart and the barbell over your mid-foot.',
      'Bend at the hips and knees to grip the barbell.',
      'Lift the barbell by straightening your hips and knees.',
      'Lower the barbell back to the floor by bending your hips and knees.'
    ],
    equipment: ['barbell']
  },
  {
    id: 'ex4',
    name: 'Pull-up',
    description: 'A compound exercise that targets the back and biceps.',
    muscleGroup: ['back', 'biceps'],
    sets: 3,
    reps: 8,
    restTime: 90,
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/08/pull-up-variations.jpg',
    instructions: [
      'Grip the pull-up bar with your palms facing away from you.',
      'Hang with your arms fully extended.',
      'Pull yourself up until your chin is above the bar.',
      'Lower yourself back to the starting position.'
    ],
    equipment: ['pull-up bar']
  },
  {
    id: 'ex5',
    name: 'Push-up',
    description: 'A bodyweight exercise that targets the chest, shoulders, and triceps.',
    muscleGroup: ['chest', 'shoulders', 'triceps'],
    sets: 3,
    reps: 15,
    restTime: 60,
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/push-up-variations.jpg',
    instructions: [
      'Start in a plank position with your hands slightly wider than shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Push yourself back up to the starting position.'
    ],
    equipment: []
  }
];

// Mock workouts
export const mockWorkouts: Workout[] = [
  {
    id: 'w1',
    name: 'Upper Body Strength',
    description: 'A workout focused on building strength in the upper body.',
    exercises: [mockExercises[0], mockExercises[3], mockExercises[4]],
    duration: 60,
    caloriesBurn: 400,
    type: 'strength',
    dayOfWeek: 1 // Monday
  },
  {
    id: 'w2',
    name: 'Lower Body Strength',
    description: 'A workout focused on building strength in the lower body.',
    exercises: [mockExercises[1], mockExercises[2]],
    duration: 60,
    caloriesBurn: 500,
    type: 'strength',
    dayOfWeek: 3 // Wednesday
  },
  {
    id: 'w3',
    name: 'Full Body HIIT',
    description: 'A high-intensity interval training workout that targets the entire body.',
    exercises: [mockExercises[4], mockExercises[1]],
    duration: 30,
    caloriesBurn: 350,
    type: 'cardio',
    dayOfWeek: 5 // Friday
  }
];

// Mock workout plan
export const mockWorkoutPlan: WorkoutPlan = {
  id: 'wp1',
  name: 'Classic Physique Development',
  description: 'A workout plan designed to develop a classic physique with balanced proportions.',
  workouts: mockWorkouts,
  duration: 12,
  frequency: 3,
  forGoalPhysique: 'classic_physique',
  forBodyType: 'mesomorph',
  forFitnessLevel: 'intermediate',
  isGymRequired: true
};

// Mock foods
export const mockFoods: Food[] = [
  {
    id: 'f1',
    name: 'Chicken Breast',
    portion: '100g',
    calories: 165,
    macros: {
      protein: 31,
      carbs: 0,
      fats: 3.6
    },
    micronutrients: {
      'vitamin B6': 0.6,
      'niacin': 13.4,
      'phosphorus': 196
    }
  },
  {
    id: 'f2',
    name: 'Brown Rice',
    portion: '100g cooked',
    calories: 112,
    macros: {
      protein: 2.6,
      carbs: 23,
      fats: 0.9
    },
    micronutrients: {
      'magnesium': 44,
      'phosphorus': 83,
      'manganese': 1.1
    }
  },
  {
    id: 'f3',
    name: 'Broccoli',
    portion: '100g',
    calories: 34,
    macros: {
      protein: 2.8,
      carbs: 6.6,
      fats: 0.4
    },
    micronutrients: {
      'vitamin C': 89.2,
      'vitamin K': 101.6,
      'folate': 63
    }
  },
  {
    id: 'f4',
    name: 'Salmon',
    portion: '100g',
    calories: 206,
    macros: {
      protein: 22,
      carbs: 0,
      fats: 13
    },
    micronutrients: {
      'vitamin D': 11,
      'vitamin B12': 2.6,
      'omega-3': 2.3
    }
  },
  {
    id: 'f5',
    name: 'Sweet Potato',
    portion: '100g',
    calories: 86,
    macros: {
      protein: 1.6,
      carbs: 20,
      fats: 0.1
    },
    micronutrients: {
      'vitamin A': 14187,
      'vitamin C': 2.4,
      'manganese': 0.3
    }
  }
];

// Mock meals
export const mockMeals: Meal[] = [
  {
    id: 'm1',
    name: 'Protein-Packed Breakfast',
    description: 'A high-protein breakfast to start your day.',
    time: '08:00',
    foods: [mockFoods[3], mockFoods[2]],
    totalCalories: 240,
    macros: {
      protein: 24.8,
      carbs: 6.6,
      fats: 13.4
    },
    type: 'breakfast'
  },
  {
    id: 'm2',
    name: 'Balanced Lunch',
    description: 'A balanced lunch with protein, carbs, and vegetables.',
    time: '13:00',
    foods: [mockFoods[0], mockFoods[1], mockFoods[2]],
    totalCalories: 311,
    macros: {
      protein: 36.4,
      carbs: 29.6,
      fats: 4.9
    },
    type: 'lunch'
  },
  {
    id: 'm3',
    name: 'Nutrient-Rich Dinner',
    description: 'A nutrient-rich dinner to support recovery.',
    time: '19:00',
    foods: [mockFoods[0], mockFoods[4], mockFoods[2]],
    totalCalories: 285,
    macros: {
      protein: 35.4,
      carbs: 26.6,
      fats: 4.1
    },
    type: 'dinner'
  }
];

// Mock meal plan
export const mockMealPlan: MealPlan = {
  id: 'mp1',
  name: 'Classic Physique Nutrition Plan',
  description: 'A nutrition plan designed to support the development of a classic physique.',
  meals: mockMeals,
  totalCalories: 836,
  macros: {
    protein: 96.6,
    carbs: 62.8,
    fats: 22.4
  },
  forGoalPhysique: 'classic_physique'
};