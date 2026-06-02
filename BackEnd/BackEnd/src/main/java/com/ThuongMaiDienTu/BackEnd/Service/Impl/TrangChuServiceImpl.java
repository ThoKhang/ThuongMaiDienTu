package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TrangChuResponse;
import com.ThuongMaiDienTu.BackEnd.Service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrangChuServiceImpl implements TrangChuService {

    private final TinTucService tinTucService;
    private final SanPhamService sanPhamService;
    private final DanhMucService danhMucService;
    private final ThuongHieuService thuongHieuService;

    @Override
    public TrangChuResponse getTrangChu(int page) {
        Page<SanPhamResponse> sanPhamPage = sanPhamService.getSanPhamPhanTrang(page);

        TrangChuResponse response = new TrangChuResponse();
        response.setSanPhamNoiBat(sanPhamService.getSanPhamNoiBat());
        response.setTinTucMoiNhat(tinTucService.getTinTucMoiNhat());
        response.setDanhMucList(danhMucService.getAllDanhMuc());
        response.setThuongHieuList(thuongHieuService.getAllThuongHieu());

        // Phân trang
        response.setTatCaSanPham(sanPhamPage.getContent());
        response.setTongSoTrang(sanPhamPage.getTotalPages());
        response.setTrangHienTai(sanPhamPage.getNumber());
        response.setTongSoSanPham(sanPhamPage.getTotalElements());

        return response;
    }
}