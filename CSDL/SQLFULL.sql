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
    idAdmin INT NOT NULL,
    tieuDe VARCHAR(300) NOT NULL,
    noiDung TEXT NOT NULL, 
    ngayDang DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_TT_ADMIN FOREIGN KEY (idAdmin) REFERENCES NGUOIDUNG(id)
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
('CPU - Bộ vi xử lý', 'Chip vi xử lý trung tâm'),
('Mainboard - Bo mạch chủ', 'Bo mạch kết nối linh kiện'),
('VGA - Card màn hình', 'Card đồ họa xử lý hình ảnh'),
('RAM - Bộ nhớ trong', 'Bộ nhớ truy cập ngẫu nhiên');

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
('Chipset', 2),            
('Dung lượng VRAM', 3),    
('Dung lượng RAM', 4),     
('Bus RAM', 4);            

-- ============================================================
-- 9. SẢN PHẨM & CẤU TRÚC JSON KỸ THUẬT
-- ============================================================
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES
(1, 3, 1, 'CPU Intel Core i9-14900K', '{"cache":"36MB", "tdp":"125W"}', 15990000, 15490000, 50, 'https://gearvn.com/aff/cpu-i9-14900k?ref=portal', 'DaDuyet'),
(1, 4, 2, 'CPU AMD Ryzen 9 7950X', '{"cache":"64MB", "tdp":"170W"}', 14500000, 14000000, 30, 'https://hacom.vn/aff/ryzen-9-7950x?ref=portal', 'DaDuyet'),
(3, 3, 3, 'VGA ASUS ROG Strix RTX 4090 24GB', '{"cuda_cores":"16384"}', 60000000, 58000000, 10, 'https://gearvn.com/aff/asus-rtx4090?ref=portal', 'DaDuyet'),
(4, 4, 4, 'RAM Corsair Vengeance RGB 32GB DDR5', '{"latency":"CL36"}', 3500000, 3200000, 100, 'https://hacom.vn/aff/corsair-32gb-ddr5?ref=portal', 'DaDuyet');

-- ============================================================
-- 10. GÁN GIÁ TRỊ CHI TIẾT BỘ LỌC CHO TỪNG SẢN PHẨM (GIATRI_THUOCTINH)
-- ============================================================
INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES
(1, 1, 'LGA 1700'),            
(1, 2, '24 Nhân / 32 Luồng'), 
(2, 1, 'AM5'),                 
(2, 2, '16 Nhân / 32 Luồng'), 
(3, 4, '24 GB GDDR6X'),        
(4, 5, '32 GB (2x16GB)'),      
(4, 6, '6000 MHz');            

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

INSERT INTO TINTUC (idAdmin, tieuDe, noiDung) VALUES
(1, 'Cập nhật chính sách Affiliate Tháng 6/2026', 'Nâng mức hoa hồng cho nhóm VGA cao cấp lên 6%. Mọi người chú ý đẩy số nhé!');

USE LKMT_MoHinhWebCong;

-- ============================================================
-- THÊM 3 DÒNG DỮ LIỆU CHO MỖI BẢNG
-- ============================================================

-- 1. Bảng VAITRO (Thêm 3 vai trò vận hành)
INSERT INTO VAITRO (tenVaiTro, moTa) VALUES
('NhanVien', 'Nhân viên xử lý đơn hàng và hỗ trợ'),
('KeToan', 'Kế toán đối soát hoa hồng'),
('Marketing', 'Nhân viên chạy chiến dịch Affiliate');

