package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.NguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-01T00:28:01+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class NguoiDungMapperImpl implements NguoiDungMapper {

    @Override
    public NguoiDungEntity toEntity(NguoiDungRequest request) {
        if ( request == null ) {
            return null;
        }

        NguoiDungEntity nguoiDungEntity = new NguoiDungEntity();

        nguoiDungEntity.setTrangThai( stringToTrangThaiNguoiDung( request.getTrangThai() ) );
        nguoiDungEntity.setTenDangNhap( request.getTenDangNhap() );
        nguoiDungEntity.setMatKhau( request.getMatKhau() );
        nguoiDungEntity.setEmail( request.getEmail() );

        return nguoiDungEntity;
    }

    @Override
    public NguoiDungResponse toResponse(NguoiDungEntity entity) {
        if ( entity == null ) {
            return null;
        }

        NguoiDungResponse nguoiDungResponse = new NguoiDungResponse();

        nguoiDungResponse.setTrangThai( entityTrangThaiDbValue( entity ) );
        nguoiDungResponse.setId( entity.getId() );
        nguoiDungResponse.setTenDangNhap( entity.getTenDangNhap() );
        nguoiDungResponse.setEmail( entity.getEmail() );
        nguoiDungResponse.setNgayTao( entity.getNgayTao() );
        nguoiDungResponse.setVaiTros( mapVaiTros( entity.getVaiTros() ) );

        return nguoiDungResponse;
    }

    @Override
    public List<NguoiDungResponse> toResponseList(List<NguoiDungEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<NguoiDungResponse> list = new ArrayList<NguoiDungResponse>( entities.size() );
        for ( NguoiDungEntity nguoiDungEntity : entities ) {
            list.add( toResponse( nguoiDungEntity ) );
        }

        return list;
    }

    private String entityTrangThaiDbValue(NguoiDungEntity nguoiDungEntity) {
        TrangThaiNguoiDung trangThai = nguoiDungEntity.getTrangThai();
        if ( trangThai == null ) {
            return null;
        }
        return trangThai.getDbValue();
    }
}
