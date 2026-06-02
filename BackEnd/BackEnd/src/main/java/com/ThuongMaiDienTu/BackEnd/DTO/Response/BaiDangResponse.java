package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaiDangResponse {
    private Integer id;
    private String tieuDe;
    private Integer idSanPham;
    private Integer idNguoiDang;
    private Integer idDoiTac;
    private BigDecimal giaBan;
    private String moTaTinhTrang;
    private String diaChiGiaoDich;
    private String trangThaiDuyet;
    private Integer idAdminDuyet;
    private LocalDateTime ngayDang;
    private LocalDateTime ngayDuyet;
    private Integer luotXem;
    private List<HinhAnhResponse> hinhAnhThucTe; // Trả về kèm list ảnh để chạy Slide/Carousel ngoài UI
}