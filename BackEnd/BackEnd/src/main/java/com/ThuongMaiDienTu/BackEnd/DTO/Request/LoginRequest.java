package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;

@Data
public class LoginRequest {
    private String tenDangNhap;
    private String matKhau;
}