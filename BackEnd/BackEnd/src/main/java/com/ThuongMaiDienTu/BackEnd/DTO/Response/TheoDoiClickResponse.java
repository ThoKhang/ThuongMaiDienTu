package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TheoDoiClickResponse {
    private Long id;
    private Integer idSanPham;
    private Integer idKhachHang;
    private LocalDateTime thoiGianClick;
    private String diaChiIP;
    private String trinhDuyetFingerprint;
    private Boolean isHopLe;
}
