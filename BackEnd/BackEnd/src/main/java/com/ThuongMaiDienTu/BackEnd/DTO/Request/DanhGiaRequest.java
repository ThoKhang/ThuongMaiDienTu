package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

@Data
public class DanhGiaRequest {
    private Integer idKhachHang;
    private Integer idDoiTac;
    private Byte diemRating;
    private String noiDung;
    private String trangThaiDuyet;
}
