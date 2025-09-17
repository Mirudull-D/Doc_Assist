import React from 'react'
import AOS from 'aos'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Patients from './pages/Patients.jsx'
import Reports from './pages/Reports.jsx'
import Upload from './pages/Upload.jsx'
import Sidebar from "./components/SideBar.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  React.useEffect(() => {
    AOS.init({ once: true })
  }, [])

  return (
    <div className="font-sans bg-gray-50 h-screen flex overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <div className="flex-1 overflow-auto">
        <Header currentPage={currentPage} />
        <main className="p-6">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'patients' && <Patients />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'upload' && <Upload />}
        </main>
      </div>
    </div>
  )
}
