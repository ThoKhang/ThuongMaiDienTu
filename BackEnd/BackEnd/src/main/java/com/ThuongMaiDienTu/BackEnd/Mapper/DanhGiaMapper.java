package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DanhGiaRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhGiaResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DanhGiaEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DanhGiaMapper {
    @Mapping(target = "trangThaiDuyet", qualifiedByName = "stringToTinhTrangDuyetDanhGia")
    DanhGiaEntity toEntity(DanhGiaRequest request);
    @Mapping(target = "trangThaiDuyet", source = "trangThaiDuyet.dbValue")
    DanhGiaResponse toResponse(DanhGiaEntity entity);
    List<DanhGiaResponse> toResponseList(List<DanhGiaEntity> entities);
    @Named("stringToTinhTrangDuyetDanhGia")
    default TinhTrangDuyet stringToTinhTrangDuyetDanhGia(String value) {
        if (value == null || value.isEmpty()) {
            return TinhTrangDuyet.CHO_DUYET;
        }
        return TinhTrangDuyet.fromDbValue(value);
    }
}
