import type { Habit } from '../utils/habitUtils-hardcoded';
import HabitItem from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: string) => void;
}

const HabitList = ({ habits, toggleHabit }: HabitListProps) => {
  return (
    <ul className="space-y-4">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} toggleHabit={toggleHabit} />
      ))}
    </ul>
  );
};

export default HabitList;