-- ============================================================
-- THIET KE CO SO DU LIEU PORTAL AFFILIATE LINH KIEN MAY TINH
-- Tích hợp RBAC Model, EAV Filter & Truy vết Affiliate khép kín
-- ============================================================

DROP DATABASE IF EXISTS LKMT_MoHinhWebCong;
CREATE DATABASE LKMT_MoHinhWebCong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE LKMT_MoHinhWebCong;

-- ============================================================
-- 1. QUẢN LÝ PHÂN QUYỀN & TÀI KHOẢN (RBAC)
-- ============================================================
CREATE TABLE VAITRO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenVaiTro VARCHAR(50) NOT NULL UNIQUE, -- Admin, KhachHang, DoiTac
    moTa VARCHAR(255) NULL
);

CREATE TABLE NGUOIDUNG (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenDangNhap VARCHAR(100) NOT NULL UNIQUE,
    matKhau VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    soDienThoai VARCHAR(15) NULL,   -- Chuyển từ KHACHHANG sang
    ngaySinh DATE NULL,             -- Chuyển từ KHACHHANG sang
    trangThai VARCHAR(20) DEFAULT 'HoatDong',
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VAITRO_NGUOIDUNG (
    idNguoiDung INT NOT NULL,
    idVaiTro INT NOT NULL,
    ngayCapQuyen DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idNguoiDung, idVaiTro), 
    CONSTRAINT FK_VN_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE,
    CONSTRAINT FK_VN_VT FOREIGN KEY (idVaiTro) REFERENCES VAITRO(id) ON DELETE CASCADE
);

-- ============================================================
-- 2. THỰC THỂ CHI TIẾT NGƯỜI DÙNG
-- ============================================================
CREATE TABLE KHACHHANG (
    idNguoiDung INT PRIMARY KEY,
    hoTen VARCHAR(150) NOT NULL,
    diemThuong INT DEFAULT 0,
    CONSTRAINT FK_KH_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE
);

CREATE TABLE DOITACLIENKET (
    idNguoiDung INT PRIMARY KEY,
    tenCongTy VARCHAR(200) NOT NULL,
    websiteUrl VARCHAR(300) NULL,
    thoiHanHopDong DATE NULL,
    trangThaiDuyet VARCHAR(20) DEFAULT 'ChoDuyet',
    CONSTRAINT FK_DT_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE
);

-- ============================================================
-- 3. CẤU HÌNH AFFILIATE 
-- ============================================================
CREATE TABLE CAUHINH_AFFILIATE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idAdmin INT NOT NULL,            
    idDoiTac INT NOT NULL,          
    phanTramHoaHong DECIMAL(5,2) DEFAULT 0, 
    phiMoiClick DECIMAL(18,2) DEFAULT 0,
    ngayCapNhat DATETIME DEFAULT CURRENT_TIMESTAMP,
    ghiChu TEXT NULL,
    CONSTRAINT FK_CH_ADMIN FOREIGN KEY (idAdmin) REFERENCES NGUOIDUNG(id),
    CONSTRAINT FK_CH_DOITAC FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung) ON DELETE CASCADE
);

-- ============================================================
-- 4. QUẢN LÝ SẢN PHẨM & BỘ LỌC ĐẶC THÙ LINH KIỆN
-- ============================================================
CREATE TABLE DANHMUC (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenDanhMuc VARCHAR(150) NOT NULL UNIQUE,
    moTa TEXT NULL
);

CREATE TABLE THUONGHIEU (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenThuongHieu VARCHAR(100) NOT NULL UNIQUE,
    quocGia VARCHAR(100) NULL,
    logoUrl VARCHAR(500) NULL
);

CREATE TABLE SANPHAM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idDanhMuc INT NOT NULL,
    idDoiTac INT NOT NULL, 
    idThuongHieu INT NOT NULL, 
    tenSanPham VARCHAR(200) NOT NULL,
    url VARCHAR(500) NULL,
    moTa TEXT NULL,
    thongSoKyThuat TEXT NULL, -- Lưu cấu trúc JSON chung
    giaNiemYet DECIMAL(18,2) NOT NULL DEFAULT 0,
    giaKhuyenMai DECIMAL(18,2) DEFAULT 0,
    soLuongTon INT DEFAULT 0, -- Quản lý kho từ phía Đối tác
    urlAffiliate VARCHAR(500) NOT NULL,
    tinhTrangDuyet VARCHAR(20) DEFAULT 'ChoDuyet',
    CONSTRAINT FK_SP_DM FOREIGN KEY (idDanhMuc) REFERENCES DANHMUC(id),
    CONSTRAINT FK_SP_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung),
    CONSTRAINT FK_SP_TH FOREIGN KEY (idThuongHieu) REFERENCES THUONGHIEU(id)
);

