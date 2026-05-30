package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class NguoiDungResponse {
    private Integer id;
    private String tenDangNhap;
    private String email;
    private String trangThai;
    private Date ngayTao;
    private List<String> vaiTros;
}