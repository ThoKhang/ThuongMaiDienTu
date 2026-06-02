package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "VAITRO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VaiTroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenVaiTro", nullable = false, unique = true)
    private String tenVaiTro;

    @Column(name = "moTa")
    private String moTa;
}