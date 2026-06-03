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
  getVendorDashboard: async () => {
    const response = await api.get('/api/vendor/dashboard');
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post('/api/sanpham', productData);
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/sanpham/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
