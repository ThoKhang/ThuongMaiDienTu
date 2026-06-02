package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.BaiDangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.BaiDangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.BaiDangEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Mapper.BaiDangMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.BaiDangRepository;
import com.ThuongMaiDienTu.BackEnd.Service.BaiDangService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BaiDangServiceImpl implements BaiDangService {

    private final BaiDangRepository baiDangRepository;
    private final BaiDangMapper baiDangMapper;

    @Override
    public List<BaiDangResponse> getAllBaiDang() {
        return baiDangRepository.findAll()
                .stream()
                .map(baiDangMapper::toResponse)
                .toList();
    }

    @Override
    public BaiDangResponse getBaiDangById(Integer id) {
        BaiDangEntity baiDang = baiDangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài đăng với ID: " + id));
        return baiDangMapper.toResponse(baiDang);
    }

    @Override
    @Transactional
    public BaiDangResponse createBaiDang(BaiDangRequest request) {
        BaiDangEntity entity = baiDangMapper.toEntity(request);

        // Thiết lập liên kết đảo ngược từ ảnh sang bài đăng để JPA lưu Cascade tự động
        if (entity.getHinhAnhThucTe() != null) {
            entity.getHinhAnhThucTe().forEach(img -> img.setIdBaiDang(entity.getId()));
        }

        BaiDangEntity savedEntity = baiDangRepository.save(entity);
        return baiDangMapper.toResponse(savedEntity);
    }

    @Override
    public Page<BaiDangResponse> getBaiDangPhanTrang(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return baiDangRepository.findByTrangThaiDuyet(TinhTrangDuyet.DA_DUYET, pageable)
                .map(baiDangMapper::toResponse);
    }

    @Override
    @Transactional
    public boolean duyetBaiDang(Integer idBaiDang, Integer idAdmin, String trangThaiMoi) {
        Optional<BaiDangEntity> bdOpt = baiDangRepository.findById(idBaiDang);
        if (bdOpt.isPresent()) {
            BaiDangEntity baiDang = bdOpt.get();
            try {
                // Đổi trạng thái từ Chuỗi String sang Enum hệ thống
                baiDang.setTrangThaiDuyet(TinhTrangDuyet.fromDbValue(trangThaiMoi));
                baiDang.setIdAdminDuyet(idAdmin);
                baiDang.setNgayDuyet(LocalDateTime.now());

                baiDangRepository.save(baiDang);
                return true;
            } catch (IllegalArgumentException e) {
                return false;
            }
        }
        return false;
    }
}