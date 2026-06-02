package com.ThuongMaiDienTu.BackEnd.Repository;

import com.ThuongMaiDienTu.BackEnd.Entity.BaiDangEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaiDangRepository extends JpaRepository<BaiDangEntity, Integer> {

    // Tìm kiếm bài đăng phân trang dựa trên trạng thái duyêt (Ví dụ: Đã Duyệt để show ra trang chủ)
    Page<BaiDangEntity> findByTrangThaiDuyet(TinhTrangDuyet trangThaiDuyet, Pageable pageable);

    // Hỗ trợ Admin lọc danh sách bài đăng theo đối tác cung ứng affiliate
    Page<BaiDangEntity> findByIdDoiTacAndTrangThaiDuyet(Integer idDoiTac, TinhTrangDuyet trangThaiDuyet, Pageable pageable);
}