-- BỘ LỌC ĐỘNG (EAV) - Giải pháp lọc Socket, RAM, Công suất...
CREATE TABLE THUOCTINH_LINHKIEN (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenThuocTinh VARCHAR(100) NOT NULL,
    idDanhMuc INT NOT NULL, 
    CONSTRAINT FK_TT_DM FOREIGN KEY (idDanhMuc) REFERENCES DANHMUC(id)
);

CREATE TABLE GIATRI_THUOCTINH (
    idSanPham INT NOT NULL,
    idThuocTinh INT NOT NULL,
    giaTri VARCHAR(255) NOT NULL, 
    PRIMARY KEY (idSanPham, idThuocTinh),
    CONSTRAINT FK_GT_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id) ON DELETE CASCADE,
    CONSTRAINT FK_GT_TT FOREIGN KEY (idThuocTinh) REFERENCES THUOCTINH_LINHKIEN(id)
);

-- ============================================================
-- 5. THEO DÕI LUỒNG CHUYỂN ĐỔI (CLICK -> GIAO DỊCH)
-- ============================================================
CREATE TABLE THEODOI_CLICK (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idSanPham INT NOT NULL,
    idKhachHang INT NULL, 
    thoiGianClick DATETIME DEFAULT CURRENT_TIMESTAMP,
    diaChiIP VARCHAR(50),
    trinhDuyetFingerprint VARCHAR(500),
    isHopLe BOOLEAN DEFAULT 1, 
    CONSTRAINT FK_CLICK_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id)
);

-- Thiết kế khép kín hoàn toàn để tính toán được tiền hoa hồng
CREATE TABLE GIAODICH_AFFILIATE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idClick BIGINT NOT NULL, 
    idKhachHang INT NULL, 
    idDoiTac INT NOT NULL, 
    idSanPham INT NOT NULL,
    soLuong INT DEFAULT 1,
    tongGiaTri DECIMAL(18,2) NOT NULL, 
    hoaHongNhan DECIMAL(18,2) NOT NULL, 
    phuongThucTT VARCHAR(50) NOT NULL, 
    trangThaiXacThuc VARCHAR(50) DEFAULT 'ChoDuyet', 
    ngayGiaoDich DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_GD_CLICK FOREIGN KEY (idClick) REFERENCES THEODOI_CLICK(id),
    CONSTRAINT FK_GD_KH FOREIGN KEY (idKhachHang) REFERENCES KHACHHANG(idNguoiDung),
    CONSTRAINT FK_GD_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung),
    CONSTRAINT FK_GD_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id)
);

-- ============================================================
-- 6. TƯƠNG TÁC & TIN TỨC (PORTAL)
-- ============================================================
CREATE TABLE DANHGIA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idKhachHang INT NOT NULL,
    idDoiTac INT NOT NULL,
    diemRating TINYINT CHECK (diemRating BETWEEN 1 AND 5),
    noiDung TEXT NULL, 
    trangThaiDuyet VARCHAR(20) DEFAULT 'ChoDuyet',
    CONSTRAINT FK_DG_KH FOREIGN KEY (idKhachHang) REFERENCES KHACHHANG(idNguoiDung),
    CONSTRAINT FK_DG_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung)
);

CREATE TABLE TINTUC (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idNguoiDang INT NOT NULL, -- Đổi tên từ idAdmin thành idNguoiDang
    tieuDe VARCHAR(300) NOT NULL,
    noiDung TEXT NOT NULL, 
    ngayDang DATETIME DEFAULT CURRENT_TIMESTAMP,
    hinhAnh VARCHAR(500) NULL,
    trangThaiDuyet VARCHAR(20) DEFAULT 'ChoDuyet',
    CONSTRAINT FK_TT_NGUOIDUNG FOREIGN KEY (idNguoiDang) REFERENCES NGUOIDUNG(id)
);

-- ============================================================
-- 7. CHỈ MỤC TỐI ƯU HIỆU NĂNG (INDEXES)
-- ============================================================
CREATE INDEX IDX_CLICK_SP_TIME ON THEODOI_CLICK(idSanPham, thoiGianClick);
CREATE INDEX IDX_SP_DOITAC ON SANPHAM(idDoiTac);
CREATE INDEX IDX_SP_THUONGHIEU ON SANPHAM(idThuongHieu);
CREATE INDEX IDX_CONFIG_DOITAC ON CAUHINH_AFFILIATE(idDoiTac);
CREATE INDEX IDX_GIATRI_THUOCTINH_TIMKIEM ON GIATRI_THUOCTINH(giaTri); 
CREATE INDEX IDX_GD_TRANGTHAI ON GIAODICH_AFFILIATE(trangThaiXacThuc);

-- ============================================================
-- DỮ LIỆU TEST
-- ============================================================

-- ============================================================
-- 1. THÊM VAI TRÒ HỆ THỐNG
-- ============================================================
INSERT INTO VAITRO (tenVaiTro, moTa) VALUES
('Admin', 'Quản trị viên toàn quyền hệ thống'),
('KhachHang', 'Khách hàng mua sắm qua link Affiliate'),
('DoiTac', 'Đối tác cung cấp linh kiện / Nền tảng bán hàng');

