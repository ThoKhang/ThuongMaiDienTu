package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "KHACHHANG")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class KhachHangEntity {
    @Id
    @Column(name = "idNguoiDung")
    private Integer idNguoiDung;
    @Column(name = "hoTen", nullable = false, length = 150)
    private String hoTen;
    @Column(name = "diemThuong")
    private Integer diemThuong;
    @Column(name = "ngaySinh")
    private LocalDate ngaySinh;
    @Column(name = "soDienThoai", length = 15)
    private String soDienThoai;
}
