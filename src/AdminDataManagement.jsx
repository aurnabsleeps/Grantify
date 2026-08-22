import React, { useState } from 'react';
import './AdminDataManagement.css';

export default function AdminDataManagement() {
  const [scholarships, setScholarships] = useState([
    { id: 1, title: 'Fulbright Scholarship', country: 'USA', status: 'Verified' },
    { id: 2, title: 'DAAD Scholarship', country: 'Germany', status: 'Pending' },
  ]);

  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');

  // Add Listing
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !country) return;
    const newItem = {
      id: Date.now(),
      title: title,
      country: country,
      status: 'Pending',
    };
    setScholarships([...scholarships, newItem]);
    setTitle('');
    setCountry('');
  };

  // Delete Listing
  const handleDelete = (id) => {
    setScholarships(scholarships.filter((item) => item.id !== id));
  };

  // Verify Listing
  const handleVerify = (id) => {
    setScholarships(
      scholarships.map((item) =>
        item.id === id ? { ...item, status: 'Verified' } : item
      )
    );
  };

  return (
    <div className="admin-page">
      <h2>Admin Data Management</h2>
      <p className="page-subtitle">Add, edit, delete, and verify scholarship listings.</p>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="crud-form">
        <h3>Add New Scholarship</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Scholarship Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add Listing</button>
        </div>
      </form>

      {/* Scholarship Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Country</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.country}</td>
              <td>
                <span className={`status-tag ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>
                {item.status === 'Pending' && (
                  <button onClick={() => handleVerify(item.id)} className="btn btn-action">
                    Verify
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}