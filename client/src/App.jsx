import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import Resources from './pages/Resources';
import PurchaseOrders from './pages/PurchaseOrders';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/contracts"
            element={
              <PrivateRoute>
                <Layout>
                  <Contracts />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <PrivateRoute>
                <Layout>
                  <Resources />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase-orders"
            element={
              <PrivateRoute>
                <Layout>
                  <PurchaseOrders />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
