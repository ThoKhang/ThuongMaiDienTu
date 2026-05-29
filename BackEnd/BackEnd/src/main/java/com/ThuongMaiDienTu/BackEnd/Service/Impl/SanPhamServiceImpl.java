package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;

import java.util.List;

public class SanPhamServiceImpl implements SanPhamService {
    @Override
    public List<SanPhamResponse> getAllSanPham() {
        return List.of();
    }

    @Override
    public SanPhamResponse getSanPhamById(Integer id) {
        return null;
    }

    @Override
    public SanPhamResponse createSanPham(SanPhamRequest request) {
        return null;
    }
}
