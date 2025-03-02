import React, { useState } from 'react';
import AuthPage from './AuthPage';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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