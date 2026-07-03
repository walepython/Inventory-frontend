import api from './api';

export const incomingOrderService = {
  getAllIncomingOrders: async () => {
    const response = await api.get('/incomingorder/getallincomingorder');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/incomingorder/getincomingorder/${id}`);
    return response.data;
  },

  createOrder: async (order) => {
    const response = await api.post('/incomingorder/newincome', order);
    return response.data;
  },

  createManyOrders: async (orders) => {
    const response = await api.post('/incomingorder/newincomes', orders);
    return response.data;
  },

  updateOrder: async (id, order) => {
    const response = await api.post(`/incomingorder/updateincomingorder/${id}`, order);
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await api.get(`/incomingorder/deleteincomingorder/${id}`);
    return response.data;
  },
};