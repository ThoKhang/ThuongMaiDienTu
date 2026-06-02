package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sanpham")
@CrossOrigin(origins = "*")
public class SanPhamController {
    final private SanPhamRepository sanPhamRepository;
    final private SanPhamMapper sanPhamMapper;
    private final SanPhamService sanPhamService;
    @GetMapping
    public ResponseEntity<List<SanPhamResponse>> getAll() {
        return ResponseEntity.ok(sanPhamService.getAllSanPham());
    }
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(sanPhamService.getSanPhamById(id));
    }
    @PostMapping
    public ResponseEntity<SanPhamResponse> create(@RequestBody SanPhamRequest request) {
        return ResponseEntity.ok(sanPhamService.createSanPham(request));
    }
    @GetMapping("/phan-trang")
    public ResponseEntity<Page<SanPhamResponse>> getPhanTrang(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                sanPhamRepository
                        .findByTinhTrangDuyet(TinhTrangDuyet.DA_DUYET, pageable)
                        .map(sanPhamMapper::toResponse)
        );
    }
    @GetMapping("/search")
    public ResponseEntity<List<SanPhamResponse>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(sanPhamService.searchByTenSanPham(keyword));
    }
}
