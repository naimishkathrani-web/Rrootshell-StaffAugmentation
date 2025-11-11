import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contractService, purchaseOrderService } from '../services';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalContracts: 0,
    activeContracts: 0,
    expiringContracts: 0,
    expiringPOs: 0
  });
  const [expiringContracts, setExpiringContracts] = useState([]);
  const [expiringPOs, setExpiringPOs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contractsRes, expiringContractsRes, expiringPOsRes] = await Promise.all([
        contractService.getAll(),
        contractService.getExpiring(30),
        purchaseOrderService.getExpiring(30)
      ]);

      const contracts = contractsRes.data;
      setStats({
        totalContracts: contracts.length,
        activeContracts: contracts.filter(c => c.status === 'active').length,
        expiringContracts: expiringContractsRes.data.length,
        expiringPOs: expiringPOsRes.data.length
      });
      setExpiringContracts(expiringContractsRes.data);
      setExpiringPOs(expiringPOsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilExpiry = (endDate) => {
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Contracts</h3>
          <div className="stat-value">{stats.totalContracts}</div>
        </div>
        <div className="stat-card">
          <h3>Active Contracts</h3>
          <div className="stat-value">{stats.activeContracts}</div>
        </div>
        <div className="stat-card alert">
          <h3>Expiring Contracts (30 days)</h3>
          <div className="stat-value">{stats.expiringContracts}</div>
        </div>
        <div className="stat-card alert">
          <h3>Expiring POs (30 days)</h3>
          <div className="stat-value">{stats.expiringPOs}</div>
        </div>
      </div>

      {expiringContracts.length > 0 && (
        <div className="section">
          <h2>⚠️ Contracts Expiring Soon</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contract Number</th>
                  <th>End Date</th>
                  <th>Days Left</th>
                  <th>Value</th>
                  <th>Resources</th>
                </tr>
              </thead>
              <tbody>
                {expiringContracts.map(contract => (
                  <tr key={contract.id}>
                    <td>{contract.clientName}</td>
                    <td>
                      <Link to={`/contracts/${contract.id}`}>{contract.contractNumber}</Link>
                    </td>
                    <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                    <td className="days-left">{getDaysUntilExpiry(contract.endDate)} days</td>
                    <td>${parseFloat(contract.value).toLocaleString()}</td>
                    <td>{contract.Resources?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {expiringPOs.length > 0 && (
        <div className="section">
          <h2>⚠️ Purchase Orders Expiring Soon</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Resource</th>
                  <th>Contract</th>
                  <th>End Date</th>
                  <th>Days Left</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {expiringPOs.map(po => (
                  <tr key={po.id}>
                    <td>{po.poNumber}</td>
                    <td>{po.Resource?.name}</td>
                    <td>{po.Contract?.contractNumber}</td>
                    <td>{new Date(po.endDate).toLocaleDateString()}</td>
                    <td className="days-left">{getDaysUntilExpiry(po.endDate)} days</td>
                    <td>${parseFloat(po.value).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
