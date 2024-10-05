import React from 'react';
import BottomItemNavigation from './BottomItemNavigation';
import { BarChart2, ListTodo, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <ul className="flex justify-around items-center">
        <li><BottomItemNavigation activeTab={activeTab} Icon={ListTodo}  menuItem='Tracker'/></li>
        <li><BottomItemNavigation activeTab={activeTab} Icon={BarChart2}  menuItem='Recap'/></li>
        <li><BottomItemNavigation activeTab={activeTab} Icon={User}  menuItem='Profile'/></li>
      </ul>
    </nav>
  );
};

export default BottomNavigation;
