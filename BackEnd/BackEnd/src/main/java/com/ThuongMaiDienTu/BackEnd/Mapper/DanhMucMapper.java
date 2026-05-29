package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DanhMucRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhMucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DanhMucEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DanhMucMapper {
    DanhMucEntity toEntity(DanhMucRequest request);
    DanhMucResponse toResponse(DanhMucEntity entity);
    List<DanhMucResponse> toResponseList(List<DanhMucEntity> entities);
}
