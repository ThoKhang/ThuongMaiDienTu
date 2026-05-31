-- ============================================================
-- THIET KE CO SO DU LIEU PORTAL AFFILIATE LINH KIEN MAY TINH
-- Tích hợp RBAC Model, EAV Filter & Truy vết Affiliate khép kín
-- ============================================================
USE master;
IF EXISTS (SELECT * FROM sys.databases WHERE name = N'LKMT_MoHinhWebCong')
BEGIN
    USE master;
    ALTER DATABASE LKMT_MoHinhWebCong SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE LKMT_MoHinhWebCong;
END
GO
create database LKMT_MoHinhWebCong
go 
use LKMT_MoHinhWebCong
go
-- ============================================================
-- 1. QUẢN LÝ PHÂN QUYỀN & TÀI KHOẢN (RBAC)
-- ============================================================
CREATE TABLE VAITRO (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenVaiTro NVARCHAR(50) NOT NULL UNIQUE, -- Admin, KhachHang, DoiTac
    moTa NVARCHAR(255) NULL
);

CREATE TABLE NGUOIDUNG (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenDangNhap VARCHAR(100) NOT NULL UNIQUE,
    matKhau VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    trangThai NVARCHAR(20) DEFAULT N'HoatDong',
    ngayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE VAITRO_NGUOIDUNG (
    idNguoiDung INT NOT NULL,
    idVaiTro INT NOT NULL,
    ngayCapQuyen DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (idNguoiDung, idVaiTro), 
    CONSTRAINT FK_VN_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE,
    CONSTRAINT FK_VN_VT FOREIGN KEY (idVaiTro) REFERENCES VAITRO(id) ON DELETE CASCADE
);

-- ============================================================
-- 2. THỰC THỂ CHI TIẾT NGƯỜI DÙNG
-- ============================================================
CREATE TABLE KHACHHANG (
    idNguoiDung INT PRIMARY KEY,
    hoTen NVARCHAR(150) NOT NULL,
    diemThuong INT DEFAULT 0,
    ngaySinh DATE NULL,
    soDienThoai VARCHAR(15) NULL,
    CONSTRAINT FK_KH_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE
);

CREATE TABLE DOITACLIENKET (
    idNguoiDung INT PRIMARY KEY,
    tenCongTy NVARCHAR(200) NOT NULL,
    websiteUrl VARCHAR(300) NULL,
    thoiHanHopDong DATE NULL,
    trangThaiDuyet NVARCHAR(20) DEFAULT N'ChoDuyet',
    CONSTRAINT FK_DT_ND FOREIGN KEY (idNguoiDung) REFERENCES NGUOIDUNG(id) ON DELETE CASCADE
);

-- ============================================================
-- 3. CẤU HÌNH AFFILIATE 
-- ============================================================
CREATE TABLE CAUHINH_AFFILIATE (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idAdmin INT NOT NULL,           
    idDoiTac INT NOT NULL,          
    phanTramHoaHong DECIMAL(5,2) DEFAULT 0, 
    phiMoiClick DECIMAL(18,2) DEFAULT 0,
    ngayCapNhat DATETIME DEFAULT GETDATE(),
    ghiChu NVARCHAR(MAX) NULL, -- Đã tối ưu từ NTEXT
    CONSTRAINT FK_CH_ADMIN FOREIGN KEY (idAdmin) REFERENCES NGUOIDUNG(id),
    CONSTRAINT FK_CH_DOITAC FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung) ON DELETE CASCADE
);

-- ============================================================
-- 4. QUẢN LÝ SẢN PHẨM & BỘ LỌC ĐẶC THÙ LINH KIỆN
-- ============================================================
CREATE TABLE DANHMUC (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenDanhMuc NVARCHAR(150) NOT NULL UNIQUE,
    moTa NVARCHAR(MAX) NULL
);

CREATE TABLE THUONGHIEU (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenThuongHieu NVARCHAR(100) NOT NULL UNIQUE,
    quocGia NVARCHAR(100) NULL,
    logoUrl VARCHAR(500) NULL
);

