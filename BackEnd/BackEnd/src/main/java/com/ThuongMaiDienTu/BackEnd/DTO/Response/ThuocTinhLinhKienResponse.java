package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;

@Data
public class ThuocTinhLinhKienResponse {
    private Integer id;
    private String tenThuocTinh;
    private Integer idDanhMuc;
}
