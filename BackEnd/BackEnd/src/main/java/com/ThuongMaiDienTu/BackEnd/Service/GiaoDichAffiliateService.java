package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaoDichAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichAffiliateResponse;

import java.util.List;

public interface GiaoDichAffiliateService {
    GiaoDichAffiliateResponse createGiaoDich(GiaoDichAffiliateRequest request);
    List<GiaoDichAffiliateResponse> getGiaoDichByIdDoiTac(Integer idDoiTac);
    List<GiaoDichAffiliateResponse> getAllGiaoDich();
    GiaoDichAffiliateResponse updateTrangThaiGiaoDich(Integer id, String trangThai);
}
