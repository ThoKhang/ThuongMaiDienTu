package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NguoiDungRequest {
    private String tenDangNhap;
    private String matKhau;
    private String email;
    private String trangThai;
    private LocalDate ngaySinh;
    private String soDienThoai;
}
