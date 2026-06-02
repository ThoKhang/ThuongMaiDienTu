package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacResponse;
import java.util.List;

public interface DoiTacService {
    List<DoiTacResponse> getAllDoiTac();
    boolean capNhatCauHinh(Integer id, Double tyLeMoi, String trangThaiMoi);
}