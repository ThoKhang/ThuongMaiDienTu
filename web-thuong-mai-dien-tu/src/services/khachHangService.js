import api from '../configs/api';

export const khachHangService = {
  createKhachHang: async (data) => {
    const response = await api.post(`/api/khachhang`, data);
    return response.data;
  },
};
