import { useQuery } from '@tanstack/react-query';
import { sanPhamService } from '../services/sanPhamService';

export const useChiTietSanPham = (idSanPham) => {
  return useQuery({
    queryKey: ['chi-tiet-san-pham', idSanPham],
    queryFn: () => sanPhamService.getChiTietSanPham(idSanPham),
    enabled: !!idSanPham,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useSanPhamTuongTu = (idDanhMuc, idSanPhamHienTai, limit = 4) => {
  return useQuery({
    queryKey: ['san-pham-tuong-tu', idDanhMuc, idSanPhamHienTai],
    queryFn: () => sanPhamService.getSanPhamTuongTu(idDanhMuc, idSanPhamHienTai, limit),
    enabled: !!idDanhMuc && !!idSanPhamHienTai,
    staleTime: 1000 * 60 * 5,
  });
};
