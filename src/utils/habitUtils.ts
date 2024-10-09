export interface Habit {
  id: string
  name: string
  completed: boolean
  expValue: number
}

export const calculateTotalExp = (habits: Habit[]) => habits.reduce((sum, habit) => sum + (habit.completed ? habit.expValue : 0), 0)

export const calculateMaxExp = (habits: Habit[]) => habits.reduce((sum, habit) => sum + habit.expValue, 0)

export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const response = await fetch('/api/habits', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}) // Sesuaikan dengan endpoint Anda
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
		
    const habits = await response.json()
    return habits
  } catch (error) {
    console.error('Error fetching habits:', error)
    return [
      { id: '1', name: 'Morning Exercise', completed: false, expValue: 20 },
      { id: '2', name: 'Read for 30 minutes', completed: false, expValue: 15 },
      { id: '3', name: 'Meditate', completed: false, expValue: 10 },
      { id: '4', name: 'Drink 8 glasses of water', completed: false, expValue: 15 },
      { id: '5', name: 'Write in journal', completed: false, expValue: 10 },
    ]
  }
}

export const updateHabit = async (id: string, completed: boolean): Promise<void> => {
  try {
    await fetch(`/api/daily_habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }), // Kirim status baru ke API
    })
  } catch (error) {
    console.error('Error updating habit:', error)
  }
}
