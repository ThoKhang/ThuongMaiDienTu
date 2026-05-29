package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "DANHMUC")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DanhMucEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "tenDanhMuc", nullable = false, unique = true, length = 150)
    private String tenDanhMuc;
    @Column(name = "moTa", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;
}
