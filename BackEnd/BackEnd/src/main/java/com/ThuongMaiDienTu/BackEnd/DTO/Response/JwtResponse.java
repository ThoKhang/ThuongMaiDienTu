package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Integer id;
    private String tenDangNhap;
    private List<String> roles;
}