package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RequestMapping("/api/tintuc")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TinTucController {

    private final TinTucService tinTucService;
    private final String uploadDir; // Inject từ bean FileStorageConfig

    @GetMapping("/moi-nhat")
    public ResponseEntity<List<TinTucResponse>> getMoiNhat() {
        return ResponseEntity.ok(tinTucService.getTinTucMoiNhat());
    }

    @GetMapping("/phan-trang")
    public ResponseEntity<Page<TinTucResponse>> getPhanTrang(
            @RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(tinTucService.getTinTucPhanTrang(page));
    }

    @GetMapping
    public ResponseEntity<List<TinTucResponse>> getAll() {
        return ResponseEntity.ok(tinTucService.getAllTinTuc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(tinTucService.getTinTucById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/dang-tin")
    public ResponseEntity<?> createTinTuc(
            @RequestParam("tieuDe") String tieuDe,
            @RequestParam("noiDung") String noiDung,
            @RequestParam("idNguoiDang") Integer idNguoiDang,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String fileName = null;
            if (file != null && !file.isEmpty()) {
                fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                file.transferTo(new File(uploadDir + File.separator + fileName));
            }

            boolean success = tinTucService.luuTinTucMoi(idNguoiDang, tieuDe, noiDung, fileName);
            return success
                    ? ResponseEntity.ok("Đăng bài viết thành công!")
                    : ResponseEntity.badRequest().body("Lỗi hệ thống khi lưu bài viết.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi tải ảnh lên server: " + e.getMessage());
        }
    }

    @GetMapping("/cua-toi/{idNguoiDang}")
    public ResponseEntity<List<TinTucResponse>> getMyNews(@PathVariable Integer idNguoiDang) {
        return ResponseEntity.ok(tinTucService.getTinTucByNguoiDang(idNguoiDang));
    }

    @PutMapping("/cua-toi/{idTinTuc}")
    public ResponseEntity<?> updateMyNews(
            @PathVariable Integer idTinTuc,
            @RequestParam("tieuDe") String tieuDe,
            @RequestParam("noiDung") String noiDung,
            @RequestParam("idNguoiDang") Integer idNguoiDang,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String fileName = null;
            if (file != null && !file.isEmpty()) {
                fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                file.transferTo(new File(uploadDir + File.separator + fileName));
            }

            boolean success = tinTucService.capNhatTinTuc(idTinTuc, idNguoiDang, tieuDe, noiDung, fileName);
            return success
                    ? ResponseEntity.ok("Cập nhật thành công, bài viết đã được chuyển về trạng thái Chờ duyệt.")
                    : ResponseEntity.badRequest().body("Bạn không có quyền sửa hoặc bài viết không tồn tại!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi hệ thống khi cập nhật bài viết: " + e.getMessage());
        }
    }
}