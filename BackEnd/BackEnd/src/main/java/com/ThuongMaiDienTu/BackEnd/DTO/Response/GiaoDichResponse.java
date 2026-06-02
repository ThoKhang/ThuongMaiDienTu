package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GiaoDichResponse {
    private Integer id;
    private String maGiaoDich;
    private String khachHang; // Nếu null thì là "Khách vãng lai"
    private String doiTac;
    private String sanPham;
    private Integer soLuong;
    private Double tongGiaTri;
    private Double hoaHong;
    private String phuongThucTT;
    private String trangThaiXacThuc;
    private String ngayGiaoDich;
    
    // Thông tin truy vết gian lận
    private Long idClick;
    private String ipClick;
}