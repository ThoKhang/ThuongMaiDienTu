package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TinTucRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TinTucEntity;
import org.mapstruct.Mapper;
import java.util.List;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TinTucMapper {
    TinTucEntity toEntity(TinTucRequest request);
    @Mapping(target = "loaiNguoiDang", ignore = true)
    TinTucResponse toResponse(TinTucEntity entity);
    List<TinTucResponse> toResponseList(List<TinTucEntity> entities);
    
}
