package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "THUOCTINH_LINHKIEN")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ThuocTinhLinhKienEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenThuocTinh", nullable = false, length = 100)
    private String tenThuocTinh;

    @Column(name = "idDanhMuc", nullable = false)
    private Integer idDanhMuc;
}
