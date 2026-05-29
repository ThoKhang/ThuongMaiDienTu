-- ============================================================
-- THIET KE CO SO DU LIEU PORTAL AFFILIATE LINH KIEN MAY TINH
-- Tích hợp RBAC Model, EAV Filter & Truy vết Affiliate khép kín
-- ============================================================

USE master;
GO
IF DB_ID('LKMT_MoHinhWebCong') IS NOT NULL DROP DATABASE LKMT_MoHinhWebCong;
GO
CREATE DATABASE LKMT_MoHinhWebCong COLLATE Vietnamese_CI_AS;
GO
USE LKMT_MoHinhWebCong;
GO

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