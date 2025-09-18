import React from 'react';
import { Home, Users, FileText, Upload, Settings } from 'react-feather';

const PAGE_META = {
  dashboard: { title: 'Dashboard', Icon: Home },
  patients: { title: 'Patients', Icon: Users },
  reports: { title: 'Reports', Icon: FileText },
  upload: { title: 'Upload', Icon: Upload },
  settings: { title: 'Settings', Icon: Settings },
  default: { title: 'Page Not Found', Icon: () => null },
};

export default function Header({ currentPage }) {
  const pageKey = currentPage.split('/')[0];
  const { title, Icon } = PAGE_META[pageKey] || PAGE_META.default;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-gray-500" size={24} />}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
    </header>
  );
}
