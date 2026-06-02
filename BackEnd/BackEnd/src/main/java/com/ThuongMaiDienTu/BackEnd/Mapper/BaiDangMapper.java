package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.BaiDangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.BaiDangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.BaiDangEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BaiDangMapper {

    @Mapping(target = "trangThaiDuyet", qualifiedByName = "stringToTinhTrangDuyet")
    BaiDangEntity toEntity(BaiDangRequest request);

    @Mapping(target = "trangThaiDuyet", source = "trangThaiDuyet.dbValue")
    BaiDangResponse toResponse(BaiDangEntity entity);

    List<BaiDangResponse> toResponseList(List<BaiDangEntity> entities);

    @Named("stringToTinhTrangDuyet")
    default TinhTrangDuyet stringToTinhTrangDuyet(String value) {
        if (value == null || value.isEmpty()) {
            return TinhTrangDuyet.CHO_DUYET;
        }
        return TinhTrangDuyet.fromDbValue(value);
    }
}