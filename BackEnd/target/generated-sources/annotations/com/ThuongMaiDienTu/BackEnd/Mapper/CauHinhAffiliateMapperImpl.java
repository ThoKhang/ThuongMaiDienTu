package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.CauHinhAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.CauHinhAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.CauHinhAffiliateEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-03T11:11:01+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class CauHinhAffiliateMapperImpl implements CauHinhAffiliateMapper {

    @Override
    public CauHinhAffiliateEntity toEntity(CauHinhAffiliateRequest request) {
        if ( request == null ) {
            return null;
        }

        CauHinhAffiliateEntity.CauHinhAffiliateEntityBuilder cauHinhAffiliateEntity = CauHinhAffiliateEntity.builder();

        cauHinhAffiliateEntity.idAdmin( request.getIdAdmin() );
        cauHinhAffiliateEntity.idDoiTac( request.getIdDoiTac() );
        cauHinhAffiliateEntity.phanTramHoaHong( request.getPhanTramHoaHong() );
        cauHinhAffiliateEntity.phiMoiClick( request.getPhiMoiClick() );
        cauHinhAffiliateEntity.ghiChu( request.getGhiChu() );

        return cauHinhAffiliateEntity.build();
    }

    @Override
    public CauHinhAffiliateResponse toResponse(CauHinhAffiliateEntity entity) {
        if ( entity == null ) {
            return null;
        }

        CauHinhAffiliateResponse cauHinhAffiliateResponse = new CauHinhAffiliateResponse();

        cauHinhAffiliateResponse.setId( entity.getId() );
        cauHinhAffiliateResponse.setIdAdmin( entity.getIdAdmin() );
        cauHinhAffiliateResponse.setIdDoiTac( entity.getIdDoiTac() );
        cauHinhAffiliateResponse.setPhanTramHoaHong( entity.getPhanTramHoaHong() );
        cauHinhAffiliateResponse.setPhiMoiClick( entity.getPhiMoiClick() );
        cauHinhAffiliateResponse.setNgayCapNhat( entity.getNgayCapNhat() );
        cauHinhAffiliateResponse.setGhiChu( entity.getGhiChu() );

        return cauHinhAffiliateResponse;
    }

    @Override
    public List<CauHinhAffiliateResponse> toResponseList(List<CauHinhAffiliateEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<CauHinhAffiliateResponse> list = new ArrayList<CauHinhAffiliateResponse>( entities.size() );
        for ( CauHinhAffiliateEntity cauHinhAffiliateEntity : entities ) {
            list.add( toResponse( cauHinhAffiliateEntity ) );
        }

        return list;
    }
}
