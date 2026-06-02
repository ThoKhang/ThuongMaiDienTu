package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/tintuc")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TinTucController {

    private final TinTucService tinTucService;

    // 🔥 1. Tin mới nhất (sidebar)
    @GetMapping("/moi-nhat")
    public ResponseEntity<List<TinTucResponse>> getMoiNhat() {
        return ResponseEntity.ok(tinTucService.getTinTucMoiNhat());
    }

    // 🔥 2. Phân trang
    @GetMapping("/phan-trang")
    public ResponseEntity<Page<TinTucResponse>> getPhanTrang(
            @RequestParam(defaultValue = "0") int page
    ) {
        return ResponseEntity.ok(tinTucService.getTinTucPhanTrang(page));
    }

    // 🔥 3. Lấy tất cả
    @GetMapping
    public ResponseEntity<List<TinTucResponse>> getAll() {
        return ResponseEntity.ok(tinTucService.getAllTinTuc());
    }

    // 🔥 4. Lấy 1 tin
    @GetMapping("/{id}")
    public ResponseEntity<TinTucResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(tinTucService.getTinTucById(id));
    }
}