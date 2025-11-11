import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">Rrootshell Staff Augmentation</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/contracts">Contracts</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/purchase-orders">Purchase Orders</Link>
        </div>
        <div className="nav-user">
          <span>{user?.username} ({user?.role})</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
