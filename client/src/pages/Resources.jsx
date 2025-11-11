import { useState, useEffect } from 'react';
import { resourceService, contractService } from '../services';
import './Contracts.css';

function Resources() {
  const [resources, setResources] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    contractId: '',
    startDate: '',
    skills: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resourcesRes, contractsRes] = await Promise.all([
        resourceService.getAll(),
        contractService.getAll()
      ]);
      setResources(resourcesRes.data);
      setContracts(contractsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resourceService.create(formData);
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        role: '',
        contractId: '',
        startDate: '',
        skills: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating resource:', error);
      alert(error.response?.data?.error || 'Failed to create resource');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Failed to delete resource');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'green',
      inactive: 'gray',
      completed: 'blue'
    };
    return <span className={`status-badge ${colors[status]}`}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="contracts-page">
      <div className="page-header">
        <h1>Resources</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>New Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contract *</label>
                <select
                  value={formData.contractId}
                  onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
                  required
                >
                  <option value="">Select Contract</option>
                  {contracts.map(contract => (
                    <option key={contract.id} value={contract.id}>
                      {contract.contractNumber} - {contract.clientName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Skills</label>
              <textarea
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                rows="3"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <button type="submit" className="btn-primary">Create Resource</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Contract</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.name}</td>
                <td>{resource.email}</td>
                <td>{resource.role}</td>
                <td>{resource.Contract?.contractNumber}</td>
                <td>{new Date(resource.startDate).toLocaleDateString()}</td>
                <td>{getStatusBadge(resource.status)}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(resource.id)} 
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resources;
