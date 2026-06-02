package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;

@Data
public class HinhAnhResponse {
    private Integer id;
    private String urlHinhAnh;
    private Boolean isDaiDien;
}