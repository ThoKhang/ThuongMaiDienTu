package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDateTime;
@Data
public class NguoiDungResponse {
    private Integer id;
    private String tenDangNhap;
    private String email;
    private String trangThai;
    private LocalDateTime ngayTao;
}
