import React, { useState, useEffect } from 'react';
import AuthPage from './AuthPage';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    // Store user data in state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="app">
      {!user ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <LandingPage user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;