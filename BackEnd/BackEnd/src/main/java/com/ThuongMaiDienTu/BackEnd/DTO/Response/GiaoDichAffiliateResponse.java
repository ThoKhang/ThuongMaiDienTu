package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class GiaoDichAffiliateResponse {
    private Integer id;
    private Long idClick;
    private Integer idKhachHang;
    private Integer idDoiTac;
    private Integer idSanPham;
    private Integer soLuong;
    private BigDecimal tongGiaTri;
    private BigDecimal hoaHongNhan;
    private String phuongThucTT;
    private String trangThaiXacThuc;
    private LocalDateTime ngayGiaoDich;
}
