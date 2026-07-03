import React, { useState } from 'react';

const RegisterStaff = ({ staff, isEditing,isViewMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    age: staff?.age || '',
    email: staff?.email || '',
    password: '',
    role: staff?.role || '',
    phoneNumber: staff?.phoneNumber || '',
    address: staff?.address || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-xl font-bold mb-4">
        {isViewMode ? 'View Staff': isEditing ? 'Edit Staff': 'Create Staff'}
        </h2>

        <form onSubmit={submitHandler}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          />

          {!isEditing && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isViewMode}
              className="w-full border p-2 mb-3"
              required
            />
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            disabled={isViewMode}
            className="w-full border p-2 mb-3"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            {!isViewMode && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterStaff;