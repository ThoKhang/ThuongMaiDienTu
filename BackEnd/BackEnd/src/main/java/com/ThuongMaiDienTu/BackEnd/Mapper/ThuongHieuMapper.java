package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.ThuongHieuRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuongHieuResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.ThuongHieuEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ThuongHieuMapper {
    ThuongHieuEntity toEntity(ThuongHieuRequest request);
    ThuongHieuResponse toResponse(ThuongHieuEntity entity);
    List<ThuongHieuResponse> toResponseList(List<ThuongHieuEntity> entities);
}
