package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.KhachHangEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.KhachHangMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.KhachHangRepository;
import com.ThuongMaiDienTu.BackEnd.Service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {
    private final KhachHangRepository khachHangRepository;
    private final KhachHangMapper khachHangMapper;
    @Override
    public KhachHangResponse createKhachHang(KhachHangRequest request) {
        KhachHangEntity entity = khachHangRepository.findById(request.getIdNguoiDung()).orElse(null);
        if (entity != null) {
            entity.setDiemThuong((entity.getDiemThuong() == null ? 0 : entity.getDiemThuong()) + 1);
            if (request.getHoTen() != null && !request.getHoTen().isEmpty()) {
                entity.setHoTen(request.getHoTen());
            }
        } else {
            entity = khachHangMapper.toEntity(request);
            entity.setDiemThuong(1);
        }
        KhachHangEntity saved = khachHangRepository.save(entity);
        return khachHangMapper.toResponse(saved);
    }
}