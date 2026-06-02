package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/news")
@RequiredArgsConstructor
public class AdminTinTucController {

    private final TinTucService tinTucService;

    // Lấy TẤT CẢ bài viết (Bao gồm cả Chờ Duyệt) cho Admin xem
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TinTucResponse>> getAllForAdmin() {
        return ResponseEntity.ok(tinTucService.getAllTinTuc());
    }

    // Admin duyệt hoặc từ chối bài viết
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Integer id, @RequestParam String status) {
        boolean success = tinTucService.capNhatTrangThaiDuyet(id, status);
        if (success) {
            return ResponseEntity.ok("Cập nhật trạng thái duyệt tin tức thành công!");
        }
        return ResponseEntity.badRequest().body("Lỗi khi cập nhật!");
    }
}