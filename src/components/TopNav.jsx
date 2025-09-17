import React from 'react'
import { Menu, X, Home, Users, FileText, Upload, Settings } from 'react-feather'
import clsx from 'classnames'

const NAV = [
  { key: 'dashboard', label: 'Dashboard', Icon: Home },
  { key: 'patients', label: 'Patients', Icon: Users },
  { key: 'reports', label: 'Reports', Icon: FileText },
  { key: 'upload', label: 'Upload', Icon: Upload },
]

export default function TopNav({ currentPage, onNavigate }) {
  const [open, setOpen] = React.useState(false)

  const NavLink = ({ item, inline = false }) => (
    <button
      onClick={() => { onNavigate(item.key); setOpen(false) }}
      className={clsx(
        'w-full md:w-auto flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
        currentPage === item.key
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <item.Icon size={16} />
      <span>{item.label}</span>
    </button>
  )

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-blue-600">MediScan AI</div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV.map(item => <NavLink key={item.key} item={item} inline />)}
            <button className="ml-2 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={16} /> <span>Settings</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white shadow-sm">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV.map(item => <NavLink key={item.key} item={item} />)}
            <button className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Settings size={16} /> <span>Settings</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
