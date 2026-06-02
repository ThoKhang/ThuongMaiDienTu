package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TinTucService {
    List<TinTucResponse> getTinTucMoiNhat();
    Page<TinTucResponse> getTinTucPhanTrang(int page);
    List<TinTucResponse> getAllTinTuc();
    TinTucResponse getTinTucById(Integer id);
    boolean luuTinTucMoi(Integer idNguoiDang, String tieuDe, String noiDung, String hinhAnh);
    
    // Thêm hàm duyệt tin tức cho Admin
    boolean capNhatTrangThaiDuyet(Integer id, String trangThai);
    List<TinTucResponse> getTinTucByNguoiDang(Integer idNguoiDang);
    boolean capNhatTinTuc(Integer idTinTuc, Integer idNguoiDang, String tieuDe, String noiDung, String hinhAnh);
}