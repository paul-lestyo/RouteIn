export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  expValue: number;
}

export const defaultHabits: Habit[] = [
  { id: '1', name: 'Morning Exercise', completed: false, expValue: 20 },
  { id: '2', name: 'Read for 30 minutes', completed: false, expValue: 15 },
  { id: '3', name: 'Meditate', completed: false, expValue: 10 },
  { id: '4', name: 'Drink 8 glasses of water', completed: false, expValue: 15 },
  { id: '5', name: 'Write in journal', completed: false, expValue: 10 },
];

export const calculateTotalExp = (habits: Habit[]) =>
  habits.reduce((sum, habit) => sum + (habit.completed ? habit.expValue : 0), 0);

export const calculateMaxExp = (habits: Habit[]) =>
  habits.reduce((sum, habit) => sum + habit.expValue, 0);