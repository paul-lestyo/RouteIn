'use client'

import { useState } from 'react'
import { User, Settings, HelpCircle, LogOut, ChevronRight, Bell } from 'lucide-react'

interface MenuItem {
  icon: React.ReactNode
  label: string
  action: () => void
}

export default function HeaderPage() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: MenuItem[] = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Edit Profile',
      action: () => console.log('Edit Profile clicked'),
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      action: () => console.log('Settings clicked'),
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      action: () => console.log('Notifications clicked'),
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help & Support',
      action: () => console.log('Help & Support clicked'),
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: 'Log Out',
      action: () => console.log('Log Out clicked'),
    },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Habit Tracker</h1>
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 bg-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-haspopup="true" aria-expanded={isOpen}>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <span className="font-medium text-gray-700">John Doe</span>
            <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-90' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action()
                      setIsOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
