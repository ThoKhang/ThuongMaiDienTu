package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.ThuocTinhLinhKienRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuocTinhLinhKienResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.ThuocTinhLinhKienEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ThuocTinhLinhKienMapper {
    ThuocTinhLinhKienEntity toEntity(ThuocTinhLinhKienRequest request);
    ThuocTinhLinhKienResponse toResponse(ThuocTinhLinhKienEntity entity);
    List<ThuocTinhLinhKienResponse> toResponseList(List<ThuocTinhLinhKienEntity> entities);
}
