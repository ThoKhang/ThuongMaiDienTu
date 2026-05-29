package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class SanPhamRequest {
    private Integer idDanhMuc;
    private Integer idDoiTac;
    private Integer idThuongHieu;
    private String tenSanPham;
    private String thongSoKyThuat;
    private BigDecimal giaNiemYet;
    private BigDecimal giaKhuyenMai;
    private Integer soLuongTon;
    private String urlAffiliate;
}
