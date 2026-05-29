package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

@Data
public class GiaTriThuocTinhRequest {
    private Integer idSanPham;
    private Integer idThuocTinh;
    private String giaTri;
}
