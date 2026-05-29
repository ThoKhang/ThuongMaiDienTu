package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TheoDoiClickRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TheoDoiClickResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TheoDoiClickMapper {
    TheoDoiClickEntity toEntity(TheoDoiClickRequest request);
    TheoDoiClickResponse toResponse(TheoDoiClickEntity entity);
    List<TheoDoiClickResponse> toResponseList(List<TheoDoiClickEntity> entities);
}
