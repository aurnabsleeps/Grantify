
import React, { useState } from 'react'
import './AdminDataManagement.css'
import { PlusCircle, Trash2, Edit, Database } from 'lucide-react'

const AdminDataManagement = () => {
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    alert('Scholarship Added Successfully!')
    setTitle('')
    setCountry('')
  }

  return (
    <div className='user-container'>
      
      {/* Form Card */}
      <div className="graph-card">
        <div className="form-title">
          <Database size={18} />
          <h4>Add New Scholarship</h4>
        </div>
        <form onSubmit={handleAdd} className="custom-form">
          <div className="input-field">
            <label>Scholarship Name</label>
            <input 
              type="text" 
              placeholder="e.g. Fulbright Scholarship" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="input-field">
            <label>Country</label>
            <input 
              type="text" 
              placeholder="e.g. USA" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
            />
          </div>
          <button type="submit" className="submit-btn">
            <PlusCircle size={15}/> Add Scholarship
          </button>
        </form>
      </div>

      {/* Table Card */}
      <div className="graph-card">
        <div className="card-header">
          <h4>Existing Scholarships</h4>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Scholarship Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#101</td>
              <td>Fulbright Scholarship</td>
              <td>USA</td>
              <td>
                <button className="icon-action-btn"><Edit size={14}/></button>
                <button className="icon-action-btn delete"><Trash2 size={14}/></button>
              </td>
            </tr>
            <tr>
              <td>#102</td>
              <td>Chevening Scholarship</td>
              <td>UK</td>
              <td>
                <button className="icon-action-btn"><Edit size={14}/></button>
                <button className="icon-action-btn delete"><Trash2 size={14}/></button>
              </td>
            </tr>
            <tr>
              <td>#103</td>
              <td>DAAD Scholarship</td>
              <td>Germany</td>
              <td>
                <button className="icon-action-btn"><Edit size={14}/></button>
                <button className="icon-action-btn delete"><Trash2 size={14}/></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminDataManagement