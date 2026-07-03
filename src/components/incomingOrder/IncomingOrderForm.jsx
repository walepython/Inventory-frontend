import React, { useState } from "react";

const IncomingOrderForm = ({
  order,
  isEditing,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    productId: order?.productId || "",
    supplierId: order?.supplierId || "",
    quantitySupply: order?.quantitySupply || "",
    unitPrice: order?.unitPrice || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      quantitySupply: Number(formData.quantitySupply),
      unitPrice: Number(formData.unitPrice),
      productId: Number(formData.productId),
      supplierId: Number(formData.supplierId),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Order" : "Add Order"}
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
            <label>Supplier ID</label>
            <input
              type="number"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>Quantity Supply</label>
            <input
              type="number"
              name="quantitySupply"
              value={formData.quantitySupply}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>Unit Price</label>
            <input
              type="number"
              
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomingOrderForm;