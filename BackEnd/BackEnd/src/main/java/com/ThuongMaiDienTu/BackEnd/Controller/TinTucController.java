package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID; // Đã bổ sung thư viện xử lý chuỗi ngẫu nhiên

@RequestMapping("/api/tintuc")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TinTucController {

    private final TinTucService tinTucService;

    // Lấy đường dẫn lưu file từ application.properties
    @Value("${file.upload-dir:../FrontEnd/public/upload}")
    private String uploadDir;

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

    // 🔥 4. Lấy 1 tin theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            TinTucResponse result = tinTucService.getTinTucById(id);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔥 5. Đăng tin mới (Sử dụng lại từ file trước để đồng bộ)
    @PostMapping("/dang-tin")
    public ResponseEntity<?> createTinTuc(
            @RequestParam("tieuDe") String tieuDe,
            @RequestParam("noiDung") String noiDung,
            @RequestParam("idNguoiDang") Integer idNguoiDang,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String fileName = null;
            if (file != null && !file.isEmpty()) {
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();
                fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                file.transferTo(new File(dir.getAbsolutePath() + File.separator + fileName));
            }

            boolean success = tinTucService.luuTinTucMoi(idNguoiDang, tieuDe, noiDung, fileName);
            if (success) {
                return ResponseEntity.ok("Đăng bài viết thành công!");
            }
            return ResponseEntity.badRequest().body("Lỗi hệ thống khi lưu bài viết.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi tải ảnh lên server.");
        }
    }

    // 🔥 6. Lấy tin tức của tôi
    @GetMapping("/cua-toi/{idNguoiDang}")
    public ResponseEntity<List<TinTucResponse>> getMyNews(@PathVariable Integer idNguoiDang) {
        return ResponseEntity.ok(tinTucService.getTinTucByNguoiDang(idNguoiDang));
    }

    // 🔥 7. Cập nhật tin tức của tôi (HÀM ĐÃ ĐƯỢC SỬA LỖI)
    @PutMapping("/cua-toi/{idTinTuc}")
    public ResponseEntity<?> updateMyNews(
            @PathVariable Integer idTinTuc,
            @RequestParam("tieuDe") String tieuDe,
            @RequestParam("noiDung") String noiDung,
            @RequestParam("idNguoiDang") Integer idNguoiDang,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String fileName = null;
            // Xử lý lưu ảnh mới nếu người dùng có đính kèm file
            if (file != null && !file.isEmpty()) {
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();
                fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                file.transferTo(new File(dir.getAbsolutePath() + File.separator + fileName));
            }

            boolean success = tinTucService.capNhatTinTuc(idTinTuc, idNguoiDang, tieuDe, noiDung, fileName);
            if (success) {
                return ResponseEntity.ok("Cập nhật thành công, bài viết đã được chuyển về trạng thái Chờ duyệt.");
            }
            return ResponseEntity.badRequest().body("Bạn không có quyền sửa hoặc bài viết không tồn tại!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi hệ thống khi cập nhật bài viết.");
        }
    }
}