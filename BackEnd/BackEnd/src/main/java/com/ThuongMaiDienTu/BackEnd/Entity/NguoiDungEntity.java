package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "NGUOIDUNG")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class NguoiDungEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "tenDangNhap", nullable = false, unique = true, length = 100)
    private String tenDangNhap;
    @Column(name = "matKhau", nullable = false, length = 255)
    private String matKhau;
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;
    @Column(name = "trangThai", length = 20)
    private TrangThaiNguoiDung trangThai;
    @Column(name = "ngayTao", insertable = false, updatable = false)
    private LocalDateTime ngayTao;
}
