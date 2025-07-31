import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaPlus, FaTasks } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ 
              color: '#667eea', 
              margin: 0, 
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              <FaTasks style={{ marginRight: '8px' }} />
              Task Manager
            </h1>
          </Link>
          
          {user && (
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: '#666', marginRight: '15px' }}>
                Welcome, {user.username}!
              </span>
              <Link to="/tasks/new" className="btn btn-primary">
                <FaPlus style={{ marginRight: '5px' }} />
                New Task
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                <FaSignOutAlt style={{ marginRight: '5px' }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 