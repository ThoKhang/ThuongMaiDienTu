package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacResponse;
import com.ThuongMaiDienTu.BackEnd.Service.DoiTacService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DoiTacServiceImpl implements DoiTacService {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<DoiTacResponse> getAllDoiTac() {
        String sql = "SELECT dt.idNguoiDung as id, dt.tenCongTy as tenDoiTac, nd.email, nd.soDienThoai, " +
                     "COALESCE(ch.phanTramHoaHong, 0) as tyLeHoaHong, dt.websiteUrl as apiEndpoint, " +
                     "dt.trangThaiDuyet as trangThai, nd.ngayTao as ngayHopTac, " +
                     "COUNT(gd.id) as tongSoDon, SUM(gd.hoaHongNhan) as tongHoaHong " +
                     "FROM DOITACLIENKET dt " +
                     "JOIN NGUOIDUNG nd ON dt.idNguoiDung = nd.id " +
                     "LEFT JOIN CAUHINH_AFFILIATE ch ON dt.idNguoiDung = ch.idDoiTac " +
                     "LEFT JOIN GIAODICH_AFFILIATE gd ON dt.idNguoiDung = gd.idDoiTac " +
                     "GROUP BY dt.idNguoiDung, dt.tenCongTy, nd.email, nd.soDienThoai, " +
                     "ch.phanTramHoaHong, dt.websiteUrl, dt.trangThaiDuyet, nd.ngayTao " +
                     "ORDER BY dt.idNguoiDung DESC";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        List<DoiTacResponse> result = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        for (Map<String, Object> row : rows) {
            Double hoaHong = row.get("tongHoaHong") != null ? ((Number) row.get("tongHoaHong")).doubleValue() : 0.0;
            Double tyLeHoaHong = row.get("tyLeHoaHong") != null ? ((Number) row.get("tyLeHoaHong")).doubleValue() : 0.0;

            // Xử lý an toàn định dạng ngày tháng tương tự như file Giao Dịch
            String formattedDate = "";
            Object rawDate = row.get("ngayHopTac");
            if (rawDate != null) {
                if (rawDate instanceof java.util.Date) {
                    formattedDate = sdf.format((java.util.Date) rawDate);
                } else if (rawDate instanceof java.time.LocalDateTime) {
                    java.util.Date out = java.util.Date.from(((java.time.LocalDateTime) rawDate).atZone(java.time.ZoneId.systemDefault()).toInstant());
                    formattedDate = sdf.format(out);
                } else {
                    formattedDate = rawDate.toString();
                }
            }

            result.add(DoiTacResponse.builder()
                    .id((Integer) row.get("id"))
                    .tenDoiTac((String) row.get("tenDoiTac"))
                    .email((String) row.get("email"))
                    .soDienThoai((String) row.get("soDienThoai"))
                    .tyLeHoaHong(tyLeHoaHong)
                    .apiEndpoint((String) row.get("apiEndpoint"))
                    .trangThai((String) row.get("trangThai"))
                    .ngayHopTac(formattedDate)
                    .tongSoDonHang(((Number) row.get("tongSoDon")).longValue())
                    .tongHoaHongTichLuy(hoaHong)
                    .build());
        }
        return result;
    }

    @Override
    public boolean capNhatCauHinh(Integer id, Double tyLeMoi, String trangThaiMoi) {
        // Cập nhật trạng thái duyệt ở bảng DOITACLIENKET
        String sqlUpdateDoiTac = "UPDATE DOITACLIENKET SET trangThaiDuyet = ? WHERE idNguoiDung = ?";
        jdbcTemplate.update(sqlUpdateDoiTac, trangThaiMoi, id);

        String sqlUpdateCauHinh = "INSERT INTO CAUHINH_AFFILIATE (idAdmin, idDoiTac, phanTramHoaHong, ngayCapNhat) " +
                                  "VALUES (1, ?, ?, CURRENT_TIMESTAMP) " + 
                                  "ON DUPLICATE KEY UPDATE phanTramHoaHong = ?, ngayCapNhat = CURRENT_TIMESTAMP";
        
        int updated = jdbcTemplate.update(sqlUpdateCauHinh, id, tyLeMoi, tyLeMoi);
        
        return true;
    }
}