package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.KhachHangEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.KhachHangMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.KhachHangRepository;
import com.ThuongMaiDienTu.BackEnd.Repository.NguoiDungRepository;
import com.ThuongMaiDienTu.BackEnd.Service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {
    private final KhachHangRepository khachHangRepository;
    private final KhachHangMapper khachHangMapper;
    private final NguoiDungRepository nguoiDungRepository;

    @Override
    public KhachHangResponse createKhachHang(KhachHangRequest request) {
        // Nếu idNguoiDung null, tìm qua tenDangNhap (sub trong JWT)
        Integer idNguoiDung = request.getIdNguoiDung();
        String hoTen = request.getHoTen();

        if (idNguoiDung == null && request.getTenDangNhap() != null) {
            NguoiDungEntity nguoiDung = nguoiDungRepository
                .findByTenDangNhap(request.getTenDangNhap())
                .orElse(null);
            if (nguoiDung != null) {
                idNguoiDung = nguoiDung.getId();
                // Dùng tenDangNhap làm tên nếu hoTen chưa có
                if (hoTen == null || hoTen.isEmpty()) {
                    hoTen = nguoiDung.getTenDangNhap();
                }
            }
        }

        if (idNguoiDung == null) {
            throw new RuntimeException("Không tìm thấy người dùng");
        }

        KhachHangEntity entity = khachHangRepository.findById(idNguoiDung).orElse(null);
        if (entity != null) {
            // Đã có: tăng điểm thưởng lên 1
            entity.setDiemThuong((entity.getDiemThuong() == null ? 0 : entity.getDiemThuong()) + 1);
            if (hoTen != null && !hoTen.isEmpty()) {
                entity.setHoTen(hoTen);
            }
        } else {
            // Chưa có: tạo mới với diemThuong = 1
            entity = KhachHangEntity.builder()
                .idNguoiDung(idNguoiDung)
                .hoTen(hoTen != null ? hoTen : "Khách Hàng")
                .diemThuong(1)
                .build();
        }

        KhachHangEntity saved = khachHangRepository.save(entity);
        return khachHangMapper.toResponse(saved);
    }
}