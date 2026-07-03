import React, { useState } from 'react';

const SupplierForm = ({
  supplier,
  isEditing,
  onClose,
  onSubmit
}) => {

  const [formData, setFormData] = useState({
    firstName: supplier?.firstName || '',
    lastName: supplier?.lastName || '',
    age: supplier?.age || '',
    email: supplier?.email || '',
    phoneNumber: supplier?.phoneNumber || '',
    address: supplier?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Supplier' : 'Create Supplier'}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            rows="3"
          />

          <div className="flex justify-end gap-3">

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
              {isEditing ? 'Update' : 'Create'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;