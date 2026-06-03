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
    date = "2026-06-03T09:48:46+0700",
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

        tinTucEntity.tieuDe( request.getTieuDe() );
        tinTucEntity.noiDung( request.getNoiDung() );

        return tinTucEntity.build();
    }

    @Override
    public TinTucResponse toResponse(TinTucEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TinTucResponse.TinTucResponseBuilder tinTucResponse = TinTucResponse.builder();

        tinTucResponse.id( entity.getId() );
        tinTucResponse.idNguoiDang( entity.getIdNguoiDang() );
        tinTucResponse.tieuDe( entity.getTieuDe() );
        tinTucResponse.noiDung( entity.getNoiDung() );
        tinTucResponse.ngayDang( entity.getNgayDang() );
        tinTucResponse.hinhAnh( entity.getHinhAnh() );
        tinTucResponse.trangThaiDuyet( entity.getTrangThaiDuyet() );

        return tinTucResponse.build();
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
