package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;

import java.util.List;
import org.springframework.data.domain.Page;

public interface SanPhamService {
    List<SanPhamResponse> getAllSanPham();

    SanPhamResponse getSanPhamById(Integer id);

    SanPhamResponse createSanPham(SanPhamRequest request);

    Page<SanPhamResponse> getSanPhamPhanTrang(int page);

    Page<SanPhamResponse> getSanPhamTheoDanhMuc(Integer id, int page);

    boolean capNhatTrangThaiDuyet(Integer idSanPham, String trangThaiMoi);

    List<SanPhamResponse> searchByTenSanPham(String keyword);
    List<SanPhamResponse> getSanPhamByDoiTac(Integer idDoiTac);
    void deleteSanPham(Integer id);
    SanPhamResponse updateSoLuongTon(Integer id, Integer soLuong);
    SanPhamResponse updateTinhTrangDuyet(Integer id, String tinhTrang);
    SanPhamResponse updateSanPham(Integer id, SanPhamRequest request);
    void recordClick(Integer idSanPham, String ipAddress, String userAgent, Integer idKhachHang);
}
