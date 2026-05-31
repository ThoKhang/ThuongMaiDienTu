package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.ThuongHieuRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuongHieuResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.ThuongHieuEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-01T00:28:01+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ThuongHieuMapperImpl implements ThuongHieuMapper {

    @Override
    public ThuongHieuEntity toEntity(ThuongHieuRequest request) {
        if ( request == null ) {
            return null;
        }

        ThuongHieuEntity.ThuongHieuEntityBuilder thuongHieuEntity = ThuongHieuEntity.builder();

        thuongHieuEntity.tenThuongHieu( request.getTenThuongHieu() );
        thuongHieuEntity.quocGia( request.getQuocGia() );
        thuongHieuEntity.logoUrl( request.getLogoUrl() );

        return thuongHieuEntity.build();
    }

    @Override
    public ThuongHieuResponse toResponse(ThuongHieuEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ThuongHieuResponse thuongHieuResponse = new ThuongHieuResponse();

        thuongHieuResponse.setId( entity.getId() );
        thuongHieuResponse.setTenThuongHieu( entity.getTenThuongHieu() );
        thuongHieuResponse.setQuocGia( entity.getQuocGia() );
        thuongHieuResponse.setLogoUrl( entity.getLogoUrl() );

        return thuongHieuResponse;
    }

    @Override
    public List<ThuongHieuResponse> toResponseList(List<ThuongHieuEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<ThuongHieuResponse> list = new ArrayList<ThuongHieuResponse>( entities.size() );
        for ( ThuongHieuEntity thuongHieuEntity : entities ) {
            list.add( toResponse( thuongHieuEntity ) );
        }

        return list;
    }
}
