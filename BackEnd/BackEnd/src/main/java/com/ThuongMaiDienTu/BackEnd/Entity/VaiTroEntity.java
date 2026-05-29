package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "VAITRO")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class VaiTroEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenVaiTro", nullable = false, unique = true, length = 50)
    private String tenVaiTro;

    @Column(name = "moTa", length = 255)
    private String moTa;
}
