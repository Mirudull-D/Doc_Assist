import React from 'react'
import { Bell, User, TrendingUp, TrendingDown } from 'react-feather'

const titles = {
  dashboard: 'Dashboard',
  patients: 'Patient Records',
  reports: 'Report Analysis',
  upload: 'Upload Reports',
}

export default function Header({ currentPage }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">{titles[currentPage]}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="text-gray-500 hover:text-blue-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User size={16} />
          </div>
          <span className="text-sm font-medium">Dr. Smith</span>
        </div>
      </div>
    </header>
  )
}
