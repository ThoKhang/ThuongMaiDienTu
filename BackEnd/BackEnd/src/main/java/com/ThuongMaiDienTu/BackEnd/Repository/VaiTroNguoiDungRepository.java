package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroNguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroNguoiDungId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaiTroNguoiDungRepository extends JpaRepository<VaiTroNguoiDungEntity, VaiTroNguoiDungId> {}
