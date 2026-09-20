import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './AdminUserManagement.css';
import { Trash2 } from 'lucide-react';
import { getAllUsers, deleteUser } from './api';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete user.');
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div>
      <Header />
      <div className='user-container'>
        <div className="graph-card">
          <div className="card-header">
            <h4>User Management</h4>
            <p className="sub-heading">Manage registered students and admins from MongoDB</p>
          </div>

          {loading && <p style={{ padding: '1rem', color: '#666' }}>Loading users from database...</p>}
          {error && <p style={{ padding: '1rem', color: '#d9534f' }}>{error}</p>}

          {!loading && users.length === 0 && (
            <p style={{ padding: '1rem', color: '#666' }}>No users found in database.</p>
          )}

          {!loading && users.length > 0 && (
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
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="user-badge-cell">
                        <div className="avatar">{getInitials(u.name)}</div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'admin' : 'student'}`}>
                        {u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : 'Student'}
                      </span>
                    </td>
                    <td>
                      <span className="badge active">Active</span>
                    </td>
                    <td>
                      <button className="del-btn" onClick={() => handleDelete(u._id, u.name)}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;