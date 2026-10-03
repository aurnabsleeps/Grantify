import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './AdminDataManagement.css';
import { PlusCircle, Trash2, Edit, Database } from 'lucide-react';
import { getScholarships, createScholarship, updateScholarship, deleteScholarship } from './api';

const AdminDataManagement = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [country, setCountry] = useState('');
  const [degree, setDegree] = useState('Master\'s');
  const [amount, setAmount] = useState('$20,000');
  const [deadline, setDeadline] = useState('30 December 2026');

  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getScholarships();
      setScholarships(data);
    } catch (err) {
      console.error('Error loading scholarships:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!title || !country || !degree) {
      alert('Title, Country, and Degree are required.');
      return;
    }

    try {
      if (editingId) {
        await updateScholarship(editingId, {
          title,
          university: university || 'Global University',
          country,
          degree,
          amount,
          deadline,
        });
        alert('Scholarship updated successfully!');
        setEditingId(null);
      } else {
        await createScholarship({
          title,
          university: university || 'Global University',
          country,
          degree,
          amount,
          deadline,
        });
        alert('Scholarship added to MongoDB successfully!');
      }

      setTitle('');
      setUniversity('');
      setCountry('');
      setDegree('Master\'s');
      setAmount('$20,000');
      setDeadline('30 December 2026');
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to save scholarship.');
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setUniversity(item.university || '');
    setCountry(item.country);
    setDegree(item.degree);
    setAmount(item.amount || '$20,000');
    setDeadline(item.deadline || '30 December 2026');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setUniversity('');
    setCountry('');
    setDegree('Master\'s');
    setAmount('$20,000');
    setDeadline('30 December 2026');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteScholarship(id);
        setScholarships(scholarships.filter((s) => s._id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete scholarship.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className='user-container'>
        {/* Form Card */}
        <div className="graph-card">
          <div className="form-title">
            <Database size={18} />
            <h4>{editingId ? 'Edit Scholarship' : 'Add New Scholarship'}</h4>
          </div>
          <form onSubmit={handleAddOrUpdate} className="custom-form">
            <div className="input-field">
              <label>Scholarship Name</label>
              <input 
                type="text" 
                placeholder="e.g. Fulbright Scholarship" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>

            <div className="input-field">
              <label>University</label>
              <input 
                type="text" 
                placeholder="e.g. Harvard University" 
                value={university} 
                onChange={(e) => setUniversity(e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label>Country</label>
              <input 
                type="text" 
                placeholder="e.g. USA" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                required
              />
            </div>

            <div className="input-field">
              <label>Degree Level</label>
              <select value={degree} onChange={(e) => setDegree(e.target.value)} required>
                <option value="Undergraduate">Bachelor's / Undergraduate</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="input-field">
              <label>Funding Amount</label>
              <input 
                type="text" 
                placeholder="e.g. $25,000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label>Deadline</label>
              <input 
                type="text" 
                placeholder="e.g. 30 June 2026" 
                value={deadline} 
                onChange={(e) => setDeadline(e.target.value)} 
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="submit-btn">
                <PlusCircle size={15}/> {editingId ? 'Save Changes' : 'Add Scholarship'}
              </button>
              {editingId && (
                <button type="button" className="submit-btn" style={{ background: '#6c757d' }} onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div className="graph-card">
          <div className="card-header">
            <h4>Existing Scholarships (Stored in MongoDB)</h4>
          </div>

          {loading && <p style={{ padding: '1rem', color: '#666' }}>Loading scholarships...</p>}

          {!loading && (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>University</th>
                  <th>Country</th>
                  <th>Degree</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((s) => (
                  <tr key={s._id}>
                    <td><strong>{s.title}</strong></td>
                    <td>{s.university}</td>
                    <td>{s.country}</td>
                    <td>{s.degree}</td>
                    <td>{s.amount}</td>
                    <td>
                      <button className="icon-action-btn" onClick={() => handleEditClick(s)}>
                        <Edit size={14}/>
                      </button>
                      <button className="icon-action-btn delete" onClick={() => handleDelete(s._id, s.title)}>
                        <Trash2 size={14}/>
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

export default AdminDataManagement;