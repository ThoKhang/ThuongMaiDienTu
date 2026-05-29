package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CauHinhAffiliateResponse {
    private Integer id;
    private Integer idAdmin;
    private Integer idDoiTac;
    private BigDecimal phanTramHoaHong;
    private BigDecimal phiMoiClick;
    private LocalDateTime ngayCapNhat;
    private String ghiChu;
}
