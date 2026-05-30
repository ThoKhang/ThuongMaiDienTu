package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Repository.NguoiDungRepository;
import com.ThuongMaiDienTu.BackEnd.Service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NguoiDungServiceImpl implements NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Override
    public List<NguoiDungResponse> layDanhSachNguoiDung() {
        // Lấy tất cả user từ DB và chuyển sang DTO
        List<NguoiDungEntity> danhSach = nguoiDungRepository.findAll();
        return danhSach.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public boolean thayDoiTrangThaiTaiKhoan(Integer id) {
        // Tìm user theo ID
        NguoiDungEntity nguoiDung = nguoiDungRepository.findById(id).orElse(null);
        if (nguoiDung == null) {
            return false;
        }

        // Logic đổi trạng thái
        if ("HoatDong".equals(nguoiDung.getTrangThai())) {
            nguoiDung.setTrangThai("DaKhoa");
        } else {
            nguoiDung.setTrangThai("HoatDong");
        }
        
        // Lưu lại vào DB
        nguoiDungRepository.save(nguoiDung);
        return true;
    }
    // Hàm phụ trợ map Entity -> DTO
    private NguoiDungResponse mapToResponse(NguoiDungEntity entity) {
        NguoiDungResponse dto = new NguoiDungResponse();
        dto.setId(entity.getId());
        dto.setTenDangNhap(entity.getTenDangNhap());
        dto.setEmail(entity.getEmail());
        dto.setTrangThai(entity.getTrangThai());
        dto.setNgayTao(entity.getNgayTao());
        // Lấy danh sách tên vai trò
        List<String> roles = entity.getVaiTros().stream()
                .map(role -> role.getTenVaiTro())
                .collect(Collectors.toList());
        dto.setVaiTros(roles);
        return dto;
    }
}