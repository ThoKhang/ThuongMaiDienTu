package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DoiTacLienKetRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacLienKetResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DoiTacLienKetEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DoiTacLienKetMapper {
    @Mapping(target = "trangThaiDuyet", qualifiedByName = "stringToTinhTrangDuyet")
    DoiTacLienKetEntity toEntity(DoiTacLienKetRequest request);
    @Mapping(target = "trangThaiDuyet", source = "trangThaiDuyet.dbValue")
    DoiTacLienKetResponse toResponse(DoiTacLienKetEntity entity);
    List<DoiTacLienKetResponse> toResponseList(List<DoiTacLienKetEntity> entities);
    @Named("stringToTinhTrangDuyet")
    default TinhTrangDuyet stringToTinhTrangDuyet(String value) {
        if (value == null || value.isEmpty()) {
            return TinhTrangDuyet.CHO_DUYET;
        }
        return TinhTrangDuyet.fromDbValue(value);
    }
}
