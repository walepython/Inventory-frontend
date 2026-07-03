import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { incomingOrderService } from '../../services/incomingOrderService';
// import { outgoingOrderService } from '../../services/outgoingOrderService';
import { FaBoxes, FaArrowDown, FaArrowUp, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalIncomingOrders: 0,
    // totalOutgoingOrders: 0,
    totalValue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, incoming] = await Promise.all([
        productService.getAllProducts(),
        incomingOrderService.getAllIncomingOrders(),
        // outgoingOrderService.getAllOutgoingOrders(),
      ]);
  
      // Services already return response.data, so no .data needed
      const totalPrice = products.reduce((sum, product) => 
        sum + (product.unitPrice * product.availableQuantity), 0);
  
      setStats({
        totalProducts: products.length,
        totalIncomingOrders: incoming.length,
        // totalOutgoingOrders: outgoing.length,
        totalValue: totalPrice, // was totalValue (undefined variable)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: <FaBoxes />, color: 'bg-blue-500' },
    { title: 'Incoming Orders', value: stats.totalIncomingOrders, icon: <FaArrowDown />, color: 'bg-green-500' },
    // { title: 'Outgoing Orders', value: stats.totalOutgoingOrders, icon: <FaArrowUp />, color: 'bg-orange-500' },
    { title: 'Inventory Value', value: `$${stats.totalValue.toLocaleString()}`, icon: <FaDollarSign />, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Incoming Orders</h2>
          {/* Add recent orders list here */}
          <p className="text-gray-500">No recent orders</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
          {/* Add low stock alerts here */}
          <p className="text-gray-500">No low stock items</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;