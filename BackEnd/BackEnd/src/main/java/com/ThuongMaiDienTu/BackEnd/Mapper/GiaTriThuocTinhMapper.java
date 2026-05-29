package com.ThuongMaiDienTu.BackEnd.Mapper;
import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaTriThuocTinhRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaTriThuocTinhResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaTriThuocTinhEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface GiaTriThuocTinhMapper {
    @Mapping(target = "id.idSanPham", source = "idSanPham")
    @Mapping(target = "id.idThuocTinh", source = "idThuocTinh")
    GiaTriThuocTinhEntity toEntity(GiaTriThuocTinhRequest request);
    @Mapping(target = "idSanPham", source = "id.idSanPham")
    @Mapping(target = "idThuocTinh", source = "id.idThuocTinh")
    GiaTriThuocTinhResponse toResponse(GiaTriThuocTinhEntity entity);
    List<GiaTriThuocTinhResponse> toResponseList(List<GiaTriThuocTinhEntity> entities);
}
