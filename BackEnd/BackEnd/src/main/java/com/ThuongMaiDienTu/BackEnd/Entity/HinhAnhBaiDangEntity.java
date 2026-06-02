package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "HINHANH_BAIDANG")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HinhAnhBaiDangEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "idBaiDang", nullable = false)
    private Integer idBaiDang;

    @Column(name = "urlHinhAnh", nullable = false, length = 500)
    private String urlHinhAnh;

    @Column(name = "isDaiDien")
    private Boolean isDaiDien;
}