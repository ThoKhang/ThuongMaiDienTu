package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.KhachHangRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.KhachHangResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.KhachHangEntity;
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
public class KhachHangMapperImpl implements KhachHangMapper {

    @Override
    public KhachHangEntity toEntity(KhachHangRequest request) {
        if ( request == null ) {
            return null;
        }

        KhachHangEntity.KhachHangEntityBuilder khachHangEntity = KhachHangEntity.builder();

        khachHangEntity.idNguoiDung( request.getIdNguoiDung() );
        khachHangEntity.hoTen( request.getHoTen() );
        khachHangEntity.diemThuong( request.getDiemThuong() );

        return khachHangEntity.build();
    }

    @Override
    public KhachHangResponse toResponse(KhachHangEntity entity) {
        if ( entity == null ) {
            return null;
        }

        KhachHangResponse khachHangResponse = new KhachHangResponse();

        khachHangResponse.setIdNguoiDung( entity.getIdNguoiDung() );
        khachHangResponse.setHoTen( entity.getHoTen() );
        khachHangResponse.setDiemThuong( entity.getDiemThuong() );

        return khachHangResponse;
    }

    @Override
    public List<KhachHangResponse> toResponseList(List<KhachHangEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<KhachHangResponse> list = new ArrayList<KhachHangResponse>( entities.size() );
        for ( KhachHangEntity khachHangEntity : entities ) {
            list.add( toResponse( khachHangEntity ) );
        }

        return list;
    }
}
