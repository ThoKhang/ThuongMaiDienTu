package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.BaiDangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.BaiDangResponse;
import com.ThuongMaiDienTu.BackEnd.Service.BaiDangService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/baidang/")
@CrossOrigin(origins = "*")
public class BaiDangController {

    private final BaiDangService baiDangService;

    @GetMapping
    public ResponseEntity<List<BaiDangResponse>> getAll() {
        return ResponseEntity.ok(baiDangService.getAllBaiDang());
    }

    @GetMapping("{id}")
    public ResponseEntity<BaiDangResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(baiDangService.getBaiDangById(id));
    }

    @PostMapping
    public ResponseEntity<BaiDangResponse> create(@RequestBody BaiDangRequest request) {
        return ResponseEntity.ok(baiDangService.createBaiDang(request));
    }

    @GetMapping("/phan-trang")
    public ResponseEntity<Page<BaiDangResponse>> getPhanTrang(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ResponseEntity.ok(baiDangService.getBaiDangPhanTrang(page, size));
    }

    // API dành cho Super Admin phê duyệt hoặc từ chối bài viết trên giao diện quản lý hệ thống
    @PutMapping("{id}/duyet")
    public ResponseEntity<String> approvePost(
            @PathVariable Integer id,
            @RequestParam Integer idAdmin,
            @RequestParam String trangThaiMoi -- Truyền vào 'DaDuyet' hoặc 'TuChoi'
    ) {
        boolean isSuccess = baiDangService.duyetBaiDang(id, idAdmin, trangThaiMoi);
        if (isSuccess) {
            return ResponseEntity.ok("Cập nhật trạng thái bài đăng thành công.");
        }
        return ResponseEntity.badRequest().body("Cập nhật thất bại. Vui lòng kiểm tra lại ID hoặc Trạng thái truyền vào.");
    }
}