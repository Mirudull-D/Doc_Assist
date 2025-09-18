import React from 'react';
import { Menu, X, Home, Users, FileText, Upload, Settings, LogOut, LogIn } from 'react-feather';
import clsx from 'classnames';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', Icon: Home },
  { key: 'patients', label: 'Patients', Icon: Users },
  { key: 'reports', label: 'Reports', Icon: FileText },
  { key: 'upload', label: 'Upload', Icon: Upload },
];

export default function TopNav({ currentPage, onNavigate, isAuthenticated, onLogout, onLogin }) {
  const [open, setOpen] = React.useState(false);

  const NavLink = ({ item, isMobile = false }) => (
    <button
      onClick={() => { onNavigate(item.key); setOpen(false); }}
      className={clsx(
        'w-full flex items-center gap-3 rounded-lg text-sm transition-all',
        isMobile ? 'px-3 py-2' : 'px-4 py-2.5',
        currentPage === item.key
          ? (isMobile ? 'bg-gray-100 text-blue-700' : 'bg-blue-50 text-blue-700 font-semibold')
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <item.Icon size={isMobile ? 18 : 16} />
      <span>{item.label}</span>
    </button>
  );

  const authButton = isAuthenticated ? (
    <button onClick={onLogout} className="ml-4 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100">
      <LogOut size={16} />
    </button>
  ) : (
    <button onClick={onLogin} className="ml-4 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100">
      <LogIn size={16} />
    </button>
  );

  const mobileMenuContent = (
    <div className="px-2 py-2">
      <div className="flex flex-col gap-1">
        {isAuthenticated && NAV.map(item => <NavLink key={item.key} item={item} isMobile />)}
      </div>
      <div className="border-t my-2" />
      <div className="flex flex-col gap-1">
        {isAuthenticated && <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm">
          <Settings size={18} /> <span>Settings</span>
        </button>}
        {authButton}
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto h-14 flex items-center justify-between px-4 sm:px-6">
        <div className="text-xl font-bold text-blue-600">MediScan AI</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated && NAV.map(item => <NavLink key={item.key} item={item} />)}
          {isAuthenticated && <button className="ml-4 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100">
            <Settings size={16} />
          </button>}
          {authButton}
        </div>

        {/* Mobile Nav */}
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

      {open && (
        <div className="md:hidden absolute top-14 left-0 right-0 border-t bg-white shadow-lg">
          {mobileMenuContent}
        </div>
      )}
    </nav>
  );
}
