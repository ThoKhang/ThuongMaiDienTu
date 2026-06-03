package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.VaiTroRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.VaiTroResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-03T01:09:00+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class VaiTroMapperImpl implements VaiTroMapper {

    @Override
    public VaiTroEntity toEntity(VaiTroRequest request) {
        if ( request == null ) {
            return null;
        }

        VaiTroEntity vaiTroEntity = new VaiTroEntity();

        vaiTroEntity.setTenVaiTro( request.getTenVaiTro() );
        vaiTroEntity.setMoTa( request.getMoTa() );

        return vaiTroEntity;
    }

    @Override
    public VaiTroResponse toResponse(VaiTroEntity entity) {
        if ( entity == null ) {
            return null;
        }

        VaiTroResponse vaiTroResponse = new VaiTroResponse();

        vaiTroResponse.setId( entity.getId() );
        vaiTroResponse.setTenVaiTro( entity.getTenVaiTro() );
        vaiTroResponse.setMoTa( entity.getMoTa() );

        return vaiTroResponse;
    }

    @Override
    public List<VaiTroResponse> toResponseList(List<VaiTroEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<VaiTroResponse> list = new ArrayList<VaiTroResponse>( entities.size() );
        for ( VaiTroEntity vaiTroEntity : entities ) {
            list.add( toResponse( vaiTroEntity ) );
        }

        return list;
    }
}
