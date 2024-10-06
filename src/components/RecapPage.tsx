import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import MainWrapper from './MainWrapper'

interface DailyData {
  date: string
  totalExp: number
}

export default function RecapPage() {
  const [weeklyData, setWeeklyData] = useState<DailyData[]>([])
	const [activeTab] = useState('recap')

  useEffect(() => {
    // In a real application, this data would come from a backend or local storage
    // For this example, we'll generate some mock data
    const mockData: DailyData[] = [
      { date: 'Mon', totalExp: 45 },
      { date: 'Tue', totalExp: 60 },
      { date: 'Wed', totalExp: 55 },
      { date: 'Thu', totalExp: 75 },
      { date: 'Fri', totalExp: 65 },
      { date: 'Sat', totalExp: 80 },
      { date: 'Sun', totalExp: 70 },
    ]
    setWeeklyData(mockData)
  }, [])

  const totalWeeklyExp = weeklyData.reduce((sum, day) => sum + day.totalExp, 0)
  const averageDailyExp = weeklyData.length > 0 ? (totalWeeklyExp / weeklyData.length).toFixed(2) : '0'
  const bestDay = weeklyData.length > 0 ? weeklyData.reduce((best, day) => (day.totalExp > best.totalExp ? day : best), weeklyData[0]).date : 'N/A'

  return (
    <MainWrapper activeTab={activeTab}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-md mx-auto overflow-hidden">
				<h2 className="p-4 max-w-md mx-auto text-2xl font-bold text-gray-900 mb-4 bg-white rounded-xl shadow-md overflow-hidden">Weekly Recap</h2>
					{/* <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Recap</h2> */}
					<div className="bg-white rounded-xl shadow-md p-4 h-64">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={weeklyData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="totalExp" fill="#3b82f6" name="Total EXP" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-4 bg-white rounded-xl shadow-md p-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">This Week's Progress</h3>
						<p className="text-gray-700">Total EXP Earned: {totalWeeklyExp}</p>
						<p className="text-gray-700">Best Day: {bestDay}</p>
						<p className="text-gray-700">Average Daily EXP: {averageDailyExp}</p>
					</div>
				</div>
      </div>
    </MainWrapper>
  )
}
