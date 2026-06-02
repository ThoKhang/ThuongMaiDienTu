package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhMucResponse;
import java.util.List;

public interface DanhMucService {
    List<DanhMucResponse> getAllDanhMuc();
}