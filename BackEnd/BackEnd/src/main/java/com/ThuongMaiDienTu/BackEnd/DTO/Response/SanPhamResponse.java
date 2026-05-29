package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class SanPhamResponse {
    private Integer id;
    private Integer idDanhMuc;
    private Integer idThuongHieu;
    private String tenSanPham;
    private String thongSoKyThuat;
    private BigDecimal giaNiemYet;
    private BigDecimal giaKhuyenMai;
    private Integer soLuongTon;
    private String urlAffiliate;
    private String tinhTrangDuyet;
}