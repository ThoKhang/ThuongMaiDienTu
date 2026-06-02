package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Service.DanhMucService;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/danh-muc")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DanhMucController {
    private final SanPhamService sanPhamService;
    private final DanhMucService danhMucService;

    // Lấy tất cả danh mục
    @GetMapping
    public ResponseEntity<?> getAllDanhMuc() {
        return ResponseEntity.ok(danhMucService.getAllDanhMuc());
    }

    // Lấy sản phẩm theo danh mục
    @GetMapping("/{idDanhMuc}")
    public ResponseEntity<?> getSanPhamTheoDanhMuc(
            @PathVariable Integer idDanhMuc,
            @RequestParam(defaultValue = "0") int page) {

        Page<SanPhamResponse> result = sanPhamService.getSanPhamTheoDanhMuc(idDanhMuc, page);

        Map<String, Object> response = new HashMap<>();
        response.put("sanPham", result.getContent());
        response.put("tongSoTrang", result.getTotalPages());
        response.put("trangHienTai", result.getNumber());
        response.put("tongSoSanPham", result.getTotalElements());

        return ResponseEntity.ok(response);
    }
}
