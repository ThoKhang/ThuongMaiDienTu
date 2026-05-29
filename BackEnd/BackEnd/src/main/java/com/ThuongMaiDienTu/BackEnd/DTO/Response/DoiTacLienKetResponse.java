package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDate;
@Data
public class DoiTacLienKetResponse {
    private Integer idNguoiDung;
    private String tenCongTy;
    private String websiteUrl;
    private LocalDate thoiHanHopDong;
    private String trangThaiDuyet;
}
