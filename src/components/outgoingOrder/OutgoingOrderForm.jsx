import React, { useState } from 'react';

const OutgoingOrderForm = ({
  order,
  isEditing,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    productId: order?.productId || '',
    quantityOrder: order?.quantityOrder || '',
    discount: order?.discount || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Order' : 'Add Order'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Product ID</label>
            <input
              type="number"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>Quantity Ordered</label>
            <input
              type="number"
              name="quantityOrder"
              value={formData.quantityOrder}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutgoingOrderForm;