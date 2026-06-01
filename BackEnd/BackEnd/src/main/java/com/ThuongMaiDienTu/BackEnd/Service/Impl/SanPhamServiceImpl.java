package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {
    private final SanPhamRepository sanPhamRepository;
    private final SanPhamMapper sanPhamMapper;

    @Override
    public List<SanPhamResponse> getAllSanPham() {
        return List.of();
    }

    @Override
    public SanPhamResponse getSanPhamById(Integer id) {
        SanPhamEntity sanPham = sanPhamRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
        return sanPhamMapper.toResponse(sanPham);
    }

    @Override
    public SanPhamResponse createSanPham(SanPhamRequest request) {
        return null;
    }
}
