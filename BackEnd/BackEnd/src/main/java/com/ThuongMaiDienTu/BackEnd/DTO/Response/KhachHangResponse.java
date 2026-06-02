package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDate;
@Data
public class KhachHangResponse {
    private Integer idNguoiDung;
    private String hoTen;
    private Integer diemThuong;
}
