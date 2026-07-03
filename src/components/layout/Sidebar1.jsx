import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBoxes, 
  FaTags, 
  FaTruck, 
  FaArrowDown, 
  FaArrowUp, 
  FaUsers 
} from 'react-icons/fa';

const Sidebar1 = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/products', name: 'Products', icon: <FaBoxes /> },
    { path: '/categories', name: 'Categories', icon: <FaTags /> },
    { path: '/suppliers', name: 'Suppliers', icon: <FaTruck /> },
    { path: '/incoming-orders', name: 'Incoming Orders', icon: <FaArrowDown /> },
    { path: '/outgoing-orders', name: 'Outgoing Orders', icon: <FaArrowUp /> },
    { path: '/staff', name: 'Staff', icon: <FaUsers /> },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 transition-colors ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar1;