package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DanhMucRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhMucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DanhMucEntity;
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
public class DanhMucMapperImpl implements DanhMucMapper {

    @Override
    public DanhMucEntity toEntity(DanhMucRequest request) {
        if ( request == null ) {
            return null;
        }

        DanhMucEntity.DanhMucEntityBuilder danhMucEntity = DanhMucEntity.builder();

        danhMucEntity.tenDanhMuc( request.getTenDanhMuc() );
        danhMucEntity.moTa( request.getMoTa() );

        return danhMucEntity.build();
    }

    @Override
    public DanhMucResponse toResponse(DanhMucEntity entity) {
        if ( entity == null ) {
            return null;
        }

        DanhMucResponse danhMucResponse = new DanhMucResponse();

        danhMucResponse.setId( entity.getId() );
        danhMucResponse.setTenDanhMuc( entity.getTenDanhMuc() );
        danhMucResponse.setMoTa( entity.getMoTa() );

        return danhMucResponse;
    }

    @Override
    public List<DanhMucResponse> toResponseList(List<DanhMucEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<DanhMucResponse> list = new ArrayList<DanhMucResponse>( entities.size() );
        for ( DanhMucEntity danhMucEntity : entities ) {
            list.add( toResponse( danhMucEntity ) );
        }

        return list;
    }
}
