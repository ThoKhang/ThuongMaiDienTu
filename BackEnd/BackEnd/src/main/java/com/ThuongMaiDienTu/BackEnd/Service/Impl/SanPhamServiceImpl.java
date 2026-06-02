package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {

    private final SanPhamRepository sanPhamRepository;
    private final SanPhamMapper sanPhamMapper;

    @Override
    public List<SanPhamResponse> getAllSanPham() {
        return sanPhamMapper.toResponseList(sanPhamRepository.findAll());
    }

    @Override
    public SanPhamResponse getSanPhamById(Integer id) {
        SanPhamEntity sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
        return sanPhamMapper.toResponse(sanPham);
    }

    @Override
    public SanPhamResponse createSanPham(SanPhamRequest request) {
        return sanPhamMapper.toResponse(
            sanPhamRepository.save(sanPhamMapper.toEntity(request))
        );
    }

    @Override
    public List<SanPhamResponse> getSanPhamNoiBat() {
        return sanPhamRepository
            .findSanPhamNoiBat(TinhTrangDuyet.DA_DUYET, PageRequest.of(0, 8))
            .stream()
            .map(sanPhamMapper::toResponse)
            .collect(Collectors.toList());
    }
    @Override
    public Page<SanPhamResponse> getSanPhamPhanTrang(int page) {
        Pageable pageable = PageRequest.of(page, 9, Sort.by("id").descending());
        return sanPhamRepository
            .findByTinhTrangDuyet(TinhTrangDuyet.DA_DUYET, pageable)
            .map(sanPhamMapper::toResponse);
    }
    @Override
    public Page<SanPhamResponse> getSanPhamTheoDanhMuc(Integer id, int page) {
        Pageable pageable = PageRequest.of(page, 9, Sort.by("id").descending());
        return sanPhamRepository
                .findByIdDanhMucAndTinhTrangDuyet(id, TinhTrangDuyet.DA_DUYET, pageable)
                .map(sanPhamMapper::toResponse);
    }
}