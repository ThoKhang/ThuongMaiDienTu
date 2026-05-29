package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "THUONGHIEU")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ThuongHieuEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "tenThuongHieu", nullable = false, unique = true, length = 100)
    private String tenThuongHieu;
    @Column(name = "quocGia", length = 100)
    private String quocGia;
    @Column(name = "logoUrl", length = 500)
    private String logoUrl;
}
