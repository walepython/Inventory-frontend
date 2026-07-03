import api from './api';

export const productService = {
  getAllProducts: async () => {
    const response = await api.get('/product/getallproduct');

    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/product/getproductbyid/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/product/createproduct', productData);
    // No headers — let axios/browser set multipart boundary automatically
    return response.data;
  },

  createManyProducts: async (products) => {
    const response = await api.post('/product/createmanyproduct', products);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.post(`/product/updateproduct/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/product/deleteproduct/${id}`);
    return response.data;
  },
};