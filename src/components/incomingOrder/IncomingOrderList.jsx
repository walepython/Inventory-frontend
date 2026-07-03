import React, { useEffect, useState } from "react";
import { incomingOrderService } from "../../services/incomingOrderService";
import IncomingOrderForm from './IncomingOrderForm';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import { toast } from "react-toastify";

const IncomingOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await incomingOrderService.getAllIncomingOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await incomingOrderService.deleteOrder(id);
      toast.success("Order deleted");
      fetchOrders();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (orderData) => {
    try {
      if (isEditing) {
        await incomingOrderService.updateOrder(
          selectedOrder.id,
          orderData
        );
        toast.success("Order Updated");
      } else {
        await incomingOrderService.createOrder(orderData);
        toast.success("Order Created");
      }

      setShowModal(false);
      fetchOrders();
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Incoming Orders</h1>

        <button
          onClick={() => {
            setSelectedOrder(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Order
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.productId}</td>
                <td className="px-6 py-4">{order.supplierId}</td>
                <td className="px-6 py-4">{order.quantitySupply}</td>
                <td className="px-6 py-4">{order.unitPrice}</td>
                <td className="px-6 py-4">{order.totalPrice}</td>
                <td className="px-6 py-4">{order.supplyDate}</td>

                <td className="flex gap-3 p-3">
                  <button
                    onClick={() => handleView(order)}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(order)}
                    className="text-green-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <IncomingOrderForm
          order={selectedOrder}
          isEditing={isEditing}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default IncomingOrderList;