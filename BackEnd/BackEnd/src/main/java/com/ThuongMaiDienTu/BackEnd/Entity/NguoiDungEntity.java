package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    private TrangThaiNguoiDung trangThai;

    @Column(name = "ngayTao")
    private Date ngayTao = new Date();
    @Column(name = "ngaySinh")
    private LocalDate ngaySinh;
    @Column(name = "soDienThoai", length = 15)
    private String soDienThoai;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "VAITRO_NGUOIDUNG",
        joinColumns = @JoinColumn(name = "idNguoiDung"),
        inverseJoinColumns = @JoinColumn(name = "idVaiTro")
    )
    private Set<VaiTroEntity> vaiTros = new HashSet<>();
    @PrePersist
    protected void onCreate() {
        if (this.trangThai == null) {
            this.trangThai = TrangThaiNguoiDung.HOAT_DONG;
        }
    }
}