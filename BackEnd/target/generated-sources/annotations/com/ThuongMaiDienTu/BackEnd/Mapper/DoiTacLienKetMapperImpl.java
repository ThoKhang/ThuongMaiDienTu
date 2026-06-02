package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DoiTacLienKetRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacLienKetResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DoiTacLienKetEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-02T22:40:22+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class DoiTacLienKetMapperImpl implements DoiTacLienKetMapper {

    @Override
    public DoiTacLienKetEntity toEntity(DoiTacLienKetRequest request) {
        if ( request == null ) {
            return null;
        }

        DoiTacLienKetEntity.DoiTacLienKetEntityBuilder doiTacLienKetEntity = DoiTacLienKetEntity.builder();

        doiTacLienKetEntity.trangThaiDuyet( stringToTinhTrangDuyet( request.getTrangThaiDuyet() ) );
        doiTacLienKetEntity.idNguoiDung( request.getIdNguoiDung() );
        doiTacLienKetEntity.tenCongTy( request.getTenCongTy() );
        doiTacLienKetEntity.websiteUrl( request.getWebsiteUrl() );
        doiTacLienKetEntity.thoiHanHopDong( request.getThoiHanHopDong() );

        return doiTacLienKetEntity.build();
    }

    @Override
    public DoiTacLienKetResponse toResponse(DoiTacLienKetEntity entity) {
        if ( entity == null ) {
            return null;
        }

        DoiTacLienKetResponse doiTacLienKetResponse = new DoiTacLienKetResponse();

        doiTacLienKetResponse.setTrangThaiDuyet( entityTrangThaiDuyetDbValue( entity ) );
        doiTacLienKetResponse.setIdNguoiDung( entity.getIdNguoiDung() );
        doiTacLienKetResponse.setTenCongTy( entity.getTenCongTy() );
        doiTacLienKetResponse.setWebsiteUrl( entity.getWebsiteUrl() );
        doiTacLienKetResponse.setThoiHanHopDong( entity.getThoiHanHopDong() );

        return doiTacLienKetResponse;
    }

    @Override
    public List<DoiTacLienKetResponse> toResponseList(List<DoiTacLienKetEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<DoiTacLienKetResponse> list = new ArrayList<DoiTacLienKetResponse>( entities.size() );
        for ( DoiTacLienKetEntity doiTacLienKetEntity : entities ) {
            list.add( toResponse( doiTacLienKetEntity ) );
        }

        return list;
    }

    private String entityTrangThaiDuyetDbValue(DoiTacLienKetEntity doiTacLienKetEntity) {
        TinhTrangDuyet trangThaiDuyet = doiTacLienKetEntity.getTrangThaiDuyet();
        if ( trangThaiDuyet == null ) {
            return null;
        }
        return trangThaiDuyet.getDbValue();
    }
}
