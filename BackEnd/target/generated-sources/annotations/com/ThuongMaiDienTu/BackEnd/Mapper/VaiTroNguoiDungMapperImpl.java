package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.VaiTroNguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.VaiTroNguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroNguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroNguoiDungId;
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
public class VaiTroNguoiDungMapperImpl implements VaiTroNguoiDungMapper {

    @Override
    public VaiTroNguoiDungEntity toEntity(VaiTroNguoiDungRequest request) {
        if ( request == null ) {
            return null;
        }

        VaiTroNguoiDungEntity.VaiTroNguoiDungEntityBuilder vaiTroNguoiDungEntity = VaiTroNguoiDungEntity.builder();

        vaiTroNguoiDungEntity.id( vaiTroNguoiDungRequestToVaiTroNguoiDungId( request ) );

        return vaiTroNguoiDungEntity.build();
    }

    @Override
    public VaiTroNguoiDungResponse toResponse(VaiTroNguoiDungEntity entity) {
        if ( entity == null ) {
            return null;
        }

        VaiTroNguoiDungResponse vaiTroNguoiDungResponse = new VaiTroNguoiDungResponse();

        vaiTroNguoiDungResponse.setIdNguoiDung( entityIdIdNguoiDung( entity ) );
        vaiTroNguoiDungResponse.setIdVaiTro( entityIdIdVaiTro( entity ) );
        vaiTroNguoiDungResponse.setNgayCapQuyen( entity.getNgayCapQuyen() );

        return vaiTroNguoiDungResponse;
    }

    @Override
    public List<VaiTroNguoiDungResponse> toResponseList(List<VaiTroNguoiDungEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<VaiTroNguoiDungResponse> list = new ArrayList<VaiTroNguoiDungResponse>( entities.size() );
        for ( VaiTroNguoiDungEntity vaiTroNguoiDungEntity : entities ) {
            list.add( toResponse( vaiTroNguoiDungEntity ) );
        }

        return list;
    }

    protected VaiTroNguoiDungId vaiTroNguoiDungRequestToVaiTroNguoiDungId(VaiTroNguoiDungRequest vaiTroNguoiDungRequest) {
        if ( vaiTroNguoiDungRequest == null ) {
            return null;
        }

        VaiTroNguoiDungId vaiTroNguoiDungId = new VaiTroNguoiDungId();

        vaiTroNguoiDungId.setIdNguoiDung( vaiTroNguoiDungRequest.getIdNguoiDung() );
        vaiTroNguoiDungId.setIdVaiTro( vaiTroNguoiDungRequest.getIdVaiTro() );

        return vaiTroNguoiDungId;
    }

    private Integer entityIdIdNguoiDung(VaiTroNguoiDungEntity vaiTroNguoiDungEntity) {
        VaiTroNguoiDungId id = vaiTroNguoiDungEntity.getId();
        if ( id == null ) {
            return null;
        }
        return id.getIdNguoiDung();
    }

    private Integer entityIdIdVaiTro(VaiTroNguoiDungEntity vaiTroNguoiDungEntity) {
        VaiTroNguoiDungId id = vaiTroNguoiDungEntity.getId();
        if ( id == null ) {
            return null;
        }
        return id.getIdVaiTro();
    }
}
