package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuongHieuResponse;
import java.util.List;

public interface ThuongHieuService {
    List<ThuongHieuResponse> getAllThuongHieu();
}