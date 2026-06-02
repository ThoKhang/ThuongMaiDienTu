package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.Service.DoiTacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/partners")
public class AdminDoiTacController {

    @Autowired
    private DoiTacService doiTacService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(doiTacService.getAllDoiTac());
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/config")
    public ResponseEntity<String> updateConfig(
            @PathVariable Integer id, 
            @RequestParam Double tyLeHoaHong, 
            @RequestParam String trangThai,
            @RequestParam String trangThaiDuyet) { // Thêm param này
        boolean success = doiTacService.capNhatCauHinh(id, tyLeHoaHong, trangThai, trangThaiDuyet);
        if (success) {
            return ResponseEntity.ok("Cập nhật cấu hình đối tác thành công!");
        }
        return ResponseEntity.badRequest().body("Lỗi khi cập nhật cấu hình đối tác!");
    }
}