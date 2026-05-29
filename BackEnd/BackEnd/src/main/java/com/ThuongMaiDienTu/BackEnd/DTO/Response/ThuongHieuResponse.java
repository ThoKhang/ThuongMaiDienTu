package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;

@Data
public class ThuongHieuResponse {
    private Integer id;
    private String tenThuongHieu;
    private String quocGia;
    private String logoUrl;
}
