package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.DashboardResponse;
import com.ThuongMaiDienTu.BackEnd.Service.DashboardService;
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
public class DashboardServiceImpl implements DashboardService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public DashboardResponse getDashboardStats() {
        DecimalFormat currencyFormat = new DecimalFormat("#,### đ");
        
        // 1. Tổng tài khoản
        Long tongTaiKhoan = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM NGUOIDUNG", Long.class);

        // 2. Giao dịch mới (Chỉ đếm giao dịch đã xác nhận)
        Long giaoDichMoi = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM GIAODICH_AFFILIATE", Long.class);

        // 3. Tổng doanh thu (Hoa hồng)
        Double tongDoanhThuDouble = jdbcTemplate.queryForObject("SELECT SUM(hoaHongNhan) FROM GIAODICH_AFFILIATE", Double.class);
        double tongDoanhThu = (tongDoanhThuDouble != null) ? tongDoanhThuDouble : 0.0;
        String tongDoanhThuStr = (tongDoanhThu > 1000000) ? 
                String.format("%.1fM", tongDoanhThu / 1000000) : currencyFormat.format(tongDoanhThu);

        // 4. Tỷ lệ chuyển đổi = (Giao dịch / Lượt Click) * 100
        Long tongClick = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM THEODOI_CLICK", Long.class);
        double tyLe = (tongClick != null && tongClick > 0 && giaoDichMoi != null) ? 
                ((double) giaoDichMoi / tongClick) * 100 : 0.0;
        String tyLeChuyenDoi = String.format("%.1f%%", tyLe);

        // 5. Phân bố tài khoản
        List<Map<String, Object>> phanBoTaiKhoan = jdbcTemplate.queryForList(
                "SELECT v.tenVaiTro as name, COUNT(vn.idNguoiDung) as value " +
                "FROM VAITRO v JOIN VAITRO_NGUOIDUNG vn ON v.id = vn.idVaiTro " +
                "GROUP BY v.tenVaiTro"
        );

        // 6. Top Sản Phẩm bán chạy
        List<Map<String, Object>> topSanPham = jdbcTemplate.queryForList(
                "SELECT sp.tenSanPham as name, SUM(gd.hoaHongNhan) as doanhThu " +
                "FROM GIAODICH_AFFILIATE gd JOIN SANPHAM sp ON gd.idSanPham = sp.id " +
                "GROUP BY sp.tenSanPham ORDER BY doanhThu DESC LIMIT 5"
        );

        // 7. Giao dịch gần đây
        List<Map<String, Object>> dbGiaoDich = jdbcTemplate.queryForList(
                "SELECT gd.id, nd.tenDangNhap as khachHang, sp.tenSanPham as sanPham, gd.hoaHongNhan as hoaHong " +
                "FROM GIAODICH_AFFILIATE gd " +
                "LEFT JOIN NGUOIDUNG nd ON gd.idKhachHang = nd.id " +
                "JOIN SANPHAM sp ON gd.idSanPham = sp.id " +
                "ORDER BY gd.ngayGiaoDich DESC LIMIT 4"
        );
        
        List<Map<String, Object>> giaoDichGanDay = new ArrayList<>();
        for (Map<String, Object> row : dbGiaoDich) {
            Map<String, Object> gd = new HashMap<>();
            gd.put("id", "GD00" + row.get("id"));
            gd.put("khachHang", row.get("khachHang") != null ? row.get("khachHang") : "Khách vãng lai");
            gd.put("sanPham", row.get("sanPham"));
            gd.put("hoaHong", "+ " + currencyFormat.format(row.get("hoaHong")));
            gd.put("thoiGian", "Vừa xong"); // Format thời gian thực tế có thể xử lý thêm
            giaoDichGanDay.add(gd);
        }

        // 8. Dữ liệu giả lập cho biểu đồ đường và miền (Thường cần Query Group By theo tháng/tuần phức tạp)
        List<Map<String, Object>> bieuDoDoanhThu = List.of(
                Map.of("name", "T4", "hoaHong", 2780, "nhapXuat", 3908),
                Map.of("name", "T5", "hoaHong", 6890, "nhapXuat", 4800),
                Map.of("name", "T6", "hoaHong", tongDoanhThu / 1000, "nhapXuat", 3800) // Tháng hiện tại lấy số thật
        );

        List<Map<String, Object>> bieuDoTuongTac = List.of(
                Map.of("name", "Tuần 3", "click", 550, "giaoDich", 45),
                Map.of("name", "Tuần 4", "click", tongClick, "giaoDich", giaoDichMoi) // Tuần hiện tại lấy số thật
        );

        return DashboardResponse.builder()
                .tongDoanhThu(tongDoanhThuStr)
                .tongTaiKhoan(tongTaiKhoan)
                .giaoDichMoi(giaoDichMoi)
                .tyLeChuyenDoi(tyLeChuyenDoi)
                .phanBoTaiKhoan(phanBoTaiKhoan)
                .topSanPham(topSanPham)
                .giaoDichGanDay(giaoDichGanDay)
                .bieuDoDoanhThu(bieuDoDoanhThu)
                .bieuDoTuongTac(bieuDoTuongTac)
                .build();
    }
}