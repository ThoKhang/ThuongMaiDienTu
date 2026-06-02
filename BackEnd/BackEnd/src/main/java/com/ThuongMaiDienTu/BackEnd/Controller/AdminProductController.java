package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    private SanPhamService sanPhamService;

    // Lấy danh sách toàn bộ sản phẩm (Bao gồm cả chờ duyệt và đã duyệt
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        // Giả sử bạn đã có hàm layDanhSachSanPham() trả về List DTO
        return ResponseEntity.ok(sanPhamService.getAllSanPham()); 
    }

    // API Cập nhật trạng thái duyệt (Duyệt / Từ chối)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateProductStatus(
            @PathVariable Integer id, 
            @RequestParam String status) {
        
        boolean isSuccess = sanPhamService.capNhatTrangThaiDuyet(id, status);
        if (isSuccess) {
            return ResponseEntity.ok("Cập nhật trạng thái sản phẩm thành công!");
        }
        return ResponseEntity.badRequest().body("Lỗi: Không tìm thấy sản phẩm!");
    }
}