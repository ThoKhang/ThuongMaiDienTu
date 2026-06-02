package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "SANPHAM")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SanPhamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "idDanhMuc", nullable = false)
    private Integer idDanhMuc;
    @Column(name = "idDoiTac", nullable = false)
    private Integer idDoiTac;
    @Column(name = "idThuongHieu", nullable = false)
    private Integer idThuongHieu;
    @Column(name = "tenSanPham", nullable = false, length = 200)
    private String tenSanPham;
    @Column(name = "url", length = 500)
    private String url;
    @Column(name = "moTa", columnDefinition = "TEXT")
    private String moTa;
    @Column(name = "thongSoKyThuat", columnDefinition = "NVARCHAR(MAX)")
    private String thongSoKyThuat;
    @Column(name = "giaNiemYet", nullable = false)
    private BigDecimal giaNiemYet;
    @Column(name = "giaKhuyenMai")
    private BigDecimal giaKhuyenMai;
    @Column(name = "soLuongTon")
    private Integer soLuongTon;
    @Column(name = "urlAffiliate", nullable = false, length = 500)
    private String urlAffiliate;
    @Column(name = "tinhTrangDuyet", length = 20)
    private TinhTrangDuyet tinhTrangDuyet;
}
