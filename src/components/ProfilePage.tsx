import { useState, useEffect } from 'react'
import { User, Edit2, Save } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  level: number
  totalExp: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    level: 5,
    totalExp: 1250
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(profile.name)

  useEffect(() => {
    // In a real application, you would fetch the user profile from an API or local storage
    // For this example, we'll use the hardcoded data
  }, [])

  const handleSave = () => {
    setProfile({ ...profile, name: editedName })
    setIsEditing(false)
    // In a real application, you would save the updated profile to an API or local storage
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full p-3 mr-4">
            <User className="w-8 h-8 text-white" />
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
            />
          ) : (
            <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
          )}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="ml-auto text-blue-500 hover:text-blue-600 focus:outline-none"
            aria-label={isEditing ? "Save profile name" : "Edit profile name"}
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-gray-600 mb-2">{profile.email}</p>
        <div className="mt-4">
          <p className="text-gray-700">Level: {profile.level}</p>
          <p className="text-gray-700">Total EXP: {profile.totalExp}</p>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Achievements</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Early Bird: Complete all habits before 10 AM</li>
            <li>Streak Master: Maintain a 7-day streak</li>
            <li>EXP Hoarder: Earn 1000 total EXP</li>
          </ul>
        </div>
      </div>
    </div>
  )
}