package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;

import java.util.List;

public interface SanPhamService {
    List<SanPhamResponse> getAllSanPham();
    SanPhamResponse getSanPhamById(Integer id);
    SanPhamResponse createSanPham(SanPhamRequest request);
}
