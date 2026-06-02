package com.ThuongMaiDienTu.BackEnd.DTO.Request;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class BaiDangRequest {
    private String tieuDe;
    private Integer idSanPham;
    private Integer idNguoiDang;
    private Integer idDoiTac;
    private BigDecimal giaBan;
    private String moTaTinhTrang;
    private String diaChiGiaoDich;
    private String trangThaiDuyet;
    private List<HinhAnhRequest> hinhAnhThucTe; // Hỗ trợ nhận nhiều ảnh khi submit form Đăng tin
}