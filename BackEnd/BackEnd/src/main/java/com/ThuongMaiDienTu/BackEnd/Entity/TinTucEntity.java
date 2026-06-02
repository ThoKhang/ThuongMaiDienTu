package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TINTUC")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TinTucEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "idNguoiDang") // Sửa ở đây
    private Integer idNguoiDang;

    @Column(name = "tieuDe", nullable = false, length = 300)
    private String tieuDe;

    @Column(name = "noiDung", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @Column(name = "ngayDang", insertable = false, updatable = false)
    private LocalDateTime ngayDang;
    
    @Column(name = "hinhAnh")
    private String hinhAnh;
    
    private String trangThaiDuyet;
}
