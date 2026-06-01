package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DanhGiaRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DanhGiaResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DanhGiaEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
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
public class DanhGiaMapperImpl implements DanhGiaMapper {

    @Override
    public DanhGiaEntity toEntity(DanhGiaRequest request) {
        if ( request == null ) {
            return null;
        }

        DanhGiaEntity.DanhGiaEntityBuilder danhGiaEntity = DanhGiaEntity.builder();

        danhGiaEntity.trangThaiDuyet( stringToTinhTrangDuyetDanhGia( request.getTrangThaiDuyet() ) );
        danhGiaEntity.idKhachHang( request.getIdKhachHang() );
        danhGiaEntity.idDoiTac( request.getIdDoiTac() );
        danhGiaEntity.diemRating( request.getDiemRating() );
        danhGiaEntity.noiDung( request.getNoiDung() );

        return danhGiaEntity.build();
    }

    @Override
    public DanhGiaResponse toResponse(DanhGiaEntity entity) {
        if ( entity == null ) {
            return null;
        }

        DanhGiaResponse danhGiaResponse = new DanhGiaResponse();

        danhGiaResponse.setTrangThaiDuyet( entityTrangThaiDuyetDbValue( entity ) );
        danhGiaResponse.setId( entity.getId() );
        danhGiaResponse.setIdKhachHang( entity.getIdKhachHang() );
        danhGiaResponse.setIdDoiTac( entity.getIdDoiTac() );
        danhGiaResponse.setDiemRating( entity.getDiemRating() );
        danhGiaResponse.setNoiDung( entity.getNoiDung() );

        return danhGiaResponse;
    }

    @Override
    public List<DanhGiaResponse> toResponseList(List<DanhGiaEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<DanhGiaResponse> list = new ArrayList<DanhGiaResponse>( entities.size() );
        for ( DanhGiaEntity danhGiaEntity : entities ) {
            list.add( toResponse( danhGiaEntity ) );
        }

        return list;
    }

    private String entityTrangThaiDuyetDbValue(DanhGiaEntity danhGiaEntity) {
        TinhTrangDuyet trangThaiDuyet = danhGiaEntity.getTrangThaiDuyet();
        if ( trangThaiDuyet == null ) {
            return null;
        }
        return trangThaiDuyet.getDbValue();
    }
}
