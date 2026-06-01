package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TrangChuResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TrangChuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trangchu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TrangChuController {

    private final TrangChuService trangChuService;

    @GetMapping
    public ResponseEntity<TrangChuResponse> getTrangChu(
            @RequestParam(defaultValue = "0") int page) {  // ← thêm @RequestParam
        return ResponseEntity.ok(trangChuService.getTrangChu(page));
    }
}