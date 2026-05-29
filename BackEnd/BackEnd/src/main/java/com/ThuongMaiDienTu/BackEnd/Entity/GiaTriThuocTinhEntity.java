package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "GIATRI_THUOCTINH")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GiaTriThuocTinhEntity {
    @EmbeddedId
    private GiaTriThuocTinhId id;
    @Column(name = "giaTri", nullable = false, length = 255)
    private String giaTri;
}
