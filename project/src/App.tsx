import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import { useThemeStore } from './store/themeStore';
import Layout from './components/Layout';
import ThemeProvider from './components/ThemeProvider';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Dashboard from './pages/Dashboard';
import WorkoutPage from './pages/WorkoutPage';
import NutritionPage from './pages/NutritionPage';
import CalendarPage from './pages/CalendarPage';
import WaterPage from './pages/WaterPage';
import SleepPage from './pages/SleepPage';
import RemindersPage from './pages/RemindersPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { isOnboarded } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <Routes>
          {!isOnboarded ? (
            <>
              <Route path="/onboarding" element={<OnboardingFlow />} />
              <Route path="*" element={<Navigate to="/onboarding" replace />} />
            </>
          ) : (
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workout" element={<WorkoutPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/water" element={<WaterPage />} />
              <Route path="/sleep" element={<SleepPage />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;