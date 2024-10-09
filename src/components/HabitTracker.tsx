import { useState, useEffect } from 'react'
import HabitList from './HabitList'
import ExpBar from './ExpBar'
import { fetchHabits, calculateTotalExp, calculateMaxExp, updateHabit, type Habit } from '../utils/habitUtils'
import MainWrapper from './MainWrapper'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [totalExp, setTotalExp] = useState(0)
  const [maxExp, setMaxExp] = useState(0)
	const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab] = useState('tracker')
	const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

	const changeDate = async (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)

		await fetchDataForDate("")
  }

	const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

	const fetchDataForDate = async (formattedDate: string) => {
    setIsLoading(true)
    setError(null)
    try {
			setHabits([])
      const response = await fetch(`https://api.example.com/habits?date=${formattedDate}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      // Process the data here. For example, update the habitLog state
      // This is a placeholder and should be adjusted based on your API response structure
      setHabits(prevLog => ({
        ...prevLog,
        [formattedDate]: data.habits
      }))
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }




  return (
    <MainWrapper activeTab={activeTab}>
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="p-4 max-w-md mx-auto text-2xl font-bold text-gray-900">Daily Track</h2>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center justify-between m-2 p-4">
            <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Previous day">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{formatDate(currentDate)}</h2>
            <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Next day">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8 pt-2">
            <ExpBar totalExp={totalExp} maxExp={maxExp} />

						{isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <HabitList habits={habits} toggleHabit={toggleHabit} />
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default HabitTracker
