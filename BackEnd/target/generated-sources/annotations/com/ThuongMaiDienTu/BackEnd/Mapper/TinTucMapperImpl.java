package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TinTucRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TinTucResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TinTucEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-02T08:11:47+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class TinTucMapperImpl implements TinTucMapper {

    @Override
    public TinTucEntity toEntity(TinTucRequest request) {
        if ( request == null ) {
            return null;
        }

        TinTucEntity.TinTucEntityBuilder tinTucEntity = TinTucEntity.builder();

        tinTucEntity.idAdmin( request.getIdAdmin() );
        tinTucEntity.tieuDe( request.getTieuDe() );
        tinTucEntity.noiDung( request.getNoiDung() );

        return tinTucEntity.build();
    }

    @Override
    public TinTucResponse toResponse(TinTucEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TinTucResponse tinTucResponse = new TinTucResponse();

        tinTucResponse.setId( entity.getId() );
        tinTucResponse.setIdAdmin( entity.getIdAdmin() );
        tinTucResponse.setTieuDe( entity.getTieuDe() );
        tinTucResponse.setNoiDung( entity.getNoiDung() );
        tinTucResponse.setNgayDang( entity.getNgayDang() );

        return tinTucResponse;
    }

    @Override
    public List<TinTucResponse> toResponseList(List<TinTucEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<TinTucResponse> list = new ArrayList<TinTucResponse>( entities.size() );
        for ( TinTucEntity tinTucEntity : entities ) {
            list.add( toResponse( tinTucEntity ) );
        }

        return list;
    }
}
