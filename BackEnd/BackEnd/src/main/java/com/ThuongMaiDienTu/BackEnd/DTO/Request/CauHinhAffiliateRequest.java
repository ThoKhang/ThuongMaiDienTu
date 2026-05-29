package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CauHinhAffiliateRequest {
    private Integer idAdmin;
    private Integer idDoiTac;
    private BigDecimal phanTramHoaHong;
    private BigDecimal phiMoiClick;
    private String ghiChu;
}
