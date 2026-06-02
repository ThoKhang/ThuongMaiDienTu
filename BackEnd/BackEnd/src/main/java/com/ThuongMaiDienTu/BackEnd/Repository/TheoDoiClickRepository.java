package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.TheoDoiClickEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TheoDoiClickRepository extends JpaRepository<TheoDoiClickEntity, Long> {
    long countByIdSanPham(Integer idSanPham);

    @Query(value = "SELECT COUNT(*) FROM THEODOI_CLICK " +
                   "WHERE idSanPham = :idSanPham AND diaChiIP = :ipAddress AND trinhDuyetFingerprint = :userAgent " +
                   "AND thoiGianClick >= NOW() - INTERVAL 10 SECOND", nativeQuery = true)
    int countRecentClicks(@Param("idSanPham") Integer idSanPham, 
                          @Param("ipAddress") String ipAddress, 
                          @Param("userAgent") String userAgent);
}

