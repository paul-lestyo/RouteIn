// src/components/BottomNavigation/RecapMenu.tsx
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface RecapMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RecapMenu: React.FC<RecapMenuProps> = ({ activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab('recap')}
      className={`flex flex-col items-center ${activeTab === 'recap' ? 'text-blue-500' : 'text-gray-500'}`}
      aria-label="Recap"
    >
      <BarChart2 className="w-6 h-6" />
      <span className="text-xs mt-1">Recap</span>
    </button>
  );
};

export default RecapMenu;
