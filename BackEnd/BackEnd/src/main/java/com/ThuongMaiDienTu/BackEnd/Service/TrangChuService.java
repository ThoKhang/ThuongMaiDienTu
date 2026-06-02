package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TrangChuResponse;

public interface TrangChuService {
    //TrangChuResponse getTrangChu();
    TrangChuResponse getTrangChu(int page);
}