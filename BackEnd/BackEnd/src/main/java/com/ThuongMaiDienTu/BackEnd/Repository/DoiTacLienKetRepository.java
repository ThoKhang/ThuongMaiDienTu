package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.DoiTacLienKetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DoiTacLienKetRepository extends JpaRepository<DoiTacLienKetEntity, Integer> {}
