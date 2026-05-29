package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Embeddable
@Data @NoArgsConstructor @AllArgsConstructor
public class VaiTroNguoiDungId implements Serializable {
    private Integer idNguoiDung;
    private Integer idVaiTro;
}
