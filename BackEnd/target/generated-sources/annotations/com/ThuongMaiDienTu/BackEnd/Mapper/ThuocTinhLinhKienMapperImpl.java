package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.ThuocTinhLinhKienRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.ThuocTinhLinhKienResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.ThuocTinhLinhKienEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-01T10:54:05+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ThuocTinhLinhKienMapperImpl implements ThuocTinhLinhKienMapper {

    @Override
    public ThuocTinhLinhKienEntity toEntity(ThuocTinhLinhKienRequest request) {
        if ( request == null ) {
            return null;
        }

        ThuocTinhLinhKienEntity.ThuocTinhLinhKienEntityBuilder thuocTinhLinhKienEntity = ThuocTinhLinhKienEntity.builder();

        thuocTinhLinhKienEntity.tenThuocTinh( request.getTenThuocTinh() );
        thuocTinhLinhKienEntity.idDanhMuc( request.getIdDanhMuc() );

        return thuocTinhLinhKienEntity.build();
    }

    @Override
    public ThuocTinhLinhKienResponse toResponse(ThuocTinhLinhKienEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ThuocTinhLinhKienResponse thuocTinhLinhKienResponse = new ThuocTinhLinhKienResponse();

        thuocTinhLinhKienResponse.setId( entity.getId() );
        thuocTinhLinhKienResponse.setTenThuocTinh( entity.getTenThuocTinh() );
        thuocTinhLinhKienResponse.setIdDanhMuc( entity.getIdDanhMuc() );

        return thuocTinhLinhKienResponse;
    }

    @Override
    public List<ThuocTinhLinhKienResponse> toResponseList(List<ThuocTinhLinhKienEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<ThuocTinhLinhKienResponse> list = new ArrayList<ThuocTinhLinhKienResponse>( entities.size() );
        for ( ThuocTinhLinhKienEntity thuocTinhLinhKienEntity : entities ) {
            list.add( toResponse( thuocTinhLinhKienEntity ) );
        }

        return list;
    }
}
