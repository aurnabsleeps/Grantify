import React, { useState } from 'react';
import './App.css';

// Friends' Components
import Header from './components/Header/Header'; 
import Home from './components/Home/Home';

// Admin Components
import AdminAnalytics from './AdminAnalytics';
import AdminDataManagement from './AdminDataManagement';
import AdminUserManagement from './AdminUserManagement';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div id="root">
      <Header />

      {/* Navigation Bar */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '15px', background: 'var(--code-bg)' }}>
        <button className="counter" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>Home</button>
        <button className="counter" onClick={() => setActiveTab('analytics')} style={{ cursor: 'pointer' }}>Analytics</button>
        <button className="counter" onClick={() => setActiveTab('data')} style={{ cursor: 'pointer' }}>Data Management</button>
        <button className="counter" onClick={() => setActiveTab('users')} style={{ cursor: 'pointer' }}>User Management</button>
      </div>

      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'analytics' && <AdminAnalytics />}
        {activeTab === 'data' && <AdminDataManagement />}
        {activeTab === 'users' && <AdminUserManagement />}
      </main>
    </div>
  );
}

export default App;