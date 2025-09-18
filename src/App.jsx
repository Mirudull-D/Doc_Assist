import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Hero from './pages/Hero';
import MainApp from './MainApp';
import TopNav from './components/TopNav';

function App() {
  const { isAuthenticated, login, logout } = useAuthStore();

  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-dvh">
        <TopNav isAuthenticated={isAuthenticated} onLogout={logout} onLogin={login}/>
        <Routes>
          <Route path="/" element={isAuthenticated ? <MainApp /> : <Hero onLogin={login} />} />
          <Route path="/login" element={!isAuthenticated ? <Hero onLogin={login} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
