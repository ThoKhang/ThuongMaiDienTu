package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.GiaoDichAffiliateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiaoDichAffiliateRepository extends JpaRepository<GiaoDichAffiliateEntity, Integer> {
    List<GiaoDichAffiliateEntity> findByIdDoiTac(Integer idDoiTac);
}
