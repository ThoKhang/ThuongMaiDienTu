package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardResponse {
    private String tongDoanhThu;
    private Long tongTaiKhoan;
    private Long giaoDichMoi;
    private String tyLeChuyenDoi;
    
    private List<Map<String, Object>> bieuDoDoanhThu;
    private List<Map<String, Object>> phanBoTaiKhoan;
    private List<Map<String, Object>> topSanPham;
    private List<Map<String, Object>> bieuDoTuongTac;
    private List<Map<String, Object>> giaoDichGanDay;
}