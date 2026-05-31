package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "NGUOIDUNG")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenDangNhap", nullable = false, unique = true)
    private String tenDangNhap;

    @Column(name = "matKhau", nullable = false)
    private String matKhau;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "trangThai")
    private String trangThai = "HoatDong";

    @Column(name = "ngayTao")
    private Date ngayTao = new Date();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "VAITRO_NGUOIDUNG",
        joinColumns = @JoinColumn(name = "idNguoiDung"),
        inverseJoinColumns = @JoinColumn(name = "idVaiTro")
    )
    private Set<VaiTroEntity> vaiTros = new HashSet<>(); 
}