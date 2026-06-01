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
};
