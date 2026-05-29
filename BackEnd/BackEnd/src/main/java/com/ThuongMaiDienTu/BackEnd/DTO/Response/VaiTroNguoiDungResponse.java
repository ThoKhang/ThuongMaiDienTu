package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VaiTroNguoiDungResponse {
    private Integer idNguoiDung;
    private Integer idVaiTro;
    private LocalDateTime ngayCapQuyen;
}
