package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaTriThuocTinhRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaTriThuocTinhResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaTriThuocTinhEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaTriThuocTinhId;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-02T23:46:57+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class GiaTriThuocTinhMapperImpl implements GiaTriThuocTinhMapper {

    @Override
    public GiaTriThuocTinhEntity toEntity(GiaTriThuocTinhRequest request) {
        if ( request == null ) {
            return null;
        }

        GiaTriThuocTinhEntity.GiaTriThuocTinhEntityBuilder giaTriThuocTinhEntity = GiaTriThuocTinhEntity.builder();

        giaTriThuocTinhEntity.id( giaTriThuocTinhRequestToGiaTriThuocTinhId( request ) );
        giaTriThuocTinhEntity.giaTri( request.getGiaTri() );

        return giaTriThuocTinhEntity.build();
    }

    @Override
    public GiaTriThuocTinhResponse toResponse(GiaTriThuocTinhEntity entity) {
        if ( entity == null ) {
            return null;
        }

        GiaTriThuocTinhResponse giaTriThuocTinhResponse = new GiaTriThuocTinhResponse();

        giaTriThuocTinhResponse.setIdSanPham( entityIdIdSanPham( entity ) );
        giaTriThuocTinhResponse.setIdThuocTinh( entityIdIdThuocTinh( entity ) );
        giaTriThuocTinhResponse.setGiaTri( entity.getGiaTri() );

        return giaTriThuocTinhResponse;
    }

    @Override
    public List<GiaTriThuocTinhResponse> toResponseList(List<GiaTriThuocTinhEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<GiaTriThuocTinhResponse> list = new ArrayList<GiaTriThuocTinhResponse>( entities.size() );
        for ( GiaTriThuocTinhEntity giaTriThuocTinhEntity : entities ) {
            list.add( toResponse( giaTriThuocTinhEntity ) );
        }

        return list;
    }

    protected GiaTriThuocTinhId giaTriThuocTinhRequestToGiaTriThuocTinhId(GiaTriThuocTinhRequest giaTriThuocTinhRequest) {
        if ( giaTriThuocTinhRequest == null ) {
            return null;
        }

        GiaTriThuocTinhId giaTriThuocTinhId = new GiaTriThuocTinhId();

        giaTriThuocTinhId.setIdSanPham( giaTriThuocTinhRequest.getIdSanPham() );
        giaTriThuocTinhId.setIdThuocTinh( giaTriThuocTinhRequest.getIdThuocTinh() );

        return giaTriThuocTinhId;
    }

    private Integer entityIdIdSanPham(GiaTriThuocTinhEntity giaTriThuocTinhEntity) {
        GiaTriThuocTinhId id = giaTriThuocTinhEntity.getId();
        if ( id == null ) {
            return null;
        }
        return id.getIdSanPham();
    }

    private Integer entityIdIdThuocTinh(GiaTriThuocTinhEntity giaTriThuocTinhEntity) {
        GiaTriThuocTinhId id = giaTriThuocTinhEntity.getId();
        if ( id == null ) {
            return null;
        }
        return id.getIdThuocTinh();
    }
}
