package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.Service.GiaoDichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/transactions")
public class AdminGiaoDichController {

    @Autowired
    private GiaoDichService giaoDichService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(giaoDichService.getAllGiaoDich());
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Integer id, @RequestParam String status) {
        boolean success = giaoDichService.capNhatTrangThai(id, status);
        if (success) {
            return ResponseEntity.ok("Cập nhật giao dịch thành công!");
        }
        return ResponseEntity.badRequest().body("Lỗi khi cập nhật!");
    }
}