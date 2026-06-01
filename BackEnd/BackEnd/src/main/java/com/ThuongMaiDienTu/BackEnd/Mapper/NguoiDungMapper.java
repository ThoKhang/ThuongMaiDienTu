package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.NguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface NguoiDungMapper {
    @Mapping(target = "trangThai", qualifiedByName = "stringToTrangThaiNguoiDung")
    NguoiDungEntity toEntity(NguoiDungRequest request);
    @Mapping(target = "trangThai", source = "trangThai.dbValue")
    NguoiDungResponse toResponse(NguoiDungEntity entity);
    List<NguoiDungResponse> toResponseList(List<NguoiDungEntity> entities);
    @Named("stringToTrangThaiNguoiDung")
    default TrangThaiNguoiDung stringToTrangThaiNguoiDung(String value) {
        if (value == null || value.isEmpty()) {
            return TrangThaiNguoiDung.HOAT_DONG;
        }
        return TrangThaiNguoiDung.fromDbValue(value);
    }
    default List<String> mapVaiTros(Set<VaiTroEntity> vaiTros) {
        if (vaiTros == null)
            return null;
        return vaiTros.stream().map(VaiTroEntity::getTenVaiTro).collect(Collectors.toList());
    }
}
