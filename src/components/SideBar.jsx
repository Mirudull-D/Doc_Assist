import React from 'react'
import { ChevronLeft, ChevronRight, Home, Users, FileText, Upload, Settings } from 'react-feather'
import clsx from 'classnames'

export default function Sidebar({ open, onToggle, currentPage, onNavigate }) {
  const NavButton = ({ page, label, Icon }) => (
    <button
      onClick={() => onNavigate(page)}
      className={clsx(
        'w-full flex items-center p-3 rounded-lg',
        currentPage === page ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      )}
    >
      <Icon className="mr-1" size={18} />
      {open && <span>{label}</span>}
    </button>
  )

  return (
    <div className={clsx('sidebar bg-white shadow-lg flex flex-col', open ? 'w-64' : 'w-20')}>
      <div className="p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold text-blue-600">{open ? 'MediScan AI' : 'MS'}</h1>
        <button onClick={onToggle} className="text-gray-500 hover:text-blue-600">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li><NavButton page="dashboard" label="Dashboard" Icon={Home} /></li>
          <li><NavButton page="patients" label="Patients" Icon={Users} /></li>
          <li><NavButton page="reports" label="Reports" Icon={FileText} /></li>
          <li><NavButton page="upload" label="Upload" Icon={Upload} /></li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100">
          <Settings className="mr-1" size={18} />
          {open && <span>Settings</span>}
        </button>
      </div>
    </div>
  )
}
