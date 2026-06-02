package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhMucResponse;
import com.ThuongMaiDienTu.BackEnd.Mapper.DanhMucMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.DanhMucRepository;
import com.ThuongMaiDienTu.BackEnd.Service.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucServiceImpl implements DanhMucService {

    private final DanhMucRepository danhMucRepository;
    private final DanhMucMapper danhMucMapper;

    @Override
    public List<DanhMucResponse> getAllDanhMuc() {
        return danhMucMapper.toResponseList(danhMucRepository.findAll());
    }
}