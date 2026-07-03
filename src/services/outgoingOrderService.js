import api from './api';

export const outgoingOrderService = {
  getAllOrders: async () => {
    const response = await api.get('/outgoingorder/getalloutgoingorder');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/outgoingorder/getoutgoingorderbyid/${id}`);
    return response.data;
  },

  createOrder: async (orderDTO) => {
    const response = await api.post('/outgoingorder/newoutgoingorder', orderDTO);
    return response.data;
  },

  createManyOrders: async (ordersDTO) => {
    const response = await api.post('/outgoingorder/createmanyoutgoingorder', ordersDTO);
    return response.data;
  },

  updateOrder: async (id, orderDTO) => {
    const response = await api.post(`/outgoingorder/updateoutgoingorder/${id}`, orderDTO);
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await api.delete(`/outgoingorder/deleteoutgoingorder/${id}`);
    return response.data;
  },
};