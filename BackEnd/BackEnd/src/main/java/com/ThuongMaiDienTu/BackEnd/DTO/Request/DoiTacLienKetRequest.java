package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;
import java.time.LocalDate;
@Data
public class DoiTacLienKetRequest {
    private Integer idNguoiDung;
    private String tenCongTy;
    private String websiteUrl;
    private LocalDate thoiHanHopDong;
    private String trangThaiDuyet;
}
