package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaoDichAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaoDichAffiliateEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiGiaoDich;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

@Mapper(componentModel = "spring")
public interface GiaoDichAffiliateMapper {
    @Mapping(target = "trangThaiXacThuc", qualifiedByName = "stringToTrangThaiGiaoDich")
    GiaoDichAffiliateEntity toEntity(GiaoDichAffiliateRequest request);
    @Mapping(target = "trangThaiXacThuc", source = "trangThaiXacThuc.dbValue")
    GiaoDichAffiliateResponse toResponse(GiaoDichAffiliateEntity entity);
    List<GiaoDichAffiliateResponse> toResponseList(List<GiaoDichAffiliateEntity> entities);
    @Named("stringToTrangThaiGiaoDich")
    default TrangThaiGiaoDich stringToTrangThaiGiaoDich(String value) {
        if (value == null || value.isEmpty()) {
            return TrangThaiGiaoDich.CHO_DUYET;
        }
        return TrangThaiGiaoDich.fromDbValue(value);
    }
}