-- ============================================================
-- 2. THÊM NGƯỜI DÙNG (TÀI KHOẢN ĐĂNG NHẬP)
-- ============================================================
INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, email, soDienThoai, ngaySinh, trangThai) VALUES
('admin', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'admin@lkmt.com', NULL, NULL, 'HoatDong'),
('khachhang1', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'khachhang1@gmail.com', '0901234567', '2000-05-15', 'HoatDong'),
('doitac_gearvn', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@gearvn.com', NULL, NULL, 'HoatDong'),
('doitac_hacom', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@hacom.vn', NULL, NULL, 'HoatDong');
-- ============================================================
-- 3. CẤP QUYỀN (MAP VAI TRÒ VÀO TÀI KHOẢN)
-- ============================================================
INSERT INTO VAITRO_NGUOIDUNG (idNguoiDung, idVaiTro) VALUES
(1, 1), 
(2, 2), 
(3, 3), 
(4, 3); 

-- ============================================================
-- 4. THÔNG TIN CHI TIẾT KHÁCH HÀNG
-- ============================================================
INSERT INTO KHACHHANG (idNguoiDung, hoTen, diemThuong) VALUES
(2, 'Nguyễn Văn Trải Nghiệm', 150);

-- ============================================================
-- 5. THÔNG TIN CHI TIẾT ĐỐI TÁC
-- ============================================================
INSERT INTO DOITACLIENKET (idNguoiDung, tenCongTy, websiteUrl, thoiHanHopDong, trangThaiDuyet) VALUES
(3, 'Công ty TNHH Thương Mại GearVN', 'https://gearvn.com', '2026-12-31', 'DaDuyet'),
(4, 'Công ty Cổ phần Hacom', 'https://hacom.vn', '2027-06-30', 'DaDuyet');

-- ============================================================
-- 6. THIẾT LẬP CẤU HÌNH HOA HỒNG (CAUHINH_AFFILIATE)
-- ============================================================
INSERT INTO CAUHINH_AFFILIATE (idAdmin, idDoiTac, phanTramHoaHong, phiMoiClick, ghiChu) VALUES
(1, 3, 5.50, 1000.00, 'Hợp đồng GearVN chuẩn 2026'),
(1, 4, 4.00, 800.00, 'Hợp đồng Hacom chuẩn 2026');

-- ============================================================
-- 7. DANH MỤC & THƯƠNG HIỆU SẢN PHẨM
-- ============================================================
INSERT INTO DANHMUC (tenDanhMuc, moTa) VALUES
('Vi Xử Lý', 'Chip xử lý trung tâm'),
('Bộ Nhớ RAM', 'Bo mạch kết nối linh kiện'),
('Lưu Trữ', 'Thiết bị lưu trữ dữ liệu và hệ điều hành.'),
('Bo Mạch Chủ', 'Bo mạch kết nối các linh kiện máy tính.'),
('Nguồn PSU', 'Cung cấp điện năng cho toàn hệ thống.'),
('Card Đồ Họa', 'Card đồ họa xử lý hình ảnh và video.');


INSERT INTO THUONGHIEU (tenThuongHieu, quocGia, logoUrl) VALUES
('Intel', 'USA', 'https://logo.com/intel.png'),
('AMD', 'USA', 'https://logo.com/amd.png'),
('ASUS', 'Taiwan', 'https://logo.com/asus.png'),
('Corsair', 'USA', 'https://logo.com/corsair.png');

-- ============================================================
-- 8. CẤU HÌNH BỘ LỌC ĐỘNG (EAV - THUOCTINH_LINHKIEN)
-- ============================================================
INSERT INTO THUOCTINH_LINHKIEN (tenThuocTinh, idDanhMuc) VALUES
('Socket', 1),              
('Số nhân / Số luồng', 1), 
('Dung lượng VRAM', 6),    
('Dung lượng RAM', 2),     
('Bus RAM', 2);             
-- ============================================================
-- 9. SẢN PHẨM & CẤU TRÚC JSON KỸ THUẬT
-- ============================================================
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, url, moTa, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES
(1, 3, 1, 'CPU Intel Core i9-14900K', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0NFMpVcAKYT_SSt11vtIp9_UO2Re3edqog&s', 'CPU cao cấp nhất thế hệ 14 của Intel.', '{"cache":"36MB"}', 15990000, 15490000, 50, 'https://gearvn.com/aff/cpu', 'DaDuyet'),
(1, 4, 2, 'CPU AMD Ryzen 9 7950X', 'https://cdn2.cellphones.com.vn/x/media/catalog/product/g/r/group_314_7_.png', 'Sức mạnh tối thượng từ AMD.', '{"cache":"64MB"}', 14500000, 14000000, 30, 'https://hacom.vn/aff/ryzen', 'DaDuyet'),
(6, 3, 3, 'VGA ASUS ROG Strix RTX 4090', 'https://hoanghapccdn.com/media/product/3625_asus_rog_strix_rtx4090_24g_gaming_2.jpg', 'Card đồ họa flagship, game 4K.', '{"cuda_cores":"16384"}', 60000000, 58000000, 10, 'https://gearvn.com/aff/asus', 'DaDuyet'),
(2, 4, 4, 'RAM Corsair Vengeance 32GB', 'https://nguyencongpc.vn/media/product/17942-corsair-vengeance-pro-rgb-32gb-1.JPG', 'Bộ nhớ DDR5 tốc độ siêu cao.', '{"latency":"CL36"}', 3500000, 3200000, 100, 'https://hacom.vn/aff/corsair', 'DaDuyet');
-- ============================================================
-- 10. GÁN GIÁ TRỊ CHI TIẾT BỘ LỌC CHO TỪNG SẢN PHẨM (GIATRI_THUOCTINH)
-- ============================================================
INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES
(1, 1, 'LGA 1700'),
(1, 2, '24 Nhân / 32 Luồng'),
(2, 1, 'AM5'),
(2, 2, '16 Nhân / 32 Luồng'),
(3, 3, '24 GB GDDR6X'),      
(4, 4, '32 GB (2x16GB)'),    
(4, 5, '6000 MHz');    

-- ============================================================
-- 11. DỮ LIỆU LOG CLICK & CHUYỂN ĐỔI GIAO DỊCH
-- ============================================================
INSERT INTO THEODOI_CLICK (idSanPham, idKhachHang, thoiGianClick, diaChiIP, trinhDuyetFingerprint, isHopLe) VALUES
(1, 2, CURRENT_TIMESTAMP - INTERVAL 2 DAY, '192.168.1.15', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0', 1),
(3, NULL, CURRENT_TIMESTAMP - INTERVAL 1 DAY, '113.190.23.45', 'Chrome/125.0.0.0 Safari/537.36', 1);

INSERT INTO GIAODICH_AFFILIATE (idClick, idKhachHang, idDoiTac, idSanPham, soLuong, tongGiaTri, hoaHongNhan, phuongThucTT, trangThaiXacThuc) VALUES
(1, 2, 3, 1, 1, 15490000, 851950.00, 'ChuyenKhoan', 'DaXacNhan');

-- ============================================================
-- 12. TƯƠNG TÁC (ĐÁNH GIÁ & TIN TỨC)
-- ============================================================
INSERT INTO DANHGIA (idKhachHang, idDoiTac, diemRating, noiDung, trangThaiDuyet) VALUES
(2, 3, 5, 'Link Affiliate chuyển hướng mượt mà, ghi nhận hoa hồng tức thì. Rất tuyệt!', 'DaDuyet');
-- 2. Bảng NGUOIDUNG (Thêm 3 Khách hàng và 3 Đối tác = 6 user để đủ dữ liệu map cho 2 bảng dưới)
INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, email, soDienThoai, ngaySinh, trangThai) VALUES
('khachhang2', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh2@gmail.com', '0912345678', '1998-02-20', 'HoatDong'),
('khachhang3', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh3@gmail.com', '0923456789', '2001-10-10', 'HoatDong'),
('khachhang4', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh4@gmail.com', '0934567890', '1995-08-08', 'HoatDong'),
('doitac_phongvu', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@phongvu.vn', NULL, NULL, 'HoatDong'),
('doitac_anphat', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@anphat.vn', NULL, NULL, 'HoatDong'),
('doitac_memoryzone', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@memoryzone.vn', NULL, NULL, 'HoatDong');
INSERT INTO TINTUC (idNguoiDang, tieuDe, noiDung) VALUES
(1, 'Cập nhật chính sách Affiliate Tháng 6/2026', 'Nâng mức hoa hồng cho nhóm VGA cao cấp lên 6%.'), -- Admin đăng (id = 1)
(8, 'Phong Vũ ra mắt chuỗi cửa hàng trải nghiệm PC High-End', 'Kính mời các bạn đến trải nghiệm trực tiếp...'), -- Đối tác Phong Vũ đăng (id = 8)
(5, 'Review nhanh nguồn Cooler Master MWE 750 sau 1 tháng', 'Mình mua về kéo RTX 4070 Ti chạy rất ổn định, nhiệt độ mát mẻ...'); -- Khách hàng đăng (id = 5)

USE LKMT_MoHinhWebCong;

-- ============================================================
-- THÊM 3 DÒNG DỮ LIỆU CHO MỖI BẢNG
-- ============================================================

-- 1. Bảng VAITRO (Thêm 3 vai trò vận hành)
INSERT INTO VAITRO (tenVaiTro, moTa) VALUES
('NhanVien', 'Nhân viên xử lý đơn hàng và hỗ trợ'),
('KeToan', 'Kế toán đối soát hoa hồng'),
('Marketing', 'Nhân viên chạy chiến dịch Affiliate');


-- (ID tự động sinh sẽ là: 5,6,7 cho Khách hàng | 8,9,10 cho Đối tác)

-- 3. Bảng VAITRO_NGUOIDUNG (Map quyền cho 6 user mới)
INSERT INTO VAITRO_NGUOIDUNG (idNguoiDung, idVaiTro) VALUES
(5, 2), (6, 2), (7, 2), -- idVaiTro 2 = KhachHang
(8, 3), (9, 3), (10, 3); -- idVaiTro 3 = DoiTac

-- 4. Bảng KHACHHANG (Thêm 3 khách hàng chi tiết)
INSERT INTO KHACHHANG (idNguoiDung, hoTen, diemThuong) VALUES
(5, 'Trần Lắp Ráp', 200),
(6, 'Lê Tản Nhiệt', 50),
(7, 'Phạm Ép Xung', 300);

-- 5. Bảng DOITACLIENKET (Thêm 3 đối tác chi tiết)
INSERT INTO DOITACLIENKET (idNguoiDung, tenCongTy, websiteUrl, thoiHanHopDong, trangThaiDuyet) VALUES
(8, 'Công ty CP TM-DV Phong Vũ', 'https://phongvu.vn', '2027-12-31', 'DaDuyet'),
(9, 'Công ty CP TM Máy Tính An Phát', 'https://anphatpc.com.vn', '2026-12-31', 'DaDuyet'),
(10, 'Công ty TNHH MemoryZone', 'https://memoryzone.com.vn', '2028-01-01', 'DaDuyet');

-- 6. Bảng CAUHINH_AFFILIATE (Thêm 3 cấu hình cho 3 đối tác mới)
INSERT INTO CAUHINH_AFFILIATE (idAdmin, idDoiTac, phanTramHoaHong, phiMoiClick, ghiChu) VALUES
(1, 8, 4.50, 1200.00, 'Hợp đồng Phong Vũ 2026'),
(1, 9, 5.00, 900.00, 'Hợp đồng An Phát PC'),
(1, 10, 6.00, 1500.00, 'Hợp đồng MemoryZone chuyên Storage/Tản nhiệt');


-- 8. Bảng THUONGHIEU (Thêm 3 thương hiệu)
INSERT INTO THUONGHIEU (tenThuongHieu, quocGia, logoUrl) VALUES
('Cooler Master', 'Taiwan', 'https://logo.com/coolermaster.png'),
('Samsung', 'Korea', 'https://logo.com/samsung.png'),
('Gigabyte', 'Taiwan', 'https://logo.com/gigabyte.png');
-- (ID tự động sinh: 5, 6, 7)

-- 9. Bảng THUOCTINH_LINHKIEN (Thêm 3 thuộc tính EAV)
INSERT INTO THUOCTINH_LINHKIEN (tenThuocTinh, idDanhMuc) VALUES
('Công suất thực (W)', 5),      
('Dung lượng lưu trữ', 3),      
('Chipset', 4);

-- 10. Bảng SANPHAM (Thêm 3 sản phẩm tương ứng 3 danh mục mới)
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, url, moTa, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES
(5, 8, 5, 'Nguồn Cooler Master MWE 750W', 'https://cdn.hstatic.net/products/200000320233/0001_b8fa8450fe554b4580030aaa5e05cd18.png', 'Bộ nguồn công suất thực.', '{"efficiency":"80 Plus Gold"}', 2500000, 2200000, 40, 'https://phongvu.vn/aff/psu', 'DaDuyet'),
(3, 9, 6, 'Ổ cứng SSD Samsung 990 Pro', 'https://hoanghapccdn.com/media/product/4662_samsung_990_pro_1tb_hatt3.jpg', 'Tốc độ đọc ghi siêu tốc.', '{"type":"NVMe"}', 2100000, 1950000, 25, 'https://anphat.vn/aff/ssd', 'DaDuyet'),
(4, 10, 7, 'Mainboard Gigabyte Z790', 'https://hoanghapccdn.com/media/product/3663_z790_ud_ac_ha1.jpg', 'Bo mạch chủ cao cấp.', '{"form_factor":"ATX"}', 2800000, 2600000, 15, 'https://memoryzone.vn/aff/main', 'DaDuyet');

-- 11. Bảng GIATRI_THUOCTINH (Gán giá trị thuộc tính cho 3 sản phẩm trên)
INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES
(5, 6, '750W'),                 
(6, 7, '1TB NVMe'),            
(7, 8, 'Z790');                

-- 12. Bảng THEODOI_CLICK (Giả lập 3 lượt click mới)
INSERT INTO THEODOI_CLICK (idSanPham, idKhachHang, thoiGianClick, diaChiIP, trinhDuyetFingerprint, isHopLe) VALUES
(5, 5, CURRENT_TIMESTAMP - INTERVAL 5 HOUR, '14.161.22.11', 'Chrome/125.0 Windows', 1),
(6, 6, CURRENT_TIMESTAMP - INTERVAL 3 HOUR, '171.224.55.66', 'Firefox/126.0 MacOS', 1),
(7, 7, CURRENT_TIMESTAMP - INTERVAL 1 HOUR, '113.160.77.88', 'Safari/17.0 iOS', 1);
-- (ID tự động sinh: 3, 4, 5)

-- 13. Bảng GIAODICH_AFFILIATE (Giả lập 3 giao dịch sinh ra từ 3 lượt click trên)
-- Công thức HH: Nguồn 2.2M x 4.5% = 99k | Case 1.95M x 5% = 97.5k | Tản 2.6M x 6% = 156k
INSERT INTO GIAODICH_AFFILIATE (idClick, idKhachHang, idDoiTac, idSanPham, soLuong, tongGiaTri, hoaHongNhan, phuongThucTT, trangThaiXacThuc) VALUES
(3, 5, 8, 5, 1, 2200000, 99000.00, 'Momo', 'DaXacNhan'),
(4, 6, 9, 6, 1, 1950000, 97500.00, 'ZaloPay', 'DaXacNhan'),
(5, 7, 10, 7, 1, 2600000, 156000.00, 'ChuyenKhoan', 'ChoDuyet');

-- 14. Bảng DANHGIA (3 khách hàng đánh giá 3 đối tác)
INSERT INTO DANHGIA (idKhachHang, idDoiTac, diemRating, noiDung, trangThaiDuyet) VALUES
(5, 8, 5, 'Giao hàng nhanh, nguồn xịn, link ghi nhận chuẩn.', 'DaDuyet'),
(6, 9, 4, 'Case đẹp nhưng giá chưa tốt nhất, phần mềm web affilitate chạy ok.', 'DaDuyet'),
(7, 10, 5, 'Tản nhiệt êm, đối soát hoa hồng của trang web rất minh bạch.', 'ChoDuyet');

USE LKMT_MoHinhWebCong;

-- ============================================================
-- THÊM 20 SẢN PHẨM TEST (ĐỦ 6 DANH MỤC)
-- ============================================================
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, url, moTa, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES

-- 1. DANH MỤC CPU (idDanhMuc = 1)
(1, 3, 1, 'CPU Intel Core i7-14700K', 'https://product.hstatic.net/1000372174/product/2ecb0f10ca95c2487331e87962b65244-hi_8fbc24992bd24bc88dfc6b8450446e30_1024x1024.jpg', 'CPU Intel Core i7 thế hệ 14 mới nhất.', '{"cache":"33MB"}', 11500000, 11000000, 40, 'https://gearvn.com/aff/i7', 'DaDuyet'),
(1, 4, 1, 'CPU Intel Core i5-13400F', 'https://cdn.thuancomputer.com/2024/09/cpu-intel-core-i5-13400f-box-chinh-hang.jpg', 'CPU quốc dân cho nhu cầu gaming và làm việc.', '{"cache":"20MB"}', 5500000, 5200000, 60, 'https://hacom.vn/aff/i5', 'DaDuyet'),
(1, 8, 2, 'CPU AMD Ryzen 7 7800X3D', 'https://file.hstatic.net/200000420363/file/cpu-amd-ryzen-7-7800x3d-tray-new-1.jpg', 'CPU gaming mạnh nhất hiện tại của AMD.', '{"cache":"96MB"}', 10500000, 10200000, 25, 'https://phongvu.vn/aff/r7', 'DaDuyet'),
(1, 9, 2, 'CPU AMD Ryzen 5 7600X', 'https://cdn2.cellphones.com.vn/x/media/catalog/product/t/_/t_i_xu_ng_-_2023-01-02t221507.270.png', 'Hiệu năng tuyệt vời trong phân khúc tầm trung.', '{"cache":"32MB"}', 6000000, 5800000, 50, 'https://anphat.vn/aff/r5', 'DaDuyet'),

-- 2. DANH MỤC RAM (idDanhMuc = 2)
(2, 10, 4, 'RAM Corsair Dominator Platinum 32GB', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/dominator-platinum-rgb-ddr4-kit-03-2a9cf813-6804-47e0-8c0a-40cfa15e541e-57726028-66cb-4e26-8219-3d540c2c16e1.jpg?v=1608047597160', 'RAM cao cấp trang bị LED RGB Capellix siêu sáng.', '{"latency":"CL32"}', 4500000, 4200000, 30, 'https://memoryzone.vn/aff/ram1', 'DaDuyet'),
(2, 3, 4, 'RAM Corsair Vengeance LPX 16GB DDR4', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/ram-pc-corsair-vengeance-lpx-16gb-3200mhz-ddr4-2x8gb-cmk16gx4m2e3200c16-1-603a349a-dd64-4854-865c-4c3a666e114c-5dbb9786-3c71-494b-b70c-53ef4108edf2-9f3e05ae-5461-4eb0-8bf7-f330516ab239.jpg?v=1758522711960', 'Dòng RAM DDR4 giá rẻ, tản nhiệt nhôm bền bỉ.', '{"latency":"CL16"}', 1200000, 1050000, 100, 'https://gearvn.com/aff/ram2', 'DaDuyet'),

-- 3. DANH MỤC LƯU TRỮ (idDanhMuc = 3)
(3, 4, 6, 'SSD Samsung 980 Pro 1TB', 'https://nguyencongpc.vn/media/product/17066-samsung-980-pro-1tb-1.JPG', 'Ổ cứng SSD NVMe Gen 4 siêu tốc từ Samsung.', '{"type":"NVMe Gen4"}', 2500000, 2300000, 45, 'https://hacom.vn/aff/ssd1', 'DaDuyet'),
(3, 8, 6, 'SSD Samsung 870 EVO 500GB', 'https://product.hstatic.net/200000420363/product/mz-77e500bw_7cea68ac9a3b4833ad6fe74a9028891b_master.jpg', 'Ổ cứng SSD chuẩn SATA III cho máy tính đời cũ.', '{"type":"SATA III"}', 1100000, 990000, 80, 'https://phongvu.vn/aff/ssd2', 'DaDuyet'),
(3, 9, 4, 'SSD Corsair MP600 Pro 2TB', 'https://product.hstatic.net/200000536009/product/.2-ssd-_cssd-f1000gbmp600pnh_4_062ba04f4c2241d2b391113faf79cc6a_master_03fded50f8fc4f5fb93b3ed0475e9721_master.jpg', 'SSD Gen4 cao cấp tích hợp tản nhiệt nhôm dày.', '{"type":"NVMe Gen4"}', 6500000, 6200000, 15, 'https://anphat.vn/aff/ssd3', 'DaDuyet'),

-- 4. DANH MỤC BO MẠCH CHỦ (idDanhMuc = 4)
(4, 10, 3, 'Mainboard ASUS ROG Maximus Z790 Hero', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrhT8oGAQ2yoKOfwaccUxG8eN1vG2DrpVDg&s', 'Bo mạch chủ siêu cao cấp thiết kế riêng cho Intel.', '{"form_factor":"ATX"}', 16000000, 15500000, 5, 'https://memoryzone.vn/aff/main1', 'DaDuyet'),
(4, 3, 3, 'Mainboard ASUS TUF Gaming B760M-PLUS', 'https://bizweb.dktcdn.net/100/492/473/products/thanhphatdesktopweb-2025mainboardasusasus-tuf-gaming-b760m-e-d4-1.jpg?v=1745578488660', 'Bo mạch chủ tầm trung chuẩn quân đội siêu bền.', '{"form_factor":"mATX"}', 4000000, 3800000, 40, 'https://gearvn.com/aff/main2', 'DaDuyet'),
(4, 4, 7, 'Mainboard Gigabyte B650 AORUS ELITE', 'https://cdn.hstatic.net/products/200000420363/670_copy_caaecbed24ca46eca3f4ce7c978cc28b_master.jpg', 'Lựa chọn cân bằng hoàn hảo cho dòng chip AMD AM5.', '{"form_factor":"ATX"}', 5500000, 5200000, 25, 'https://hacom.vn/aff/main3', 'DaDuyet'),
(4, 8, 7, 'Mainboard Gigabyte X670 AORUS ELITE', 'https://nguyencongpc.vn/media/product/23513-mainboard-gigabyte-x670-aorus-elite-ax--phi--n-b---n-1-0--4.jpeg', 'Bo mạch chủ chipset X670 hỗ trợ ép xung mạnh mẽ.', '{"form_factor":"ATX"}', 7500000, 7200000, 15, 'https://phongvu.vn/aff/main4', 'DaDuyet'),

-- 5. DANH MỤC NGUỒN PSU (idDanhMuc = 5)
(5, 9, 5, 'Nguồn Cooler Master MWE Bronze 650W', 'https://phucanhcdn.com/media/product/31102_ngu____n_cooler_master_mwe_650w__80_plus_bronze_1_1.png', 'Nguồn quốc dân chuẩn 80 Plus Bronze đáng tin cậy.', '{"efficiency":"80 Plus Bronze"}', 1300000, 1150000, 60, 'https://anphat.vn/aff/psu1', 'DaDuyet'),
(5, 10, 4, 'Nguồn Corsair RM850x 850W Gold', 'https://www.tncstore.vn/media/product/9918-nguon-corsair-rm850x-shift-850w.jpg', 'Nguồn Full Modular cao cấp, chuẩn 80 Plus Gold.', '{"efficiency":"80 Plus Gold"}', 3500000, 3300000, 20, 'https://memoryzone.vn/aff/psu2', 'DaDuyet'),
(5, 3, 3, 'Nguồn ASUS ROG Thor 1000W Platinum', 'https://product.hstatic.net/1000333506/product/h525_70cac1ecb39b4d30b34dcf3eb6f2a520.png', 'Nguồn siêu cấp tích hợp màn hình OLED hiển thị công suất.', '{"efficiency":"80 Plus Platinum"}', 8500000, 8100000, 10, 'https://gearvn.com/aff/psu3', 'DaDuyet'),

-- 6. DANH MỤC CARD ĐỒ HỌA (idDanhMuc = 6)
(6, 4, 3, 'VGA ASUS TUF Gaming RTX 4070 Ti', 'https://product.hstatic.net/1000333506/product/w800_9066c796406a440592c5ef21ac356571.png', 'Card đồ họa cực êm mát, tối ưu cho độ phân giải 2K.', '{"cuda_cores":"7680"}', 23000000, 22500000, 15, 'https://hacom.vn/aff/vga1', 'DaDuyet'),
(6, 8, 7, 'VGA Gigabyte RTX 4060 Ti Gaming OC', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSNKYb1kebXzwnloPIyIcZc_bJmoEMjfvVQ&s', 'Sự lựa chọn hoàn hảo cho game thủ E-Sport 1080p.', '{"cuda_cores":"4352"}', 11500000, 11000000, 30, 'https://phongvu.vn/aff/vga2', 'DaDuyet'),
(6, 9, 3, 'VGA ASUS Dual Radeon RX 7600', 'https://bizweb.dktcdn.net/100/440/968/products/29491-vga-asus-dual-radeon-rx-7600-evo-oc-8gb-gddr6-dual-rx7600-o8g-evo-8.jpg?v=1755743933607', 'Card đồ họa đội đỏ mạnh mẽ, giá thành hợp lý.', '{"stream_processors":"2048"}', 7500000, 7200000, 25, 'https://anphat.vn/aff/vga3', 'DaDuyet'),
(6, 10, 7, 'VGA Gigabyte AORUS RTX 4080 Master', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rnh8QztKFISCuWPjMyeLcvUNNebS3w_GRQ&s', 'Quái vật hiệu năng với hệ thống tản nhiệt cực khủng.', '{"cuda_cores":"9728"}', 38000000, 36500000, 8, 'https://memoryzone.vn/aff/vga4', 'DaDuyet');

INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES

-- Nhóm 1: CPU (Cần gán Socket id=1, Số nhân id=2)
(8, 1, 'LGA 1700'), (8, 2, '20 Nhân / 28 Luồng'),     -- id 8: Core i7-14700K
(9, 1, 'LGA 1700'), (9, 2, '10 Nhân / 16 Luồng'),     -- id 9: Core i5-13400F
(10, 1, 'AM5'), (10, 2, '8 Nhân / 16 Luồng'),         -- id 10: Ryzen 7 7800X3D
(11, 1, 'AM5'), (11, 2, '6 Nhân / 12 Luồng'),         -- id 11: Ryzen 5 7600X

-- Nhóm 2: RAM (Cần gán Dung lượng id=4, Bus id=5)
(12, 4, '32 GB (2x16GB)'), (12, 5, '6200 MHz'),       -- id 12: Corsair Dominator 32GB
(13, 4, '16 GB (2x8GB)'), (13, 5, '3200 MHz'),        -- id 13: Corsair Vengeance 16GB

-- Nhóm 3: Lưu Trữ (Cần gán Dung lượng id=7)
(14, 7, '1TB'),                                       -- id 14: SSD Samsung 980 Pro
(15, 7, '500GB'),                                     -- id 15: SSD Samsung 870 EVO
(16, 7, '2TB'),                                       -- id 16: SSD Corsair MP600 Pro

-- Nhóm 4: Mainboard (Cần gán Chipset id=8)
(17, 8, 'Z790'),                                      -- id 17: ROG Maximus Z790
(18, 8, 'B760'),                                      -- id 18: TUF Gaming B760M
(19, 8, 'B650'),                                      -- id 19: AORUS ELITE B650
(20, 8, 'X670'),                                      -- id 20: AORUS ELITE X670

-- Nhóm 5: Nguồn PSU (Cần gán Công suất id=6)
(21, 6, '650W'),                                      -- id 21: MWE Bronze 650W
(22, 6, '850W'),                                      -- id 22: RM850x
(23, 6, '1000W'),                                     -- id 23: ROG Thor 1000W

-- Nhóm 6: VGA Card Đồ Họa (Cần gán VRAM id=3)
(24, 3, '12 GB GDDR6X'),                              -- id 24: TUF RTX 4070 Ti
(25, 3, '8 GB GDDR6'),                                -- id 25: Gigabyte RTX 4060 Ti
(26, 3, '8 GB GDDR6'),                                -- id 26: ASUS RX 7600
(27, 3, '16 GB GDDR6X');                              -- id 27: AORUS RTX 4080

select * from nguoidung