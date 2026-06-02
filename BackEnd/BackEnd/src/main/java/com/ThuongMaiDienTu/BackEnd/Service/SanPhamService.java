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
}
