package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaoDichAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Service.GiaoDichAffiliateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("/api/giaodich-affiliate")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GiaoDichAffiliateController {

    private final GiaoDichAffiliateService service;

    @PostMapping
    public ResponseEntity<GiaoDichAffiliateResponse> createGiaoDich(@RequestBody GiaoDichAffiliateRequest request) {
        return ResponseEntity.ok(service.createGiaoDich(request));
    }

    @GetMapping("/doitac/{idDoiTac}")
    public ResponseEntity<List<GiaoDichAffiliateResponse>> getGiaoDichByDoiTac(@PathVariable Integer idDoiTac) {
        return ResponseEntity.ok(service.getGiaoDichByIdDoiTac(idDoiTac));
    }

    @GetMapping
    public ResponseEntity<List<GiaoDichAffiliateResponse>> getAllGiaoDich() {
        return ResponseEntity.ok(service.getAllGiaoDich());
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<GiaoDichAffiliateResponse> updateTrangThai(
            @PathVariable Integer id,
            @RequestParam String trangThai) {
        return ResponseEntity.ok(service.updateTrangThaiGiaoDich(id, trangThai));
    }
}
