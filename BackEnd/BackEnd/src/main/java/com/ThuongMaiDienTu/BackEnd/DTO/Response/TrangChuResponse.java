package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Data;
import java.util.List;

@Data
public class TrangChuResponse {
    private List<SanPhamResponse> sanPhamNoiBat;
    private List<TinTucResponse> tinTucMoiNhat;
    private List<DanhMucResponse> danhMucList;
    private List<ThuongHieuResponse> thuongHieuList;
    private List<SanPhamResponse> tatCaSanPham;
    private int tongSoTrang;
    private int trangHienTai;
    private long tongSoSanPham;
}