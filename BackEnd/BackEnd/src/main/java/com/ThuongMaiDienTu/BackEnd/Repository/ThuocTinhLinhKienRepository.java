package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.ThuocTinhLinhKienEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuocTinhLinhKienRepository extends JpaRepository<ThuocTinhLinhKienEntity, Integer> {}

