package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TheoDoiClickRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TheoDoiClickResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.TheoDoiClickMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.TheoDoiClickRepository;
import com.ThuongMaiDienTu.BackEnd.Service.TheoDoiClickService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TheoDoiClickServiceImpl implements TheoDoiClickService {
    private final TheoDoiClickRepository theoDoiClickRepository;
    private final TheoDoiClickMapper theoDoiClickMapper;
    @Override
    public TheoDoiClickResponse createTheoDoiClick(TheoDoiClickRequest request) {
        TheoDoiClickEntity entity = theoDoiClickMapper.toEntity(request);
        entity.setIsHopLe(true);
        TheoDoiClickEntity saved = theoDoiClickRepository.save(entity);
        return theoDoiClickMapper.toResponse(saved);
    }

    @Override
    public long countClicksBySanPham(Integer idSanPham) {
        return theoDoiClickRepository.countByIdSanPham(idSanPham);
    }
}
