import { Check } from 'lucide-react';
import type { Habit } from '../utils/habitUtils';

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: string) => void;
}

const HabitItem = ({ habit, toggleHabit }: HabitItemProps) => {
  return (
    <li className="flex items-center space-x-3">
      <button
        onClick={() => toggleHabit(habit.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          habit.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
        }`}
        aria-label={`Mark ${habit.name} as ${habit.completed ? 'incomplete' : 'complete'}`}
      >
        {Boolean(habit.completed) && <Check className="w-4 h-4" />}
      </button>
      <span className={`text-lg ${habit.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
        {habit.name}
      </span>
      <span className="text-sm text-gray-500 ml-auto">+{habit.expValue} EXP</span>
    </li>
  );
};

export default HabitItem;
