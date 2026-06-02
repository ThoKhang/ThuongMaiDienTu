import api from '../configs/api';

export const sanPhamService = {
  getChiTietSanPham: async (idSanPham) => {
    const response = await api.get(`/api/sanpham/${idSanPham}`);
    return response.data;
  },
  getSanPhamTuongTu: async (idDanhMuc, idSanPhamHienTai, limit = 4) => {
    const response = await api.get(`/api/sanpham`, {
      params: {
        idDanhMuc,
        excludeId: idSanPhamHienTai,
        limit,
      },
    });
    return response.data;
  },
  tangLuotXem: async (idSanPham) => {
    const response = await api.post(`/api/sanpham/${idSanPham}/view`);
    return response.data;
  },
  getPartnerProducts: async () => {
    const response = await api.get('/api/sanpham/partner');
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/api/sanpham/${id}`);
    return response.data;
  },
  updateStock: async (id, soLuongTon) => {
    const response = await api.put(`/api/sanpham/${id}/stock`, { soLuongTon });
    return response.data;
  },
  updateStatus: async (id, tinhTrangDuyet) => {
    const response = await api.put(`/api/sanpham/${id}/status`, { tinhTrangDuyet });
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/api/sanpham/${id}`, productData);
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get('/api/danh-muc');
    return response.data;
  },
  getBrands: async () => {
    const response = await api.get('/api/thuonghieu');
    return response.data;
  },
};
