package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Mapper.TinTucMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.TinTucRepository;
import com.ThuongMaiDienTu.BackEnd.Service.TinTucService;
import lombok.RequiredArgsConstructor;
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
}