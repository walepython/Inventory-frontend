import React, { useEffect, useState } from 'react';
import { supplierService } from '../../services/supplierService';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import SupplierForm from './SupplierForm';
import { toast } from 'react-toastify';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const suppliers = await supplierService.getAllSuppliers();
      console.log("Suppliers:", suppliers);
      console.log("Is array?", Array.isArray(suppliers));
  
      setSuppliers(suppliers);
    } catch (error) {
      toast.error('Failed to load suppliers');
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await supplierService.deleteSupplier(id);
  
      toast.success("Supplier Deleted");
  
      fetchSuppliers(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  const handleSubmit = async (supplierData) => {
    try {
      if (isEditing) {
        await supplierService.updateSupplier(
          selectedSupplier.id,
          supplierData
        );
        toast.success('Supplier Updated');
      } else {
        await supplierService.createSupplier(supplierData);
        toast.success('Supplier Created');
      }

      setShowModal(false);
      fetchSuppliers();
    } catch (error) {
      toast.error('Operation Failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>

        <button
          onClick={() => {
            setSelectedSupplier(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t">
                <td className="p-3">{supplier.id}</td>
                <td className="p-3">{supplier.firstName}</td>
                <td className="p-3">{supplier.lastName}</td>
                <td className="p-3">{supplier.age}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">{supplier.phoneNumber}</td>
                <td className="p-3">{supplier.address}</td>
                <td className="p-3">{supplier.dateCreated}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleView(supplier)}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-green-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
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
        <SupplierForm
          supplier={selectedSupplier}
          isEditing={isEditing}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SupplierList;