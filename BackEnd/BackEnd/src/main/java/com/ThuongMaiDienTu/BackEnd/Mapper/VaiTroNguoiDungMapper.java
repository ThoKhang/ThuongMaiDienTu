package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.VaiTroNguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.VaiTroNguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroNguoiDungEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface VaiTroNguoiDungMapper {
    @Mapping(target = "id.idNguoiDung", source = "idNguoiDung")
    @Mapping(target = "id.idVaiTro", source = "idVaiTro")
    VaiTroNguoiDungEntity toEntity(VaiTroNguoiDungRequest request);
    @Mapping(target = "idNguoiDung", source = "id.idNguoiDung")
    @Mapping(target = "idVaiTro", source = "id.idVaiTro")
    VaiTroNguoiDungResponse toResponse(VaiTroNguoiDungEntity entity);
    List<VaiTroNguoiDungResponse> toResponseList(List<VaiTroNguoiDungEntity> entities);
}