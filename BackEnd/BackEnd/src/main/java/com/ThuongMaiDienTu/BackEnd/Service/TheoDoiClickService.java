package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TheoDoiClickRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TheoDoiClickResponse;

public interface TheoDoiClickService {
    TheoDoiClickResponse createTheoDoiClick(TheoDoiClickRequest request);
    long countClicksBySanPham(Integer idSanPham);
}
