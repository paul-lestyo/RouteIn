import { useState, useEffect } from 'react'
import HabitList from './HabitList'
import ExpBar from './ExpBar'
import { fetchHabits, calculateTotalExp, calculateMaxExp, updateHabit, type Habit } from '../utils/habitUtils'
import MainWrapper from './MainWrapper'

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [totalExp, setTotalExp] = useState(0)
  const [maxExp, setMaxExp] = useState(0)
  const [activeTab] = useState('tracker')

  useEffect(() => {
    const loadHabits = async () => {
      const habitsFromServer = await fetchHabits()
      setHabits(habitsFromServer)
      updateExp(habitsFromServer)
    }

    loadHabits()
  }, [])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const updateExp = (currentHabits: Habit[]) => {
    setTotalExp(calculateTotalExp(currentHabits))
    setMaxExp(calculateMaxExp(currentHabits))
  }

  const toggleHabit = async (id: string) => {
    const updatedHabits = habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit))

    setHabits(updatedHabits)
    updateExp(updatedHabits)

    // Panggil fungsi updateHabit dari utils
    await updateHabit(id, !habits.find((habit) => habit.id === id)!.completed)
  }

  return (
    <MainWrapper activeTab={activeTab}>
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="p-4 max-w-md mx-auto text-2xl font-bold text-gray-900">Daily Track</h2>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <ExpBar totalExp={totalExp} maxExp={maxExp} />
            <HabitList habits={habits} toggleHabit={toggleHabit} />
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default HabitTracker
