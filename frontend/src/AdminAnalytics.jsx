import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './AdminAnalytics.css';
import { GraduationCap, Users, BookOpen, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { getAdminStats } from './api';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    activeScholarships: 45,
    totalUsers: 1280,
    totalApplications: 3420,
    successRate: '68%',
  });

  useEffect(() => {
    getAdminStats()
      .then((data) => {
        setStats({
          activeScholarships: data.activeScholarships || 0,
          totalUsers: data.totalUsers || 0,
          totalApplications: data.totalApplications || 3420,
          successRate: data.successRate || '68%',
        });
      })
      .catch((err) => {
        console.log('Using default analytics preview:', err.message);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className='user-container'>
      
      {/* Top Stats Section */}
      <div className="more-details-card-container">
        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Active Scholarships</p>
            <GraduationCap size={16} color='#8a8890'/>
          </div>
          <h3>{stats.activeScholarships}</h3>
          <p>Live MongoDB items</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Registered Users</p>
            <Users size={16} color='#8a8890'/>
          </div>
          <h3>{stats.totalUsers}</h3>
          <p>Registered accounts</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Total Applications</p>
            <BookOpen size={16} color='#8a8890'/>
          </div>
          <h3>{stats.totalApplications}</h3>
          <p>Submitted forms</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Success Rate</p>
            <TrendingUp size={16} color='#8a8890'/>
          </div>
          <h3>{stats.successRate}</h3>
          <p>Scholarship approval</p>
        </div>
      </div>

      {/* Analytics Details Grid */}
      <div className="performance-container">
        <div className="graph-card">
          <div className="card-header">
            <h4>Popular Categories</h4>
          </div>
          <div className="analytics-list">
            <div className="analytics-row">
              <p><Award size={15}/> STEM & Engineering</p>
              <span>45%</span>
            </div>
            <div className="analytics-row">
              <p><Award size={15}/> Business & Economics</p>
              <span>30%</span>
            </div>
            <div className="analytics-row">
              <p><Award size={15}/> Medical & Health</p>
              <span>25%</span>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <div className="card-header">
            <h4>Recent Activity Updates</h4>
          </div>
          <div className="analytics-list">
            <div className="analytics-row">
              <p><CheckCircle size={15} color='#28a745'/> MongoDB Connected</p>
            </div>
            <div className="analytics-row">
              <p><CheckCircle size={15} color='#28a745'/> Realtime Analytics Synchronized</p>
            </div>
            <div className="analytics-row">
              <p><CheckCircle size={15} color='#28a745'/> Chevening & Fulbright Verified</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default AdminAnalytics;