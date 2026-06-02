package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TheoDoiClickRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TheoDoiClickResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TheoDoiClickService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/theodoi-click")
@RequiredArgsConstructor
public class TheoDoiClickController {
    private final TheoDoiClickService theoDoiClickService;
    @PostMapping
    public ResponseEntity<TheoDoiClickResponse> create(@RequestBody TheoDoiClickRequest request) {
        return ResponseEntity.ok(theoDoiClickService.createTheoDoiClick(request));
    }
}
