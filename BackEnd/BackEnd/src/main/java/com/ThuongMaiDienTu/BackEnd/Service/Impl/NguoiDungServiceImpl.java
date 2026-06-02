package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
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
        NguoiDungEntity nguoiDung = nguoiDungRepository.findById(id).orElse(null);
        if (nguoiDung == null) {
            return false;
        }

        boolean isAdmin = nguoiDung.getVaiTros().stream()
                .anyMatch(role -> role.getTenVaiTro().equalsIgnoreCase("Admin"));
        if (isAdmin) {
            return false; 
        }

        if (nguoiDung.getTrangThai() == TrangThaiNguoiDung.HOAT_DONG) {
            nguoiDung.setTrangThai(TrangThaiNguoiDung.KHOA);
        } else {
            nguoiDung.setTrangThai(TrangThaiNguoiDung.HOAT_DONG);
        }
        nguoiDungRepository.save(nguoiDung);
        return true;
    }
    // Hàm phụ trợ map Entity -> DTO
    private NguoiDungResponse mapToResponse(NguoiDungEntity entity) {
        NguoiDungResponse dto = new NguoiDungResponse();
        dto.setId(entity.getId());
        dto.setTenDangNhap(entity.getTenDangNhap());
        dto.setEmail(entity.getEmail());
        if (entity.getTrangThai() != null) {
            dto.setTrangThai(entity.getTrangThai().getDbValue());
        }
        dto.setNgayTao(entity.getNgayTao());
        // Lấy danh sách tên vai trò
        List<String> roles = entity.getVaiTros().stream()
                .map(role -> role.getTenVaiTro())
                .collect(Collectors.toList());
        dto.setVaiTros(roles);
        return dto;
    }
}