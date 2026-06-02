package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.domain.Page;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPhamEntity, Integer> {

    @Query("SELECT s FROM SanPhamEntity s WHERE s.giaKhuyenMai < s.giaNiemYet " +
           "AND s.tinhTrangDuyet = :tinhTrang ORDER BY s.giaNiemYet DESC")
    Page<SanPhamEntity> findByTinhTrangDuyet(TinhTrangDuyet tinhTrang, Pageable pageable);
    Page<SanPhamEntity> findByIdDanhMucAndTinhTrangDuyet(
            Integer idDanhMuc,
            TinhTrangDuyet tinhTrang,
            Pageable pageable
    );
}