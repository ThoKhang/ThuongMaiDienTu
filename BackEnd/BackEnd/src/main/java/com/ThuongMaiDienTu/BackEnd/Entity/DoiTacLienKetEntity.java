package com.ThuongMaiDienTu.BackEnd.Entity;

import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "DOITACLIENKET")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DoiTacLienKetEntity {
    @Id
    @Column(name = "idNguoiDung")
    private Integer idNguoiDung;
    @Column(name = "tenCongTy", nullable = false, length = 200)
    private String tenCongTy;
    @Column(name = "websiteUrl", length = 300)
    private String websiteUrl;
    @Column(name = "thoiHanHopDong")
    private LocalDate thoiHanHopDong;
    @Column(name = "trangThaiDuyet", length = 20)
    private TinhTrangDuyet trangThaiDuyet;
}
