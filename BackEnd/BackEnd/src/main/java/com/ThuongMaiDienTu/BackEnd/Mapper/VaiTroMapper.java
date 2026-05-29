package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.VaiTroRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.VaiTroResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface VaiTroMapper {
    VaiTroEntity toEntity(VaiTroRequest request);
    VaiTroResponse toResponse(VaiTroEntity entity);
    List<VaiTroResponse> toResponseList(List<VaiTroEntity> entities);
}
