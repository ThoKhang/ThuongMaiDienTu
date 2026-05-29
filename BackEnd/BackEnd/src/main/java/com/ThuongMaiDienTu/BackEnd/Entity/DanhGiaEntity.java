package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "DANHGIA")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DanhGiaEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "idKhachHang", nullable = false)
    private Integer idKhachHang;

    @Column(name = "idDoiTac", nullable = false)
    private Integer idDoiTac;

    @Column(name = "diemRating")
    private Byte diemRating; // TINYINT map sang Byte

    @Column(name = "noiDung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @Column(name = "trangThaiDuyet", length = 20)
    private TinhTrangDuyet trangThaiDuyet;
}
