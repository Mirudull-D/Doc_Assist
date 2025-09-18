import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import Hero from './pages/Hero';
import TopNav from './components/TopNav';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientPage from './pages/PatientPage'; // Import PatientPage
import Reports from './pages/Reports';
import Upload from './pages/Upload';
import Settings from './pages/Settings';

const AppLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1);

  return (
    <div className="max-w-7xl mx-auto">
      <Header currentPage={currentPage} />
      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const { isAuthenticated, login, logout } = useAuthStore();

  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-dvh">
        <Toaster position="bottom-right" />
        <TopNav isAuthenticated={isAuthenticated} onLogout={logout} />
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientPage />} /> {/* Add PatientPage route */}
              <Route path="reports" element={<Reports />} />
              <Route path="upload" element={<Upload />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          ) : (
            <>
              <Route path="/login" element={<Hero onLogin={login} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
