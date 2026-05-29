package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "CAUHINH_AFFILIATE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CauHinhAffiliateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "idAdmin", nullable = false)
    private Integer idAdmin;
    @Column(name = "idDoiTac", nullable = false)
    private Integer idDoiTac;
    @Column(name = "phanTramHoaHong")
    private BigDecimal phanTramHoaHong;
    @Column(name = "phiMoiClick")
    private BigDecimal phiMoiClick;
    @Column(name = "ngayCapNhat", insertable = false)
    private LocalDateTime ngayCapNhat;
    @Column(name = "ghiChu", columnDefinition = "NVARCHAR(MAX)")
    private String ghiChu;
}
