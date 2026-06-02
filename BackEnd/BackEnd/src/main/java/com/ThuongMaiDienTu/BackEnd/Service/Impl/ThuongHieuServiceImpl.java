package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuongHieuResponse;
import com.ThuongMaiDienTu.BackEnd.Mapper.ThuongHieuMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.ThuongHieuRepository;
import com.ThuongMaiDienTu.BackEnd.Service.ThuongHieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThuongHieuServiceImpl implements ThuongHieuService {

    private final ThuongHieuRepository thuongHieuRepository;
    private final ThuongHieuMapper thuongHieuMapper;

    @Override
    public List<ThuongHieuResponse> getAllThuongHieu() {
        return thuongHieuMapper.toResponseList(thuongHieuRepository.findAll());
    }
}