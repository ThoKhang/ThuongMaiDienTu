package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @GetMapping("partner")
    public ResponseEntity<List<SanPhamResponse>> getPartnerProducts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(sanPhamService.getSanPhamByDoiTac(userDetails.getId()));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.ok("Xóa sản phẩm thành công!");
    }

    @PutMapping("{id}/stock")
    public ResponseEntity<SanPhamResponse> updateStock(@PathVariable Integer id, @RequestBody java.util.Map<String, Integer> requestBody) {
        Integer soLuong = requestBody.get("soLuongTon");
        return ResponseEntity.ok(sanPhamService.updateSoLuongTon(id, soLuong));
    }

    @PutMapping("{id}/status")
    public ResponseEntity<SanPhamResponse> updateStatus(@PathVariable Integer id, @RequestBody java.util.Map<String, String> requestBody) {
        String status = requestBody.get("tinhTrangDuyet");
        return ResponseEntity.ok(sanPhamService.updateTinhTrangDuyet(id, status));
    }

    @PutMapping("{id}")
    public ResponseEntity<SanPhamResponse> update(@PathVariable Integer id, @RequestBody SanPhamRequest request) {
        org.springframework.security.core.Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails userDetails = (com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails) authentication.getPrincipal();
        boolean isAdmin = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        SanPhamResponse sp = sanPhamService.getSanPhamById(id);
        if (!isAdmin && !sp.getIdDoiTac().equals(userDetails.getId())) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FORBIDDEN).build();
        }
        
        if (!isAdmin) {
            request.setIdDoiTac(userDetails.getId());
        }
        
        return ResponseEntity.ok(sanPhamService.updateSanPham(id, request));
    }

    @PostMapping("{id}/view")
    public ResponseEntity<String> recordClick(
            @PathVariable Integer id,
            jakarta.servlet.http.HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        Integer idKhachHang = null;
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                idKhachHang = userDetails.getId();
            }
        } catch (Exception e) {
            // Guest click
        }
        sanPhamService.recordClick(id, ipAddress, userAgent, idKhachHang);
        return ResponseEntity.ok("Ghi nhận lượt click thành công!");
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
