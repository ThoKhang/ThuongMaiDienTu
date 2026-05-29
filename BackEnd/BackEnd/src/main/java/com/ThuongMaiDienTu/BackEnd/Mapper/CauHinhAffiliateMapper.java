package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.CauHinhAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.CauHinhAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.CauHinhAffiliateEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CauHinhAffiliateMapper {
    CauHinhAffiliateEntity toEntity(CauHinhAffiliateRequest request);
    CauHinhAffiliateResponse toResponse(CauHinhAffiliateEntity entity);
    List<CauHinhAffiliateResponse> toResponseList(List<CauHinhAffiliateEntity> entities);
}
