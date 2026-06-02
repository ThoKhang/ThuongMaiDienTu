package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.SanPhamMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.SanPhamRepository;
import com.ThuongMaiDienTu.BackEnd.Repository.TheoDoiClickRepository;
import com.ThuongMaiDienTu.BackEnd.Service.SanPhamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {

    private final SanPhamRepository sanPhamRepository;
    private final SanPhamMapper sanPhamMapper;
    private final TheoDoiClickRepository theoDoiClickRepository;
    @Override
    public List<SanPhamResponse> getAllSanPham() {
        return sanPhamRepository.findAll()
                .stream()
                .map(sanPhamMapper::toResponse)
                .toList();
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

    @Override
    public List<SanPhamResponse> getSanPhamByDoiTac(Integer idDoiTac) {
        return sanPhamRepository.findByIdDoiTac(idDoiTac)
                .stream()
                .map(sp -> {
                    SanPhamResponse res = sanPhamMapper.toResponse(sp);
                    res.setClicks(theoDoiClickRepository.countByIdSanPham(sp.getId()));
                    return res;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteSanPham(Integer id) {
        if (!sanPhamRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sản phẩm để xóa!");
        }
        sanPhamRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SanPhamResponse updateSoLuongTon(Integer id, Integer soLuong) {
        SanPhamEntity sp = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm!"));
        sp.setSoLuongTon(soLuong);
        return sanPhamMapper.toResponse(sanPhamRepository.save(sp));
    }

    @Override
    @Transactional
    public SanPhamResponse updateTinhTrangDuyet(Integer id, String tinhTrang) {
        SanPhamEntity sp = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm!"));
        sp.setTinhTrangDuyet(TinhTrangDuyet.fromDbValue(tinhTrang));
        return sanPhamMapper.toResponse(sanPhamRepository.save(sp));
    }

    @Override
    @Transactional
    public void recordClick(Integer idSanPham, String ipAddress, String userAgent, Integer idKhachHang) {
        if (!sanPhamRepository.existsById(idSanPham)) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        
        String truncatedUserAgent = userAgent != null && userAgent.length() > 500 ? userAgent.substring(0, 500) : userAgent;

        // Chống trùng lặp: nếu cùng 1 IP + UserAgent click vào sản phẩm này trong vòng 10 giây
        if (theoDoiClickRepository.countRecentClicks(idSanPham, ipAddress, truncatedUserAgent) > 0) {
            return;
        }

        com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity click = com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity.builder()
                .idSanPham(idSanPham)
                .idKhachHang(idKhachHang)
                .diaChiIP(ipAddress)
                .trinhDuyetFingerprint(truncatedUserAgent)
                .isHopLe(true)
                .build();
        theoDoiClickRepository.save(click);
    }
}
