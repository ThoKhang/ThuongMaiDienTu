package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamResponse {
    private Integer id;
    private Integer idDanhMuc;
    private Integer idThuongHieu;
    private String tenSanPham;
    private String url;
    private String moTa;
    private String thongSoKyThuat;
    private BigDecimal giaNiemYet;
    private BigDecimal giaKhuyenMai;
    private Integer soLuongTon;
    private String urlAffiliate;
    private String tinhTrangDuyet;
}