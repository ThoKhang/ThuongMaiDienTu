package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TinTucResponse {
    private Integer id;
    private Integer idAdmin;
    private String tieuDe;
    private String noiDung;
    private LocalDateTime ngayDang;
}
