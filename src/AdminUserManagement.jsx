import React from 'react'
import './AdminUserManagement.css'
import { Trash2 } from 'lucide-react'

const AdminUserManagement = () => {
  return (
    <div className='user-container'>
      
      <div className="graph-card">
        <div className="card-header">
          <h4>User Management</h4>
          <p className="sub-heading">Manage registered students and admins</p>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user-badge-cell">
                  <div className="avatar">RA</div>
                  <span>Rahim Ahmed</span>
                </div>
              </td>
              <td>rahim@gmail.com</td>
              <td><span className="badge admin">Admin</span></td>
              <td><span className="badge active">Active</span></td>
              <td>
                <button className="del-btn"><Trash2 size={13}/> Delete</button>
              </td>
            </tr>

            <tr>
              <td>
                <div className="user-badge-cell">
                  <div className="avatar">SK</div>
                  <span>Sumaiya Khan</span>
                </div>
              </td>
              <td>sumaiya@gmail.com</td>
              <td><span className="badge student">Student</span></td>
              <td><span className="badge active">Active</span></td>
              <td>
                <button className="del-btn"><Trash2 size={13}/> Delete</button>
              </td>
            </tr>

            <tr>
              <td>
                <div className="user-badge-cell">
                  <div className="avatar">TC</div>
                  <span>Tanvir Chowdhury</span>
                </div>
              </td>
              <td>tanvir@gmail.com</td>
              <td><span className="badge student">Student</span></td>
              <td><span className="badge inactive">Inactive</span></td>
              <td>
                <button className="del-btn"><Trash2 size={13}/> Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminUserManagement