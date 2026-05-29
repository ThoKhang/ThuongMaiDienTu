package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;

@Data
public class GiaTriThuocTinhResponse {
    private Integer idSanPham;
    private Integer idThuocTinh;
    private String giaTri;
}
