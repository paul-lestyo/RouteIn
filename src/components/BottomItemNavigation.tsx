import React from 'react';

interface BottomItemNavigationProps {
  activeTab: string;
  menuItem: string;
	Icon: React.FC<{ className?: string }>;
}

const BottomItemNavigation: React.FC<BottomItemNavigationProps> = ({ activeTab, menuItem, Icon }) => {
  return (
    <a href={menuItem.toLowerCase() == "tracker" ? "/" :  menuItem.toLowerCase()}
      className={`flex flex-col items-center ${menuItem.toLowerCase() === activeTab.toLowerCase()  ? 'text-blue-500' : 'text-gray-500'}`}
      aria-label={menuItem}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{menuItem}</span>
    </a>
  );
};

export default BottomItemNavigation;
