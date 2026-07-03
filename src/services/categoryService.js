import api from './api';

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/category/allcategory');
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/category/getcategory/${id}`);
    return response.data;
  },

  createCategory: async (category) => {
    const response = await api.post('/category/createcategory', category);
    return response.data;
  },

  updateCategory: async (id, category) => {
    const response = await api.post(`/category/updatecategory/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/category/deletebyid/${id}`);
    return response.data;
  },
};