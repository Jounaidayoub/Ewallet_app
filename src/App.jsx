import React, { useState } from 'react';
import { initialUsers } from './data/db';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Home from './pages/Home';

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const onUpdateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const onLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const onLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser}
            users={users}
            onUpdateUser={onUpdateUser}
            onLogout={onLogout}
          />
        );
      case 'home':
      default:
        return (
          <Home setCurrentPage={setCurrentPage} />
        );
      case 'login':
        return (
          <Login
            users={users}
            onLogin={onLogin}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
