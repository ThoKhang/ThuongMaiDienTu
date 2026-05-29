package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiGiaoDich;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "GIAODICH_AFFILIATE")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class GiaoDichAffiliateEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "idClick", nullable = false)
    private Long idClick; // Tham chiếu sang TheoDoiClick (Long)
    @Column(name = "idKhachHang")
    private Integer idKhachHang;
    @Column(name = "idDoiTac", nullable = false)
    private Integer idDoiTac;
    @Column(name = "idSanPham", nullable = false)
    private Integer idSanPham;
    @Column(name = "soLuong")
    private Integer soLuong;
    @Column(name = "tongGiaTri", nullable = false)
    private BigDecimal tongGiaTri;
    @Column(name = "hoaHongNhan", nullable = false)
    private BigDecimal hoaHongNhan;
    @Column(name = "phuongThucTT", nullable = false, length = 50)
    private String phuongThucTT;
    @Column(name = "trangThaiXacThuc", length = 50)
    private TrangThaiGiaoDich trangThaiXacThuc;
    @Column(name = "ngayGiaoDich", insertable = false)
    private LocalDateTime ngayGiaoDich;
}
