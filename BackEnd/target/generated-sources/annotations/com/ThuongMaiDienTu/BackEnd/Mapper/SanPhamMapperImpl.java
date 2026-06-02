package com.ThuongMaiDienTu.BackEnd.Mapper;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.SanPhamRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.SanPhamResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
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
public class SanPhamMapperImpl implements SanPhamMapper {

    @Override
    public SanPhamEntity toEntity(SanPhamRequest request) {
        if ( request == null ) {
            return null;
        }

        SanPhamEntity.SanPhamEntityBuilder sanPhamEntity = SanPhamEntity.builder();

        sanPhamEntity.tinhTrangDuyet( stringToTinhTrangDuyet( request.getTinhTrangDuyet() ) );
        sanPhamEntity.idDanhMuc( request.getIdDanhMuc() );
        sanPhamEntity.idDoiTac( request.getIdDoiTac() );
        sanPhamEntity.idThuongHieu( request.getIdThuongHieu() );
        sanPhamEntity.tenSanPham( request.getTenSanPham() );
        sanPhamEntity.url( request.getUrl() );
        sanPhamEntity.moTa( request.getMoTa() );
        sanPhamEntity.thongSoKyThuat( request.getThongSoKyThuat() );
        sanPhamEntity.giaNiemYet( request.getGiaNiemYet() );
        sanPhamEntity.giaKhuyenMai( request.getGiaKhuyenMai() );
        sanPhamEntity.soLuongTon( request.getSoLuongTon() );
        sanPhamEntity.urlAffiliate( request.getUrlAffiliate() );

        return sanPhamEntity.build();
    }

    @Override
    public SanPhamResponse toResponse(SanPhamEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SanPhamResponse.SanPhamResponseBuilder sanPhamResponse = SanPhamResponse.builder();

        sanPhamResponse.tinhTrangDuyet( entityTinhTrangDuyetDbValue( entity ) );
        sanPhamResponse.id( entity.getId() );
        sanPhamResponse.idDanhMuc( entity.getIdDanhMuc() );
        sanPhamResponse.idThuongHieu( entity.getIdThuongHieu() );
        sanPhamResponse.tenSanPham( entity.getTenSanPham() );
        sanPhamResponse.url( entity.getUrl() );
        sanPhamResponse.moTa( entity.getMoTa() );
        sanPhamResponse.thongSoKyThuat( entity.getThongSoKyThuat() );
        sanPhamResponse.giaNiemYet( entity.getGiaNiemYet() );
        sanPhamResponse.giaKhuyenMai( entity.getGiaKhuyenMai() );
        sanPhamResponse.soLuongTon( entity.getSoLuongTon() );
        sanPhamResponse.urlAffiliate( entity.getUrlAffiliate() );

        return sanPhamResponse.build();
    }

    @Override
    public List<SanPhamResponse> toResponseList(List<SanPhamEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SanPhamResponse> list = new ArrayList<SanPhamResponse>( entities.size() );
        for ( SanPhamEntity sanPhamEntity : entities ) {
            list.add( toResponse( sanPhamEntity ) );
        }

        return list;
    }

    private String entityTinhTrangDuyetDbValue(SanPhamEntity sanPhamEntity) {
        TinhTrangDuyet tinhTrangDuyet = sanPhamEntity.getTinhTrangDuyet();
        if ( tinhTrangDuyet == null ) {
            return null;
        }
        return tinhTrangDuyet.getDbValue();
    }
}
