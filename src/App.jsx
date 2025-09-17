import React from 'react'
import AOS from 'aos'
import TopNav from './components/TopNav'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Reports from './pages/Reports'
import Upload from './pages/Upload'

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard')

  React.useEffect(() => {
    AOS.init({ once: true })
  }, [])

  return (
    <div className="font-sans bg-gray-50 min-h-dvh">
      <TopNav currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="max-w-7xl mx-auto">
        <Header currentPage={currentPage} />
        <main className="p-4 sm:p-6">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'patients' && <Patients />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'upload' && <Upload />}
        </main>
      </div>
    </div>
  )
}
