package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.TheoDoiClickRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.TheoDoiClickResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-03T11:11:02+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class TheoDoiClickMapperImpl implements TheoDoiClickMapper {

    @Override
    public TheoDoiClickEntity toEntity(TheoDoiClickRequest request) {
        if ( request == null ) {
            return null;
        }

        TheoDoiClickEntity.TheoDoiClickEntityBuilder theoDoiClickEntity = TheoDoiClickEntity.builder();

        theoDoiClickEntity.idSanPham( request.getIdSanPham() );
        theoDoiClickEntity.idKhachHang( request.getIdKhachHang() );
        theoDoiClickEntity.diaChiIP( request.getDiaChiIP() );
        theoDoiClickEntity.trinhDuyetFingerprint( request.getTrinhDuyetFingerprint() );
        theoDoiClickEntity.isHopLe( request.getIsHopLe() );

        return theoDoiClickEntity.build();
    }

    @Override
    public TheoDoiClickResponse toResponse(TheoDoiClickEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TheoDoiClickResponse theoDoiClickResponse = new TheoDoiClickResponse();

        theoDoiClickResponse.setId( entity.getId() );
        theoDoiClickResponse.setIdSanPham( entity.getIdSanPham() );
        theoDoiClickResponse.setIdKhachHang( entity.getIdKhachHang() );
        theoDoiClickResponse.setThoiGianClick( entity.getThoiGianClick() );
        theoDoiClickResponse.setDiaChiIP( entity.getDiaChiIP() );
        theoDoiClickResponse.setTrinhDuyetFingerprint( entity.getTrinhDuyetFingerprint() );
        theoDoiClickResponse.setIsHopLe( entity.getIsHopLe() );

        return theoDoiClickResponse;
    }

    @Override
    public List<TheoDoiClickResponse> toResponseList(List<TheoDoiClickEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<TheoDoiClickResponse> list = new ArrayList<TheoDoiClickResponse>( entities.size() );
        for ( TheoDoiClickEntity theoDoiClickEntity : entities ) {
            list.add( toResponse( theoDoiClickEntity ) );
        }

        return list;
    }
}
