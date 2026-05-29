package com.ThuongMaiDienTu.BackEnd.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Data @NoArgsConstructor @AllArgsConstructor
public class GiaTriThuocTinhId implements Serializable {
    private Integer idSanPham;
    private Integer idThuocTinh;
}
