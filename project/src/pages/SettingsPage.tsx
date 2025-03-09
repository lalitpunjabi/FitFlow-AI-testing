import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { User, Settings, Bell, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useUserStore();

  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 flex items-center ${
              activeTab === 'profile'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} className="mr-2" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 flex items-center ${
              activeTab === 'preferences'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={18} className="mr-2" />
            <span>Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 flex items-center ${
              activeTab === 'notifications'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell size={18} className="mr-2" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 flex items-center ${
              activeTab === 'privacy'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield size={18} className="mr-2" />
            <span>Privacy</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-6">

                {/* Profile Picture Section */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={40} className="text-gray-500" />
                    </div>
                  </div>
                  <div className="md:w-3/4 mt-4 md:mt-0">
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-gray-500">
                      Member since {new Date().getFullYear()}
                    </p>
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Profile Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
