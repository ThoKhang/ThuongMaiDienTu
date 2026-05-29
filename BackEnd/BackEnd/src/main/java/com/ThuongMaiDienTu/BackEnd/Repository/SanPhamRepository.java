package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.SanPhamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPhamEntity, Integer> {}
