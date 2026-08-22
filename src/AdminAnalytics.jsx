import React from 'react';

import './AdminAnalytics.css';

export default function AdminAnalytics() {
  const stats = [
    { title: 'Active Scholarships', value: '45' },
    { title: 'Registered Students', value: '1,280' },
    { title: 'Top Category', value: 'STEM & Engineering' },
  ];

  return (
    <div className="admin-page">
     <h2>Admin Analytics Dashboard</h2>
      <p className="page-subtitle">Visual overview of platform activity and statistics.</p>

      {/* Stats Summary Cards */}
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <h4>{stat.title}</h4>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Popular Categories */}
      <div className="analytics-section">
        <h3>Top Scholarship Categories</h3>
        <ul className="category-list">
          <li>
            <span>STEM & Engineering</span>
            <span className="badge">40%</span>
          </li>
          <li>
            <span>Business & Economics</span>
            <span className="badge">30%</span>
          </li>
          <li>
            <span>Arts & Humanities</span>
            <span className="badge">20%</span>
          </li>
          <li>
            <span>Medicine & Health</span>
            <span className="badge">10%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}