package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;

@Data
public class DanhGiaResponse {
    private Integer id;
    private Integer idKhachHang;
    private Integer idDoiTac;
    private Byte diemRating;
    private String noiDung;
    private String trangThaiDuyet;
}
