package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.KhachHangEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface KhachHangMapper {
    KhachHangEntity toEntity(KhachHangRequest request);
    KhachHangResponse toResponse(KhachHangEntity entity);
    List<KhachHangResponse> toResponseList(List<KhachHangEntity> entities);
}
