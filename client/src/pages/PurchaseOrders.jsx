import { useState, useEffect } from 'react';
import { purchaseOrderService, resourceService, contractService } from '../services';
import './Contracts.css';

function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [resources, setResources] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    poNumber: '',
    resourceId: '',
    contractId: '',
    startDate: '',
    endDate: '',
    value: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [posRes, resourcesRes, contractsRes] = await Promise.all([
        purchaseOrderService.getAll(),
        resourceService.getAll(),
        contractService.getAll()
      ]);
      setPurchaseOrders(posRes.data);
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
      await purchaseOrderService.create(formData);
      setShowForm(false);
      setFormData({
        poNumber: '',
        resourceId: '',
        contractId: '',
        startDate: '',
        endDate: '',
        value: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating purchase order:', error);
      alert(error.response?.data?.error || 'Failed to create purchase order');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this purchase order?')) {
      try {
        await purchaseOrderService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting purchase order:', error);
        alert('Failed to delete purchase order');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'green',
      expired: 'red',
      renewed: 'blue'
    };
    return <span className={`status-badge ${colors[status]}`}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="contracts-page">
      <div className="page-header">
        <h1>Purchase Orders</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Purchase Order'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>New Purchase Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>PO Number *</label>
                <input
                  type="text"
                  value={formData.poNumber}
                  onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Resource *</label>
                <select
                  value={formData.resourceId}
                  onChange={(e) => setFormData({ ...formData, resourceId: e.target.value })}
                  required
                >
                  <option value="">Select Resource</option>
                  {resources.map(resource => (
                    <option key={resource.id} value={resource.id}>
                      {resource.name} - {resource.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
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
              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
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
            <button type="submit" className="btn-primary">Create Purchase Order</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Resource</th>
              <th>Contract</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Value</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(po => (
              <tr key={po.id}>
                <td>{po.poNumber}</td>
                <td>{po.Resource?.name}</td>
                <td>{po.Contract?.contractNumber}</td>
                <td>{new Date(po.startDate).toLocaleDateString()}</td>
                <td>{new Date(po.endDate).toLocaleDateString()}</td>
                <td>${parseFloat(po.value).toLocaleString()}</td>
                <td>{getStatusBadge(po.status)}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(po.id)} 
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

export default PurchaseOrders;
