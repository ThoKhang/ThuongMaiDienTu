package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TinTucEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.TinTucMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.TinTucRepository;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TinTucServiceImpl implements TinTucService {

    private final TinTucRepository tinTucRepository;
    private final TinTucMapper tinTucMapper;

    @Override
    public List<TinTucResponse> getTinTucMoiNhat() {
        // CẬP NHẬT: Chỉ lấy những tin có trạng thái "DaDuyet"
        return tinTucRepository.findTop5ByTrangThaiDuyetOrderByNgayDangDesc("DaDuyet")
                .stream()
                .map(tinTucMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<TinTucResponse> getTinTucPhanTrang(int page) {
        PageRequest pageable = PageRequest.of(page, 5); // Đã bỏ Sort.by ở đây vì tên hàm Repository đã tự Sort rồi

        // CẬP NHẬT: Chỉ lấy những tin có trạng thái "DaDuyet"
        return tinTucRepository.findByTrangThaiDuyetOrderByNgayDangDesc("DaDuyet", pageable)
                .map(tinTucMapper::toResponse);
    }

    @Override
    public List<TinTucResponse> getAllTinTuc() {
        // Hàm này giữ nguyên để Admin lấy toàn bộ (cả Chờ duyệt và Đã duyệt) trong bảng quản lý
        return tinTucRepository.findAll()
                .stream()
                .map(tinTucMapper::toResponse)
                .toList();
    }

    @Override
    public TinTucResponse getTinTucById(Integer id) {
        TinTucEntity tin = tinTucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tin tức với ID: " + id));

        return tinTucMapper.toResponse(tin);
    }

    @Override
    public boolean luuTinTucMoi(Integer idNguoiDang, String tieuDe, String noiDung, String hinhAnh) {
        try {
            TinTucEntity tinTuc = new TinTucEntity();
            tinTuc.setIdNguoiDang(idNguoiDang);
            tinTuc.setTieuDe(tieuDe);
            tinTuc.setNoiDung(noiDung);
            tinTuc.setHinhAnh(hinhAnh);
            tinTuc.setNgayDang(LocalDateTime.now());
            
            // MẶC ĐỊNH: Bất cứ ai đăng tin (kể cả Admin) cũng chuyển vào trạng thái Chờ Duyệt
            tinTuc.setTrangThaiDuyet("ChoDuyet"); 
            
            tinTucRepository.save(tinTuc);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean capNhatTrangThaiDuyet(Integer id, String trangThai) {
        TinTucEntity tinTuc = tinTucRepository.findById(id).orElse(null);
        if (tinTuc != null) {
            tinTuc.setTrangThaiDuyet(trangThai);
            tinTucRepository.save(tinTuc);
            return true;
        }
        return false;
    }
    // Trong TinTucServiceImpl
    @Override
    public List<TinTucResponse> getTinTucByNguoiDang(Integer idNguoiDang) {
        return tinTucRepository.findByIdNguoiDangOrderByNgayDangDesc(idNguoiDang)
                .stream()
                .map(tinTucMapper::toResponse)
                .toList();
    }

    @Override
    public boolean capNhatTinTuc(Integer idTinTuc, Integer idNguoiDang, String tieuDe, String noiDung, String hinhAnhMoi) {
        TinTucEntity tinTuc = tinTucRepository.findById(idTinTuc).orElse(null);
        // Chỉ cho phép sửa nếu đúng là người đăng đó
        if (tinTuc != null && tinTuc.getIdNguoiDang().equals(idNguoiDang)) {
            tinTuc.setTieuDe(tieuDe);
            tinTuc.setNoiDung(noiDung);
            if (hinhAnhMoi != null) {
                tinTuc.setHinhAnh(hinhAnhMoi);
            }
            // Sửa xong tự động quay về trạng thái Chờ duyệt
            tinTuc.setTrangThaiDuyet("ChoDuyet"); 
            tinTucRepository.save(tinTuc);
            return true;
        }
        return false;
    }
}