CREATE TABLE SANPHAM (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idDanhMuc INT NOT NULL,
    idDoiTac INT NOT NULL, 
    idThuongHieu INT NOT NULL, 
    tenSanPham NVARCHAR(200) NOT NULL,
    thongSoKyThuat NVARCHAR(MAX) NULL, -- Lưu cấu trúc JSON chung
    giaNiemYet DECIMAL(18,2) NOT NULL DEFAULT 0,
    giaKhuyenMai DECIMAL(18,2) DEFAULT 0,
    soLuongTon INT DEFAULT 0, -- Quản lý kho từ phía Đối tác
    urlAffiliate VARCHAR(500) NOT NULL,
    tinhTrangDuyet NVARCHAR(20) DEFAULT N'ChoDuyet',
    CONSTRAINT FK_SP_DM FOREIGN KEY (idDanhMuc) REFERENCES DANHMUC(id),
    CONSTRAINT FK_SP_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung),
    CONSTRAINT FK_SP_TH FOREIGN KEY (idThuongHieu) REFERENCES THUONGHIEU(id)
);

-- BỘ LỌC ĐỘNG (EAV) - Giải pháp lọc Socket, RAM, Công suất...
CREATE TABLE THUOCTINH_LINHKIEN (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tenThuocTinh NVARCHAR(100) NOT NULL,
    idDanhMuc INT NOT NULL, 
    CONSTRAINT FK_TT_DM FOREIGN KEY (idDanhMuc) REFERENCES DANHMUC(id)
);

CREATE TABLE GIATRI_THUOCTINH (
    idSanPham INT NOT NULL,
    idThuocTinh INT NOT NULL,
    giaTri NVARCHAR(255) NOT NULL, 
    PRIMARY KEY (idSanPham, idThuocTinh),
    CONSTRAINT FK_GT_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id) ON DELETE CASCADE,
    CONSTRAINT FK_GT_TT FOREIGN KEY (idThuocTinh) REFERENCES THUOCTINH_LINHKIEN(id)
);

-- ============================================================
-- 5. THEO DÕI LUỒNG CHUYỂN ĐỔI (CLICK -> GIAO DỊCH)
-- ============================================================
CREATE TABLE THEODOI_CLICK (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    idSanPham INT NOT NULL,
    idKhachHang INT NULL, 
    thoiGianClick DATETIME DEFAULT GETDATE(),
    diaChiIP VARCHAR(50),
    trinhDuyetFingerprint NVARCHAR(500),
    isHopLe BIT DEFAULT 1, 
    CONSTRAINT FK_CLICK_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id)
);

-- Thiết kế khép kín hoàn toàn để tính toán được tiền hoa hồng
CREATE TABLE GIAODICH_AFFILIATE (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idClick BIGINT NOT NULL, 
    idKhachHang INT NULL, 
    idDoiTac INT NOT NULL, 
    idSanPham INT NOT NULL,
    soLuong INT DEFAULT 1,
    tongGiaTri DECIMAL(18,2) NOT NULL, 
    hoaHongNhan DECIMAL(18,2) NOT NULL, 
    phuongThucTT NVARCHAR(50) NOT NULL, 
    trangThaiXacThuc NVARCHAR(50) DEFAULT N'ChoDuyet', 
    ngayGiaoDich DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_GD_CLICK FOREIGN KEY (idClick) REFERENCES THEODOI_CLICK(id),
    CONSTRAINT FK_GD_KH FOREIGN KEY (idKhachHang) REFERENCES KHACHHANG(idNguoiDung),
    CONSTRAINT FK_GD_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung),
    CONSTRAINT FK_GD_SP FOREIGN KEY (idSanPham) REFERENCES SANPHAM(id)
);

-- ============================================================
-- 6. TƯƠNG TÁC & TIN TỨC (PORTAL)
-- ============================================================
CREATE TABLE DANHGIA (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idKhachHang INT NOT NULL,
    idDoiTac INT NOT NULL,
    diemRating TINYINT CHECK (diemRating BETWEEN 1 AND 5),
    noiDung NVARCHAR(MAX) NULL, 
    trangThaiDuyet NVARCHAR(20) DEFAULT N'ChoDuyet',
    CONSTRAINT FK_DG_KH FOREIGN KEY (idKhachHang) REFERENCES KHACHHANG(idNguoiDung),
    CONSTRAINT FK_DG_DT FOREIGN KEY (idDoiTac) REFERENCES DOITACLIENKET(idNguoiDung)
);

