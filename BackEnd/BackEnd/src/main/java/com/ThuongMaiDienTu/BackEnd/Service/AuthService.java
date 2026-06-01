package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DoiTacLienKetRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Request.NguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacLienKetResponse;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;

public interface AuthService {
    String nguoiDungRegister(NguoiDungRequest nguoiDungRequest);
    DoiTacLienKetResponse doiTacRegister(DoiTacLienKetRequest doiTacLienKetRequest);
}
