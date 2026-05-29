package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.GiaTriThuocTinhEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.GiaTriThuocTinhId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiaTriThuocTinhRepository extends JpaRepository<GiaTriThuocTinhEntity, GiaTriThuocTinhId> {}
