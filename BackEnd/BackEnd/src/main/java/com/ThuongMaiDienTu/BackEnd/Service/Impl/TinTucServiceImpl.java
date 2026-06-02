package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TinTucEntity;
import com.ThuongMaiDienTu.BackEnd.Mapper.TinTucMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.TinTucRepository;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TinTucServiceImpl implements TinTucService {

    private final TinTucRepository tinTucRepository;
    private final TinTucMapper tinTucMapper;

    @Override
    public List<TinTucResponse> getTinTucMoiNhat() {
        return tinTucRepository.findTop5ByOrderByNgayDangDesc()
                .stream()
                .map(tinTucMapper::toResponse)
                .collect(Collectors.toList());
    }
    @Override
    public Page<TinTucResponse> getTinTucPhanTrang(int page) {
        PageRequest pageable = PageRequest.of(page, 5, Sort.by("ngayDang").descending());

        return tinTucRepository
                .findAllByOrderByNgayDangDesc(pageable)
                .map(tinTucMapper::toResponse);
    }

    @Override
    public List<TinTucResponse> getAllTinTuc() {
        return tinTucRepository.findAll()
                .stream()
                .map(tinTucMapper::toResponse)
                .toList();
    }

    @Override
    public TinTucResponse getTinTucById(Integer id) {
        TinTucEntity tin = tinTucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tin tức"));

        return tinTucMapper.toResponse(tin);
    }
}