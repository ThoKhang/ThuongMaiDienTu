package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private NguoiDungService nguoiDungService;

    // API 1: Xem danh sách toàn bộ tài khoản
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<NguoiDungResponse>> getAllUsers() {
        List<NguoiDungResponse> users = nguoiDungService.layDanhSachNguoiDung();
        return ResponseEntity.ok(users);
    }

    // API 2: Khóa hoặc Mở khóa tài khoản theo ID
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<String> toggleUserStatus(@PathVariable Integer id) {
        boolean isSuccess = nguoiDungService.thayDoiTrangThaiTaiKhoan(id);
        if (isSuccess) {
            return ResponseEntity.ok("Thay đổi trạng thái tài khoản thành công!");
        }
        return ResponseEntity.badRequest().body("Lỗi: Không tìm thấy người dùng với ID này!");
    }
}