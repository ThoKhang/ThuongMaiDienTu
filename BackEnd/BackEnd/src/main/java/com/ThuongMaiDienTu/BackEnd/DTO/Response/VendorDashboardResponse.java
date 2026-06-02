package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorDashboardResponse {
    // Stat Cards
    private Long tongLuotClick;
    private Long tongGiaoDich;
    private String tongHoaHong;
    private String tyLeChuyenDoi;

    // Phân bổ trạng thái tin đăng
    private Long soTinDangDaDuyet;
    private Long soTinDangChoDuyet;
    private Long soTinDangDaAn;
    private Long soTinDangTuChoi;

    // Top sản phẩm được click nhiều nhất
    private List<Map<String, Object>> topSanPhamClick;

    // Lượt click theo 7 ngày gần nhất
    private List<Map<String, Object>> clickTheo7Ngay;

    // Giao dịch hoa hồng gần đây
    private List<Map<String, Object>> giaoDichGanDay;
}
