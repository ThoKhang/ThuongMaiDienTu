package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDateTime;
import lombok.Builder;

@Data
@Builder
public class TinTucResponse {
    private Integer id;
    private Integer idNguoiDang;
    private String tieuDe;
    private String noiDung;
    private LocalDateTime ngayDang;
    private String hinhAnh;
    private String trangThaiDuyet;
    private String loaiNguoiDang; // "Admin", "KhachHang", "DoiTac"
}