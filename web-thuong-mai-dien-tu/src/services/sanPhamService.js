import api from '../configs/api';

export const sanPhamService = {
  getChiTietSanPham: async (idSanPham) => {
    const response = await api.get(`/api/sanpham/${idSanPham}`);
    return response.data;
  },
  getSanPhamTuongTu: async (idDanhMuc, idSanPhamHienTai, limit = 4) => {
    const response = await api.get(`/api/sanpham/phan-trang`, {
      params: {
        idDanhMuc,
        excludeId: idSanPhamHienTai,
        size: limit,
      },
    });
    return response.data;
  },
  tangLuotXem: async (idSanPham) => {
    const response = await api.post(`/api/sanpham/${idSanPham}/view`);
    return response.data;
  },
  getAll2SanPham: async (filters = {}) => {
    const response = await api.get(`/api/sanpham/phan-trang`, {
      params: {
        ...filters,
        size: 2
      }
    });
    return response.data;
  },
  searchByKeyword: async (keyword) => {
    const response = await api.get(`/api/sanpham/search`, {
      params: { keyword },
    });
    return response.data;
  },
};
