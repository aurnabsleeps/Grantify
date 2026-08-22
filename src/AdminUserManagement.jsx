import React, { useState } from 'react';
import './AdminUserManagement.css';

export default function AdminUserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Rahim Ahmed', email: 'rahim@gmail.com', role: 'Student' },
    { id: 2, name: 'Karim Chowdhury', email: 'karim@gmail.com', role: 'Moderator' },
    { id: 3, name: 'Sultana Begum', email: 'sultana@gmail.com', role: 'Student' },
  ]);

  const toggleRole = (id) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            role: user.role === 'Student' ? 'Moderator' : 'Student',
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="admin-page">
      <h2>Admin User Management</h2>
      <p className="page-subtitle">Manage student accounts, roles, and access controls.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Access Control</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <button
                  onClick={() => toggleRole(user.id)}
                  className="btn btn-role"
                >
                  Make {user.role === 'Student' ? 'Moderator' : 'Student'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}