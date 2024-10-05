// src/components/BottomNavigation/ProfileMenu.tsx
import React from 'react';

interface ProfileMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
	Icon: React.FC<{ className?: string }>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ activeTab, setActiveTab, Icon }) => {
  return (
    <button
      onClick={() => setActiveTab('profile')}
      className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}
      aria-label="Profile"
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">Profile</span>
    </button>
  );
};

export default ProfileMenu;
