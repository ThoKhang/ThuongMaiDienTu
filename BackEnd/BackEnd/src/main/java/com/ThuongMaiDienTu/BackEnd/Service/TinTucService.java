package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TinTucService {
    List<TinTucResponse> getTinTucMoiNhat();
    Page<TinTucResponse> getTinTucPhanTrang(int page);
    List<TinTucResponse> getAllTinTuc();
    TinTucResponse getTinTucById(Integer id);
}