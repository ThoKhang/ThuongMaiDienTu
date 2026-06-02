package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.TinTucEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TinTucRepository extends JpaRepository<TinTucEntity, Integer> {
    List<TinTucEntity> findTop5ByOrderByNgayDangDesc();
}