CREATE TABLE TINTUC (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idAdmin INT NOT NULL,
    tieuDe NVARCHAR(300) NOT NULL,
    noiDung NVARCHAR(MAX) NOT NULL, 
    ngayDang DATETIME DEFAULT GETDATE(),
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
GO

-- dữ liệu test 
USE LKMT_MoHinhWebCong;
GO

-- ============================================================
-- 1. THÊM VAI TRÒ HỆ THỐNG
-- ============================================================
INSERT INTO VAITRO (tenVaiTro, moTa) VALUES
('Admin', N'Quản trị viên toàn quyền hệ thống'),
('KhachHang', N'Khách hàng mua sắm qua link Affiliate'),
('DoiTac', N'Đối tác cung cấp linh kiện / Nền tảng bán hàng');
-- (Các ID tự động sinh: 1=Admin, 2=KhachHang, 3=DoiTac)

-- ============================================================
-- 2. THÊM NGƯỜI DÙNG (TÀI KHOẢN ĐĂNG NHẬP)
-- Lưu ý: Mật khẩu dưới đây là mã hash BCrypt của chuỗi "123456"
-- ============================================================
INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, email, trangThai) VALUES
('admin', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'admin@lkmt.com', N'HoatDong'),
('khachhang1', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'khachhang1@gmail.com', N'HoatDong'),
('doitac_gearvn', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@gearvn.com', N'HoatDong'),
('doitac_hacom', '$2a$12$KrbJEqKkvVLx6rkJSKep9ek/bNURJloykmEB0tyMovIVo7x0Y3HYK', 'contact@hacom.vn', N'HoatDong');
-- (Các ID: 1=admin, 2=khachhang1, 3=gearvn, 4=hacom)

-- ============================================================
-- 3. CẤP QUYỀN (MAP VAI TRÒ VÀO TÀI KHOẢN)
-- ============================================================
INSERT INTO VAITRO_NGUOIDUNG (idNguoiDung, idVaiTro) VALUES
(1, 1), -- Gán quyền Admin cho tk admin
(2, 2), -- Gán quyền KhachHang cho tk khachhang1
(3, 3), -- Gán quyền DoiTac cho tk doitac_gearvn
(4, 3); -- Gán quyền DoiTac cho tk doitac_hacom

-- ============================================================
-- 4. THÔNG TIN CHI TIẾT KHÁCH HÀNG
-- ============================================================
INSERT INTO KHACHHANG (idNguoiDung, hoTen, diemThuong, ngaySinh, soDienThoai) VALUES
(2, N'Nguyễn Văn Trải Nghiệm', 150, '2000-05-15', '0901234567');

-- ============================================================
-- 5. THÔNG TIN CHI TIẾT ĐỐI TÁC
-- ============================================================
INSERT INTO DOITACLIENKET (idNguoiDung, tenCongTy, websiteUrl, thoiHanHopDong, trangThaiDuyet) VALUES
(3, N'Công ty TNHH Thương Mại GearVN', 'https://gearvn.com', '2026-12-31', N'DaDuyet'),
(4, N'Công ty Cổ phần Hacom', 'https://hacom.vn', '2027-06-30', N'DaDuyet');

-- ============================================================
-- 6. THIẾT LẬP CẤU HÌNH HOA HỒNG (CAUHINH_AFFILIATE)
-- ============================================================
INSERT INTO CAUHINH_AFFILIATE (idAdmin, idDoiTac, phanTramHoaHong, phiMoiClick, ghiChu) VALUES
(1, 3, 5.50, 1000.00, N'Hợp đồng GearVN chuẩn 2026'),
(1, 4, 4.00, 800.00, N'Hợp đồng Hacom chuẩn 2026');

-- ============================================================
-- 7. DANH MỤC & THƯƠNG HIỆU SẢN PHẨM
-- ============================================================
INSERT INTO DANHMUC (tenDanhMuc, moTa) VALUES
(N'CPU - Bộ vi xử lý', N'Chip vi xử lý trung tâm'),
(N'Mainboard - Bo mạch chủ', N'Bo mạch kết nối linh kiện'),
(N'VGA - Card màn hình', N'Card đồ họa xử lý hình ảnh'),
(N'RAM - Bộ nhớ trong', N'Bộ nhớ truy cập ngẫu nhiên');

INSERT INTO THUONGHIEU (tenThuongHieu, quocGia, logoUrl) VALUES
('Intel', 'USA', 'https://logo.com/intel.png'),
('AMD', 'USA', 'https://logo.com/amd.png'),
('ASUS', 'Taiwan', 'https://logo.com/asus.png'),
('Corsair', 'USA', 'https://logo.com/corsair.png');

-- ============================================================
-- 8. CẤU HÌNH BỘ LỌC ĐỘNG (EAV - THUOCTINH_LINHKIEN)
-- ============================================================
INSERT INTO THUOCTINH_LINHKIEN (tenThuocTinh, idDanhMuc) VALUES
(N'Socket', 1),             -- id 1 thuộc CPU
(N'Số nhân / Số luồng', 1), -- id 2 thuộc CPU
(N'Chipset', 2),            -- id 3 thuộc Mainboard
(N'Dung lượng VRAM', 3),    -- id 4 thuộc VGA
(N'Dung lượng RAM', 4),     -- id 5 thuộc RAM
(N'Bus RAM', 4);            -- id 6 thuộc RAM

-- ============================================================
-- 9. SẢN PHẨM & CẤU TRÚC JSON KỸ THUẬT
-- ============================================================
INSERT INTO SANPHAM (idDanhMuc, idDoiTac, idThuongHieu, tenSanPham, thongSoKyThuat, giaNiemYet, giaKhuyenMai, soLuongTon, urlAffiliate, tinhTrangDuyet) VALUES
(1, 3, 1, N'CPU Intel Core i9-14900K', N'{"cache":"36MB", "tdp":"125W"}', 15990000, 15490000, 50, 'https://gearvn.com/aff/cpu-i9-14900k?ref=portal', N'DaDuyet'),
(1, 4, 2, N'CPU AMD Ryzen 9 7950X', N'{"cache":"64MB", "tdp":"170W"}', 14500000, 14000000, 30, 'https://hacom.vn/aff/ryzen-9-7950x?ref=portal', N'DaDuyet'),
(3, 3, 3, N'VGA ASUS ROG Strix RTX 4090 24GB', N'{"cuda_cores":"16384"}', 60000000, 58000000, 10, 'https://gearvn.com/aff/asus-rtx4090?ref=portal', N'DaDuyet'),
(4, 4, 4, N'RAM Corsair Vengeance RGB 32GB DDR5', N'{"latency":"CL36"}', 3500000, 3200000, 100, 'https://hacom.vn/aff/corsair-32gb-ddr5?ref=portal', N'DaDuyet');

-- ============================================================
-- 10. GÁN GIÁ TRỊ CHI TIẾT BỘ LỌC CHO TỪNG SẢN PHẨM (GIATRI_THUOCTINH)
-- ============================================================
INSERT INTO GIATRI_THUOCTINH (idSanPham, idThuocTinh, giaTri) VALUES
(1, 1, N'LGA 1700'),           -- Core i9 -> Socket
(1, 2, N'24 Nhân / 32 Luồng'), -- Core i9 -> Nhân/Luồng
(2, 1, N'AM5'),                -- Ryzen 9 -> Socket
(2, 2, N'16 Nhân / 32 Luồng'), -- Ryzen 9 -> Nhân/Luồng
(3, 4, N'24 GB GDDR6X'),       -- RTX 4090 -> VRAM
(4, 5, N'32 GB (2x16GB)'),     -- RAM Corsair -> Dung lượng
(4, 6, N'6000 MHz');           -- RAM Corsair -> Bus RAM

-- ============================================================
-- 11. DỮ LIỆU LOG CLICK & CHUYỂN ĐỔI GIAO DỊCH
-- ============================================================
-- Giả lập 2 lượt Click
INSERT INTO THEODOI_CLICK (idSanPham, idKhachHang, thoiGianClick, diaChiIP, trinhDuyetFingerprint, isHopLe) VALUES
(1, 2, GETDATE() - 2, '192.168.1.15', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0', 1),
(3, NULL, GETDATE() - 1, '113.190.23.45', 'Chrome/125.0.0.0 Safari/537.36', 1);

-- Giả lập giao dịch mua thành công từ lượt Click số 1 (Mua Core i9)
-- Hoa hồng tính từ bảng Cấu hình: 15.490.000 * 5.5% = 851.950đ
INSERT INTO GIAODICH_AFFILIATE (idClick, idKhachHang, idDoiTac, idSanPham, soLuong, tongGiaTri, hoaHongNhan, phuongThucTT, trangThaiXacThuc) VALUES
(1, 2, 3, 1, 1, 15490000, 851950.00, N'ChuyenKhoan', N'DaXacNhan');

-- ============================================================
-- 12. TƯƠNG TÁC (ĐÁNH GIÁ & TIN TỨC)
-- ============================================================
INSERT INTO DANHGIA (idKhachHang, idDoiTac, diemRating, noiDung, trangThaiDuyet) VALUES
(2, 3, 5, N'Link Affiliate chuyển hướng mượt mà, ghi nhận hoa hồng tức thì. Rất tuyệt!', N'DaDuyet');

INSERT INTO TINTUC (idAdmin, tieuDe, noiDung) VALUES
(1, N'Cập nhật chính sách Affiliate Tháng 6/2026', N'Nâng mức hoa hồng cho nhóm VGA cao cấp lên 6%. Mọi người chú ý đẩy số nhé!');

select * from NGUOIDUNG