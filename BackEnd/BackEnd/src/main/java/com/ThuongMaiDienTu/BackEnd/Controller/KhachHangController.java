package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;
import com.ThuongMaiDienTu.BackEnd.Service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/khachhang")
@RequiredArgsConstructor
public class KhachHangController {
    private final KhachHangService khachHangService;
    @PostMapping
    public ResponseEntity<KhachHangResponse> create(@RequestBody KhachHangRequest request) {
        return ResponseEntity.ok(khachHangService.createKhachHang(request));
    }
}
