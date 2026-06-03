package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaoDichAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaoDichAffiliateEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiGiaoDich;
import com.ThuongMaiDienTu.BackEnd.Mapper.GiaoDichAffiliateMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.GiaoDichAffiliateRepository;
import com.ThuongMaiDienTu.BackEnd.Service.GiaoDichAffiliateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GiaoDichAffiliateServiceImpl implements GiaoDichAffiliateService {

    private final GiaoDichAffiliateRepository repository;
    private final GiaoDichAffiliateMapper mapper;

    @Override
    public GiaoDichAffiliateResponse createGiaoDich(GiaoDichAffiliateRequest request) {
        GiaoDichAffiliateEntity entity = mapper.toEntity(request);
        entity.setTrangThaiXacThuc(TrangThaiGiaoDich.CHO_DUYET);
        entity.setNgayGiaoDich(LocalDateTime.now());
        
        GiaoDichAffiliateEntity savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity);
    }

    @Override
    public List<GiaoDichAffiliateResponse> getGiaoDichByIdDoiTac(Integer idDoiTac) {
        return repository.findByIdDoiTac(idDoiTac)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public List<GiaoDichAffiliateResponse> getAllGiaoDich() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public GiaoDichAffiliateResponse updateTrangThaiGiaoDich(Integer id, String trangThai) {
        GiaoDichAffiliateEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch"));
        entity.setTrangThaiXacThuc(TrangThaiGiaoDich.fromDbValue(trangThai));
        GiaoDichAffiliateEntity savedEntity = repository.save(entity);
        return mapper.toResponse(savedEntity);
    }
}