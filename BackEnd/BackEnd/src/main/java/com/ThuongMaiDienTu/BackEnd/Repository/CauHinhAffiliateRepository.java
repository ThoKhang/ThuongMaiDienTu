package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.CauHinhAffiliateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CauHinhAffiliateRepository extends JpaRepository<CauHinhAffiliateEntity, Integer> {}
