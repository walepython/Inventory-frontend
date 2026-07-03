import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { FaBox, FaClipboardList, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { staffService } from '../../services/staffService';
import './Navbar.css';

const Navbar1 = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem('staff') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('staff');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold">
            Inventory Management System
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaUser />
              <span>{staff.name || 'Staff'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar1;