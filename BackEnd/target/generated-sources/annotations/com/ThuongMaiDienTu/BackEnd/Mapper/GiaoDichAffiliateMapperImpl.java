package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.GiaoDichAffiliateRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.GiaoDichAffiliateResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaoDichAffiliateEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiGiaoDich;
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
public class GiaoDichAffiliateMapperImpl implements GiaoDichAffiliateMapper {

    @Override
    public GiaoDichAffiliateEntity toEntity(GiaoDichAffiliateRequest request) {
        if ( request == null ) {
            return null;
        }

        GiaoDichAffiliateEntity.GiaoDichAffiliateEntityBuilder giaoDichAffiliateEntity = GiaoDichAffiliateEntity.builder();

        giaoDichAffiliateEntity.trangThaiXacThuc( stringToTrangThaiGiaoDich( request.getTrangThaiXacThuc() ) );
        giaoDichAffiliateEntity.idClick( request.getIdClick() );
        giaoDichAffiliateEntity.idKhachHang( request.getIdKhachHang() );
        giaoDichAffiliateEntity.idDoiTac( request.getIdDoiTac() );
        giaoDichAffiliateEntity.idSanPham( request.getIdSanPham() );
        giaoDichAffiliateEntity.soLuong( request.getSoLuong() );
        giaoDichAffiliateEntity.tongGiaTri( request.getTongGiaTri() );
        giaoDichAffiliateEntity.hoaHongNhan( request.getHoaHongNhan() );
        giaoDichAffiliateEntity.phuongThucTT( request.getPhuongThucTT() );

        return giaoDichAffiliateEntity.build();
    }

    @Override
    public GiaoDichAffiliateResponse toResponse(GiaoDichAffiliateEntity entity) {
        if ( entity == null ) {
            return null;
        }

        GiaoDichAffiliateResponse giaoDichAffiliateResponse = new GiaoDichAffiliateResponse();

        giaoDichAffiliateResponse.setTrangThaiXacThuc( entityTrangThaiXacThucDbValue( entity ) );
        giaoDichAffiliateResponse.setId( entity.getId() );
        giaoDichAffiliateResponse.setIdClick( entity.getIdClick() );
        giaoDichAffiliateResponse.setIdKhachHang( entity.getIdKhachHang() );
        giaoDichAffiliateResponse.setIdDoiTac( entity.getIdDoiTac() );
        giaoDichAffiliateResponse.setIdSanPham( entity.getIdSanPham() );
        giaoDichAffiliateResponse.setSoLuong( entity.getSoLuong() );
        giaoDichAffiliateResponse.setTongGiaTri( entity.getTongGiaTri() );
        giaoDichAffiliateResponse.setHoaHongNhan( entity.getHoaHongNhan() );
        giaoDichAffiliateResponse.setPhuongThucTT( entity.getPhuongThucTT() );
        giaoDichAffiliateResponse.setNgayGiaoDich( entity.getNgayGiaoDich() );

        return giaoDichAffiliateResponse;
    }

    @Override
    public List<GiaoDichAffiliateResponse> toResponseList(List<GiaoDichAffiliateEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<GiaoDichAffiliateResponse> list = new ArrayList<GiaoDichAffiliateResponse>( entities.size() );
        for ( GiaoDichAffiliateEntity giaoDichAffiliateEntity : entities ) {
            list.add( toResponse( giaoDichAffiliateEntity ) );
        }

        return list;
    }

    private String entityTrangThaiXacThucDbValue(GiaoDichAffiliateEntity giaoDichAffiliateEntity) {
        TrangThaiGiaoDich trangThaiXacThuc = giaoDichAffiliateEntity.getTrangThaiXacThuc();
        if ( trangThaiXacThuc == null ) {
            return null;
        }
        return trangThaiXacThuc.getDbValue();
    }
}
