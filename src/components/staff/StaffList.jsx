import React, { useEffect, useState } from 'react';
import { staffService } from '../../services/staffService';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import StaffForm from './RegisterStaff';
import { toast } from 'react-toastify';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState()

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const data = await staffService.getAllStaff();
      setStaffs(data);
    } catch (error) {
      toast.error("Failed to load staff");
    }
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setIsEditing(false);
    setIsViewMode(true);
    setShowModal(true);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setIsEditing(true);
    setIsViewMode(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      try {
        await staffService.deleteStaff(id);
        toast.success('staff deleted successfully');
        fetchStaffs();
      } catch (error) {
        toast.error('Error deleting staff');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
  
      if (isEditing) {
        await staffService.updateStaff(
          selectedStaff.id,
          formData
        );
  
        toast.success("Staff Updated Successfully");
      } else {
        await staffService.registerStaff(formData);
  
        toast.success("Staff Created Successfully");
      }
  
      setShowModal(false);
      fetchStaffs();
  
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Staff Management</h1>

        <button
          onClick={() => {
            setSelectedStaff(null);
            setIsEditing(false);
            setIsViewMode(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Date Created</th>
              <th className="px-6 py-3 text-left text-ls font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id} className="border-t">
                <td className="p-3">{staff.id}</td>
                <td className="p-3">{staff.firstName}</td>
                <td className="p-3">{staff.lastName}</td>
                <td className="p-3">{staff.age}</td>
                <td className="p-3">{staff.email}</td>
                <td className="p-3">{staff.role}</td>
                <td className="p-3">{staff.phoneNumber}</td>
                <td className="p-3">{staff.address}</td>
                <td className="p-3">{staff.dateCreated}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleView(staff)}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(staff)}
                    className="text-green-600"
                  >
                   <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-600 hover:text-red-900"
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
        <StaffForm
          staff={selectedStaff}
          isEditing={isEditing}
          isViewMode={isViewMode}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default StaffList;