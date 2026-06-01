package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichResponse;
import com.ThuongMaiDienTu.BackEnd.Service.GiaoDichService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GiaoDichServiceImpl implements GiaoDichService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<GiaoDichResponse> getAllGiaoDich() {
        String sql = "SELECT gd.id, nd_kh.tenDangNhap as khachHang, nd_dt.tenDangNhap as doiTac, " +
                     "sp.tenSanPham, gd.soLuong, gd.tongGiaTri, gd.hoaHongNhan, gd.phuongThucTT, " +
                     "gd.trangThaiXacThuc, gd.ngayGiaoDich, c.id as idClick, c.diaChiIP " +
                     "FROM GIAODICH_AFFILIATE gd " +
                     "LEFT JOIN NGUOIDUNG nd_kh ON gd.idKhachHang = nd_kh.id " +
                     "JOIN NGUOIDUNG nd_dt ON gd.idDoiTac = nd_dt.id " +
                     "JOIN SANPHAM sp ON gd.idSanPham = sp.id " +
                     "JOIN THEODOI_CLICK c ON gd.idClick = c.id " +
                     "ORDER BY gd.ngayGiaoDich DESC";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        List<GiaoDichResponse> result = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

        for (Map<String, Object> row : rows) {
            
            // --- NEW: Robust Date Handling ---
            String formattedDate = "";
            Object rawDate = row.get("ngayGiaoDich");
            if (rawDate != null) {
                if (rawDate instanceof java.util.Date) {
                    formattedDate = sdf.format((java.util.Date) rawDate);
                } else if (rawDate instanceof java.time.LocalDateTime) {
                    // Convert LocalDateTime to java.util.Date if using newer drivers
                    java.util.Date out = java.util.Date.from(((java.time.LocalDateTime) rawDate).atZone(java.time.ZoneId.systemDefault()).toInstant());
                    formattedDate = sdf.format(out);
                } else {
                     formattedDate = rawDate.toString(); // Fallback
                }
            }
            // ---------------------------------

            result.add(GiaoDichResponse.builder()
                    .id((Integer) row.get("id"))
                    .maGiaoDich("GD" + String.format("%04d", row.get("id")))
                    .khachHang(row.get("khachHang") != null ? (String) row.get("khachHang") : "Khách vãng lai")
                    .doiTac((String) row.get("doiTac"))
                    .sanPham((String) row.get("tenSanPham"))
                    .soLuong((Integer) row.get("soLuong"))
                    .tongGiaTri(((Number) row.get("tongGiaTri")).doubleValue())
                    .hoaHong(((Number) row.get("hoaHongNhan")).doubleValue())
                    .phuongThucTT((String) row.get("phuongThucTT"))
                    .trangThaiXacThuc((String) row.get("trangThaiXacThuc"))
                    .ngayGiaoDich(formattedDate) // Use the safely formatted date
                    .idClick(((Number) row.get("idClick")).longValue())
                    .ipClick((String) row.get("diaChiIP"))
                    .build());
        }
        return result;
    }

    @Override
    public boolean capNhatTrangThai(Integer id, String trangThaiMoi) {
        // Cập nhật trạng thái thần tốc bằng JDBC
        String sql = "UPDATE GIAODICH_AFFILIATE SET trangThaiXacThuc = ? WHERE id = ?";
        int updatedRows = jdbcTemplate.update(sql, trangThaiMoi, id);
        return updatedRows > 0;
    }
}