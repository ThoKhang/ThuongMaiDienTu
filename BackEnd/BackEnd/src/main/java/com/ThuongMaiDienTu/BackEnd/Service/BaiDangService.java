package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.BaiDangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.BaiDangResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BaiDangService {
    List<BaiDangResponse> getAllBaiDang();
    BaiDangResponse getBaiDangById(Integer id);
    BaiDangResponse createBaiDang(BaiDangRequest request);
    Page<BaiDangResponse> getBaiDangPhanTrang(int page, int size);
    boolean duyetBaiDang(Integer idBaiDang, Integer idAdmin, String trangThaiMoi);
}