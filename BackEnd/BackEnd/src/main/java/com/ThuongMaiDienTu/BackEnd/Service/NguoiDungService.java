package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import java.util.List;

public interface NguoiDungService {
    List<NguoiDungResponse> layDanhSachNguoiDung();
    boolean thayDoiTrangThaiTaiKhoan(Integer id);
}