-- 2. Bảng NGUOIDUNG (Thêm 3 Khách hàng và 3 Đối tác = 6 user để đủ dữ liệu map cho 2 bảng dưới)
INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, email, soDienThoai, ngaySinh, trangThai) VALUES
('khachhang2', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh2@gmail.com', '0912345678', '1998-02-20', 'HoatDong'),
('khachhang3', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh3@gmail.com', '0923456789', '2001-10-10', 'HoatDong'),
('khachhang4', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'kh4@gmail.com', '0934567890', '1995-08-08', 'HoatDong'),
('doitac_phongvu', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@phongvu.vn', NULL, NULL, 'HoatDong'),
('doitac_anphat', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@anphat.vn', NULL, NULL, 'HoatDong'),
('doitac_memoryzone', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@memoryzone.vn', NULL, NULL, 'HoatDong');
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

-- 7. Bảng DANHMUC (Thêm 3 danh mục linh kiện)
INSERT INTO DANHMUC (tenDanhMuc, moTa) VALUES
('PSU - Nguồn máy tính', 'Cung cấp điện năng cho toàn hệ thống'),
('Case - Vỏ máy tính', 'Bảo vệ và chứa linh kiện PC'),
('Cooling - Tản nhiệt', 'Tản nhiệt khí, tản nhiệt nước cho PC');
-- (ID tự động sinh: 5, 6, 7)

-- 8. Bảng THUONGHIEU (Thêm 3 thương hiệu)
INSERT INTO THUONGHIEU (tenThuongHieu, quocGia, logoUrl) VALUES
('Cooler Master', 'Taiwan', 'https://logo.com/coolermaster.png'),
('NZXT', 'USA', 'https://logo.com/nzxt.png'),
('Noctua', 'Austria', 'https://logo.com/noctua.png');
-- (ID tự động sinh: 5, 6, 7)

-- 9. Bảng THUOCTINH_LINHKIEN (Thêm 3 thuộc tính EAV)
INSERT INTO THUOCTINH_LINHKIEN (tenThuocTinh, idDanhMuc) VALUES
('Công suất thực (W)', 5),      -- id 7 thuộc Nguồn
('Chuẩn kích thước', 6),        -- id 8 thuộc Case
('Loại tản nhiệt', 7);          -- id 9 thuộc Cooling

-- 10. Bảng SANPHAM (Thêm 3 sản phẩm tương ứng 3 danh mục mới)
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES
(5, 8, 5, 'Nguồn Cooler Master MWE Gold 750 V2', '{"efficiency":"80 Plus Gold"}', 2500000, 2200000, 40, 'https://phongvu.vn/aff/psu-cm-750w', 'DaDuyet'),
(6, 9, 6, 'Vỏ case NZXT H510 Flow', '{"color":"Matte Black"}', 2100000, 1950000, 25, 'https://anphat.vn/aff/case-nzxt-h510', 'DaDuyet'),
(7, 10, 7, 'Tản nhiệt khí Noctua NH-D15', '{"fan_speed":"1500 RPM"}', 2800000, 2600000, 15, 'https://memoryzone.vn/aff/noctua-d15', 'DaDuyet');
-- (ID tự động sinh: 5, 6, 7)

-- 11. Bảng GIATRI_THUOCTINH (Gán giá trị thuộc tính cho 3 sản phẩm trên)
INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES
(5, 7, '750W'),               -- Nguồn Cooler Master -> Công suất 750W
(6, 8, 'ATX / Micro-ATX'),    -- Case NZXT -> Chuẩn kích thước main
(7, 9, 'Tản nhiệt khí');      -- Tản Noctua -> Loại tản nhiệt khí

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

-- 15. Bảng TINTUC (Admin đăng 3 bài tin tức)
INSERT INTO TINTUC (idAdmin, tieuDe, noiDung) VALUES
(1, 'Top 5 Nguồn máy tính bán chạy tháng này', 'Đẩy mạnh bán các mã nguồn 750W đang có chiết khấu 5% từ Phong Vũ...'),
(1, 'Hướng dẫn tối ưu chuyển đổi Affiliate qua Facebook Ads', 'Sử dụng tracking link kết hợp pixel để đo lường tỷ lệ mua hàng...'),
(1, 'Thông báo bảo trì hệ thống ghi nhận Click', 'Hệ thống sẽ bảo trì từ 2h-4h sáng mai, các click trong thời gian này vẫn được lưu cache an toàn.');
SELECT * FROM NGUOIDUNG;
select * from VAITRO_NGUOIDUNG;
select * from giaodich_affiliate;
select * from sanpham;
select * from doitaclienket;