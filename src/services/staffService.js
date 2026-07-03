import api from './api';
import toast from 'react-hot-toast';

export const staffService = {
  getAllStaff: async () => {
    const response = await api.get('/staff/getallstaff');
    return response.data;
  },

  getStaffById: async (id) => {
    const response = await api.get(`/staff/getbystaff/${id}`);
    return response.data;
  },

  updateStaff: async (id, staffDTO) => {
    const response = await api.post(
      `/staff/updatestaff/${id}`,
      staffDTO
    );
    return response.data;
  },

  registerStaff: async (staffDTO) => {
    const response = await api.post('/staff/register', staffDTO);
    return response.data;
  },

  deleteStaff: async (id) => {
    const response = await api.delete(`/staff/deletebyid/${id}`);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/staff/login', credentials);
  
    if (!response.data || !response.data.token) {
      throw new Error('Invalid credentials');
    }
  
    // Backend now returns { token: "...", staff: {...} }
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('staff', JSON.stringify(response.data.staff));
  
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('staff');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    window.location.href = '/login';
  },
};