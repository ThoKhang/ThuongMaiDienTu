package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class KhachHangRequest {
    private Integer idNguoiDung;
    private String tenDangNhap;
    private String hoTen;
    private Integer diemThuong;
    private LocalDate ngaySinh;
    private String soDienThoai;
}
