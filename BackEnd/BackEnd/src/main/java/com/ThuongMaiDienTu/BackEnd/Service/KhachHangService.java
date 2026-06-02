package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;

public interface KhachHangService {
    KhachHangResponse createKhachHang(KhachHangRequest request);
}
