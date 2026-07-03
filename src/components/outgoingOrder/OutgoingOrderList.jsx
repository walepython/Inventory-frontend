import React, { useEffect, useState } from 'react';
import { outgoingOrderService } from '../../services/outgoingOrderService';
import OutgoingOrderForm from './OutgoingOrderForm';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OutgoingOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await outgoingOrderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    }
  };
  const handleView = (order) => {
    setSelectedOrder(order);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await outgoingOrderService.updateOrder(
          selectedOrder.id,
          formData
        );
        toast.success('Order Updated');
      } else {
        await outgoingOrderService.createOrder(formData);
        toast.success('Order Created');
      }

      setShowModal(false);
      fetchOrders();

    } catch (error) {
      toast.error('Operation Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;

    try {
      await outgoingOrderService.deleteOrder(id);
      toast.success('Deleted Successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Delete Failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Outgoing Orders
        </h1>

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

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Price Before</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Price After</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.productId}</td>
                <td className="p-3">{order.quantityOrder}</td>
                <td className="p-3">
                  {order.totalPriceBeforeDiscount}
                </td>
                <td className="p-3">
                  {order.discount}
                </td>
                <td className="p-3">
                  {order.totalPriceAfterDiscount}
                </td>
                <td className="p-3">
                  {order.orderDate}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsEditing(true);
                      setShowModal(true);
                    }}
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

                  <button
                    onClick={() => handleView(order)}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <OutgoingOrderForm
          order={selectedOrder}
          isEditing={isEditing}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default OutgoingOrderList;