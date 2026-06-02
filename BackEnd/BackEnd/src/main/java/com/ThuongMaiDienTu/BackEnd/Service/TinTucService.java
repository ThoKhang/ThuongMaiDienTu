package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import java.util.List;

public interface TinTucService {
    List<TinTucResponse> getTinTucMoiNhat();
}