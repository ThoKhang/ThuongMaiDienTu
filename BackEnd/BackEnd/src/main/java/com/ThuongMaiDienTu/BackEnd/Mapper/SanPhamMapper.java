package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SanPhamMapper {
    @Mapping(target = "tinhTrangDuyet", qualifiedByName = "stringToTinhTrangDuyet")
    SanPhamEntity toEntity(SanPhamRequest request);
    @Mapping(target = "tinhTrangDuyet", source = "tinhTrangDuyet.dbValue")
    SanPhamResponse toResponse(SanPhamEntity entity);
    List<SanPhamResponse> toResponseList(List<SanPhamEntity> entities);
    @Named("stringToTinhTrangDuyet")
    default TinhTrangDuyet stringToTinhTrangDuyet(String value) {
        if (value == null || value.isEmpty()) {
            return TinhTrangDuyet.CHO_DUYET;
        }
        return TinhTrangDuyet.fromDbValue(value);
    }
}
