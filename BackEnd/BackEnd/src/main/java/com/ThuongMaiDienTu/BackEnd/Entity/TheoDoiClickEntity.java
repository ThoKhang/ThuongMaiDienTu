package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "THEODOI_CLICK")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TheoDoiClickEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Lưu ý BIGINT map sang Long
    @Column(name = "idSanPham", nullable = false)
    private Integer idSanPham;
    @Column(name = "idKhachHang")
    private Integer idKhachHang;
    @Column(name = "thoiGianClick", insertable = false)
    private LocalDateTime thoiGianClick;
    @Column(name = "diaChiIP", length = 50)
    private String diaChiIP;
    @Column(name = "trinhDuyetFingerprint", length = 500)
    private String trinhDuyetFingerprint;
    @Column(name = "isHopLe")
    private Boolean isHopLe; // BIT map sang Boolean
}
