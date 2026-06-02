package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {
    private final SanPhamRepository sanPhamRepository;
    private final SanPhamMapper sanPhamMapper;
    @Override
    public List<SanPhamResponse> getAllSanPham() {
        return sanPhamRepository.findAll()
                .stream()
                .map(sanPhamMapper::toResponse)
                .toList();
    }
    @Override
    public SanPhamResponse getSanPhamById(Integer id) {
        SanPhamEntity sanPham = sanPhamRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
        return sanPhamMapper.toResponse(sanPham);
    }

    @Override
    public SanPhamResponse createSanPham(SanPhamRequest request) {
        return null;
    }
    @Override
    @Transactional
    public boolean capNhatTrangThaiDuyet(Integer idSanPham, String trangThaiMoi) {
        Optional<SanPhamEntity> spOpt = sanPhamRepository.findById(idSanPham);
        if (spOpt.isPresent()) {
            SanPhamEntity sp = spOpt.get();
            try {
                sp.setTinhTrangDuyet(TinhTrangDuyet.fromDbValue(trangThaiMoi));
                sanPhamRepository.save(sp);
                return true;
            } catch (IllegalArgumentException e) {
                System.out.println("Trạng thái không hợp lệ: " + trangThaiMoi);
                return false;
            }
        }
        return false;
    }
}
