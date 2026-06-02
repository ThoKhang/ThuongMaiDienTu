package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "BAIDANG")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaiDangEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tieuDe", nullable = false, length = 250)
    private String tieuDe;

    @Column(name = "idSanPham", nullable = false)
    private Integer idSanPham;

    @Column(name = "idNguoiDang", nullable = false)
    private Integer idNguoiDang;

    @Column(name = "idDoiTac", nullable = false)
    private Integer idDoiTac;

    @Column(name = "giaBan", nullable = false)
    private BigDecimal giaBan;

    @Column(name = "moTaTinhTrang", columnDefinition = "TEXT")
    private String moTaTinhTrang;

    @Column(name = "diaChiGiaoDich", length = 255)
    private String diaChiGiaoDich;

    @Column(name = "trangThaiDuyet", length = 30)
    @Enumerated(EnumType.STRING) // Giúp map mượt mà với cấu trúc Enum String của bạn
    private TinhTrangDuyet trangThaiDuyet;

    @Column(name = "idAdminDuyet")
    private Integer idAdminDuyet;

    @Column(name = "ngayDang")
    private LocalDateTime ngayDang;

    @Column(name = "ngayDuyet")
    private LocalDateTime ngayDuyet;

    @Column(name = "luotXem")
    private Integer luotXem;

    // Định nghĩa mối quan hệ một bài đăng có nhiều hình ảnh thực tế
    @OneToMany(mappedBy = "idBaiDang", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HinhAnhBaiDangEntity> hinhAnhThucTe;

    @PrePersist
    protected void onCreate() {
        if (this.ngayDang == null) this.ngayDang = LocalDateTime.now();
        if (this.luotXem == null) this.luotXem = 0;
        if (this.trangThaiDuyet == null) this.trangThaiDuyet = TinhTrangDuyet.CHO_DUYET;
    }
}