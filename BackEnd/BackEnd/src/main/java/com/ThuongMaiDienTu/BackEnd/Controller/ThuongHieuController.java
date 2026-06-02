package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuongHieuResponse;
import com.ThuongMaiDienTu.BackEnd.Service.ThuongHieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RequestMapping("/api/thuonghieu")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ThuongHieuController {
    private final ThuongHieuService thuongHieuService;

    @GetMapping
    public ResponseEntity<List<ThuongHieuResponse>> getAll() {
        return ResponseEntity.ok(thuongHieuService.getAllThuongHieu());
    }
}
