package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GiaoDichAffiliateRequest {
    private Long idClick;
    private Integer idKhachHang;
    private Integer idDoiTac;
    private Integer idSanPham;
    private Integer soLuong;
    private BigDecimal tongGiaTri;
    private BigDecimal hoaHongNhan;
    private String phuongThucTT;
    private String trangThaiXacThuc;
}
