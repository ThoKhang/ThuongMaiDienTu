package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichResponse;
import java.util.List;

public interface GiaoDichService {
    List<GiaoDichResponse> getAllGiaoDich();
    boolean capNhatTrangThai(Integer id, String trangThaiMoi);
}