package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.VendorDashboardResponse;
import com.ThuongMaiDienTu.BackEnd.Service.VendorDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VendorDashboardServiceImpl implements VendorDashboardService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public VendorDashboardResponse getVendorDashboard(Integer idDoiTac) {
        DecimalFormat currencyFormat = new DecimalFormat("#,### đ");

        // 1. Tổng lượt click vào các sản phẩm của đối tác
        Long tongLuotClick = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM THEODOI_CLICK tc " +
            "JOIN SANPHAM sp ON tc.idSanPham = sp.id " +
            "WHERE sp.idDoiTac = ?",
            Long.class, idDoiTac
        );
        if (tongLuotClick == null) tongLuotClick = 0L;

        // 2. Tổng giao dịch hoa hồng
        Long tongGiaoDich = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM GIAODICH_AFFILIATE WHERE idDoiTac = ?",
            Long.class, idDoiTac
        );
        if (tongGiaoDich == null) tongGiaoDich = 0L;

        // 3. Tổng hoa hồng nhận được
        Double tongHoaHongDouble = jdbcTemplate.queryForObject(
            "SELECT COALESCE(SUM(hoaHongNhan), 0) FROM GIAODICH_AFFILIATE WHERE idDoiTac = ?",
            Double.class, idDoiTac
        );
        double tongHoaHong = (tongHoaHongDouble != null) ? tongHoaHongDouble : 0.0;
        String tongHoaHongStr = (tongHoaHong >= 1_000_000)
            ? String.format("%.1fM đ", tongHoaHong / 1_000_000)
            : currencyFormat.format(tongHoaHong);

        // 4. Tỷ lệ chuyển đổi
        double tyLe = (tongLuotClick > 0)
            ? ((double) tongGiaoDich / tongLuotClick) * 100 : 0.0;
        String tyLeChuyenDoi = String.format("%.1f%%", tyLe);

        // 5. Phân bổ trạng thái tin đăng
        Long soTinDaDuyet = queryCount(
            "SELECT COUNT(*) FROM SANPHAM WHERE idDoiTac = ? AND tinhTrangDuyet = 'DaDuyet'", idDoiTac);
        Long soTinChoDuyet = queryCount(
            "SELECT COUNT(*) FROM SANPHAM WHERE idDoiTac = ? AND tinhTrangDuyet = 'ChoDuyet'", idDoiTac);
        Long soTinDaAn = queryCount(
            "SELECT COUNT(*) FROM SANPHAM WHERE idDoiTac = ? AND tinhTrangDuyet = 'DaAn'", idDoiTac);
        Long soTinTuChoi = queryCount(
            "SELECT COUNT(*) FROM SANPHAM WHERE idDoiTac = ? AND tinhTrangDuyet = 'TuChoi'", idDoiTac);

        // 6. Top 5 sản phẩm được click nhiều nhất của đối tác
        List<Map<String, Object>> dbTopClick = jdbcTemplate.queryForList(
            "SELECT sp.tenSanPham as name, COUNT(tc.id) as soClick " +
            "FROM THEODOI_CLICK tc JOIN SANPHAM sp ON tc.idSanPham = sp.id " +
            "WHERE sp.idDoiTac = ? " +
            "GROUP BY sp.id, sp.tenSanPham " +
            "ORDER BY soClick DESC LIMIT 5",
            idDoiTac
        );

        // 7. Lượt click theo 7 ngày gần nhất
        List<Map<String, Object>> dbClick7Ngay = jdbcTemplate.queryForList(
            "SELECT DATE(tc.thoiGianClick) as ngay, COUNT(*) as soClick " +
            "FROM THEODOI_CLICK tc JOIN SANPHAM sp ON tc.idSanPham = sp.id " +
            "WHERE sp.idDoiTac = ? AND tc.thoiGianClick >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) " +
            "GROUP BY DATE(tc.thoiGianClick) ORDER BY ngay ASC",
            idDoiTac
        );

        List<Map<String, Object>> clickTheo7Ngay = new ArrayList<>();
        for (Map<String, Object> row : dbClick7Ngay) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", row.get("ngay") != null ? row.get("ngay").toString().substring(5) : "");
            item.put("click", row.get("soClick"));
            clickTheo7Ngay.add(item);
        }

        // 8. Giao dịch hoa hồng gần đây (5 giao dịch)
        List<Map<String, Object>> dbGiaoDich = jdbcTemplate.queryForList(
            "SELECT gd.id, nd.tenDangNhap as khachHang, sp.tenSanPham as sanPham, " +
            "gd.hoaHongNhan as hoaHong, gd.trangThaiXacThuc as trangThai, gd.ngayGiaoDich " +
            "FROM GIAODICH_AFFILIATE gd " +
            "LEFT JOIN NGUOIDUNG nd ON gd.idKhachHang = nd.id " +
            "JOIN SANPHAM sp ON gd.idSanPham = sp.id " +
            "WHERE gd.idDoiTac = ? " +
            "ORDER BY gd.ngayGiaoDich DESC LIMIT 5",
            idDoiTac
        );

        List<Map<String, Object>> giaoDichGanDay = new ArrayList<>();
        for (Map<String, Object> row : dbGiaoDich) {
            Map<String, Object> gd = new HashMap<>();
            gd.put("id", "GD#" + row.get("id"));
            gd.put("khachHang", row.get("khachHang") != null ? row.get("khachHang") : "Khách vãng lai");
            gd.put("sanPham", row.get("sanPham"));
            gd.put("hoaHong", currencyFormat.format(row.get("hoaHong")));
            gd.put("trangThai", row.get("trangThai"));
            Object ngay = row.get("ngayGiaoDich");
            gd.put("ngay", ngay != null ? ngay.toString().substring(0, 10) : "");
            giaoDichGanDay.add(gd);
        }

        return VendorDashboardResponse.builder()
                .tongLuotClick(tongLuotClick)
                .tongGiaoDich(tongGiaoDich)
                .tongHoaHong(tongHoaHongStr)
                .tyLeChuyenDoi(tyLeChuyenDoi)
                .soTinDangDaDuyet(soTinDaDuyet)
                .soTinDangChoDuyet(soTinChoDuyet)
                .soTinDangDaAn(soTinDaAn)
                .soTinDangTuChoi(soTinTuChoi)
                .topSanPhamClick(dbTopClick)
                .clickTheo7Ngay(clickTheo7Ngay)
                .giaoDichGanDay(giaoDichGanDay)
                .build();
    }

    private Long queryCount(String sql, Object... args) {
        Long result = jdbcTemplate.queryForObject(sql, Long.class, args);
        return result != null ? result : 0L;
    }
}
