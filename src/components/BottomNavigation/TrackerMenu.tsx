// src/components/BottomNavigation/TrackerMenu.tsx
import React from 'react';
import { ListTodo } from 'lucide-react';

interface TrackerMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TrackerMenu: React.FC<TrackerMenuProps> = ({ activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab('tracker')}
      className={`flex flex-col items-center ${activeTab === 'tracker' ? 'text-blue-500' : 'text-gray-500'}`}
      aria-label="Tracker"
    >
      <ListTodo className="w-6 h-6" />
      <span className="text-xs mt-1">Tracker</span>
    </button>
  );
};

export default TrackerMenu;
