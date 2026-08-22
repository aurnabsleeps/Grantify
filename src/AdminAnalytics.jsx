import React from 'react'
import './AdminAnalytics.css'
import { GraduationCap, Users, BookOpen, TrendingUp, Award, CheckCircle } from 'lucide-react'

const AdminAnalytics = () => {
  return (
    <div className='user-container'>
      
      {/* Top Stats Section */}
      <div className="more-details-card-container">
        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Active Scholarships</p>
            <GraduationCap size={16} color='#8a8890'/>
          </div>
          <h3>45</h3>
          <p>Running opportunities</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Registered Students</p>
            <Users size={16} color='#8a8890'/>
          </div>
          <h3>1,280</h3>
          <p>Total user accounts</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Total Applications</p>
            <BookOpen size={16} color='#8a8890'/>
          </div>
          <h3>3,420</h3>
          <p>Submitted forms</p>
        </div>

        <div className="more-details-card">
          <div className="more-det-card-heading">
            <p>Success Rate</p>
            <TrendingUp size={16} color='#8a8890'/>
          </div>
          <h3>68%</h3>
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
              <p><CheckCircle size={15} color='#28a745'/> Fulbright Updated</p>
            </div>
            <div className="analytics-row">
              <p><CheckCircle size={15} color='#28a745'/> 20 New Users</p>
            </div>
            <div className="analytics-row">
              <p><CheckCircle size={15} color='#28a745'/> Chevening Verified</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminAnalytics