package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

@Data
public class TheoDoiClickRequest {
    private Integer idSanPham;
    private Integer idKhachHang;
    private String diaChiIP;
    private String trinhDuyetFingerprint;
    private Boolean isHopLe;
}