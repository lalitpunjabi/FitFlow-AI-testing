import React from 'react';
import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  Calendar, 
  Droplets, 
  Moon, 
  Bell, 
  LineChart, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/workout', label: 'Workout', icon: '��' },
    { path: '/nutrition', label: 'Nutrition', icon: '🍎' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/water', label: 'Water', icon: '💧' },
    { path: '/sleep', label: 'Sleep', icon: '😴' },
    { path: '/reminders', label: 'Reminders', icon: '⏰' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light">FitFlowAI</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  isActive ? 'bg-primary/10 text-primary dark:text-primary-light' : ''
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-auto p-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;