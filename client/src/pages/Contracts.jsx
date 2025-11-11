import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contractService } from '../services';
import './Contracts.css';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    contractNumber: '',
    startDate: '',
    endDate: '',
    value: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await contractService.getAll();
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contractService.create(formData);
      setShowForm(false);
      setFormData({
        clientName: '',
        contractNumber: '',
        startDate: '',
        endDate: '',
        value: '',
        description: ''
      });
      fetchContracts();
    } catch (error) {
      console.error('Error creating contract:', error);
      alert(error.response?.data?.error || 'Failed to create contract');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await contractService.delete(id);
        fetchContracts();
      } catch (error) {
        console.error('Error deleting contract:', error);
        alert('Failed to delete contract');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'green',
      expired: 'red',
      renewed: 'blue',
      terminated: 'gray'
    };
    return <span className={`status-badge ${colors[status]}`}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="contracts-page">
      <div className="page-header">
        <h1>Contracts</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Contract'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>New Contract</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contract Number *</label>
                <input
                  type="text"
                  value={formData.contractNumber}
                  onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Value *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
              />
            </div>
            <button type="submit" className="btn-primary">Create Contract</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Contract Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Value</th>
              <th>Status</th>
              <th>Resources</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.clientName}</td>
                <td>
                  <Link to={`/contracts/${contract.id}`}>{contract.contractNumber}</Link>
                </td>
                <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                <td>${parseFloat(contract.value).toLocaleString()}</td>
                <td>{getStatusBadge(contract.status)}</td>
                <td>{contract.Resources?.length || 0}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(contract.id)} 
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

export default Contracts;
