import api from './api';

export const supplierService = {
  getAllSuppliers: async () => {
    const response = await api.get('/supplier/allsupplier');
    console.log("Suppliers:", response.data);
    console.log("Is array?", Array.isArray(response.data));
    return response.data;
  },

  getSupplierById: async (id) => {
    const response = await api.get(`/supplier/getsupplier/${id}`);
    return response.data;
  },

  createSupplier: async (supplier) => {
    const response = await api.post('/supplier/createsupplier', supplier);
    return response.data;
  },

  updateSupplier: async (id, supplier) => {
    const response = await api.post(`/supplier/updatesupplier/${id}`, supplier);
    return response.data;
  },
  deleteSupplier: async (id) => {
    const response = await api.delete(`/supplier/deletebyid/${id}`);
    return response.data;
  },
};