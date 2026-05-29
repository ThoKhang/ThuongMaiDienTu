package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "VAITRO_NGUOIDUNG")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VaiTroNguoiDungEntity {
    @EmbeddedId
    private VaiTroNguoiDungId id;
    @Column(name = "ngayCapQuyen", insertable = false, updatable = false)
    private LocalDateTime ngayCapQuyen;
}
