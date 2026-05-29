package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.DanhMucEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucRepository extends JpaRepository<DanhMucEntity, Integer> {}
