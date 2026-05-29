package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.KhachHangEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface KhachHangRepository extends JpaRepository<KhachHangEntity, Integer> {}
