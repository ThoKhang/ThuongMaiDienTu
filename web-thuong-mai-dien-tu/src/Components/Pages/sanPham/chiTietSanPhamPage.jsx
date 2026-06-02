import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import { useChiTietSanPham, useSanPhamTuongTu } from '../../../hooks/useChiTietSanPham';
import { sanPhamService } from '../../../services/sanPhamService';
import { useTheoDoiClick } from "../../../hooks/useTheoDoiClick";
import { getUserIdFromToken, getUserInfoFromToken } from "../../../utils/getUserIdFromToken";
import { khachHangService } from "../../../services/khachHangService";
/* ─── Helpers ─── */
const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN').format(amount) + '₫';

const renderStars = (rating = 4, maxRating = 5) =>
  Array.from({ length: maxRating }, (_, i) => (
    <span
      key={i}
      className="material-symbols-outlined text-secondary text-sm"
      style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
    >
      star
    </span>
  ));

/* ─── Skeleton Loader ─── */
const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-surface-container rounded-lg ${className}`} />
);

const ChiTietSanPhamSkeleton = () => (
  <div className="px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-4">
        <SkeletonBlock className="aspect-[4/3] rounded-xl" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-4">
        <SkeletonBlock className="h-8 w-1/3" />
        <SkeletonBlock className="h-12 w-full" />
        <SkeletonBlock className="h-12 w-2/3" />
        <SkeletonBlock className="h-32 w-full rounded-xl" />
        <SkeletonBlock className="h-14 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

/* ─── Main Component ─── */
const ChiTietSanPhamPage = () => {
  const { id } = useParams();
  const [anhChinh, setAnhChinh] = useState(0);

  const {
    data: sanPham,
    isLoading,
    isError,
    error,
  } = useChiTietSanPham(id);

  const {
    data: sanPhamTuongTu = [],
  } = useSanPhamTuongTu(sanPham?.idDanhMuc, id);

  // Tăng lượt xem khi vào trang
  useEffect(() => {
    if (id) {
      sanPhamService.tangLuotXem(id).catch(() => {/* silent */ });
    }
  }, [id]);

  /* ── Dữ liệu demo để UI không trống khi chưa có backend ── */
  let parsedThongSo = [];
  if (sanPham?.thongSoKyThuat) {
    try {
      const obj = JSON.parse(sanPham.thongSoKyThuat);
      parsedThongSo = Object.entries(obj).map(([key, value]) => `${key.toUpperCase()}: ${value}`);
    } catch (e) {
      parsedThongSo = typeof sanPham.thongSoKyThuat === 'string' ? sanPham.thongSoKyThuat.split('\n').filter(Boolean) : [];
    }
  }

  const demo = {
    maSku: sanPham?.id ? `SP00${sanPham.id}` : 'GPU-N-4090-FE',
    tenSanPham: sanPham?.tenSanPham ?? 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X',
    giaBan: sanPham?.giaKhuyenMai ?? sanPham?.giaNiemYet ?? 42500000,
    giaGoc: sanPham?.giaNiemYet ?? 48000000,
    url: sanPham?.url,
    tinhTrang: sanPham?.tinhTrang ?? 'Đã qua sử dụng (Like New)',
    baoHanh: sanPham?.baoHanh ?? 'Còn 24 tháng (Chính hãng)',
    moTa: sanPham?.moTa ?? '',
    diaChiNguoiBan: sanPham?.diaChiNguoiBan ?? '24 Bắc Đẩu, Đà Nẵng',
    thoiGianDang: sanPham?.thoiGianDang ?? '2 giờ trước',
    luotXem: sanPham?.luotXem ?? 0,
    danhMuc: sanPham?.tenDanhMuc ?? 'Linh kiện đồ họa',
    anhSanPham: sanPham?.anhSanPham ?? [],
    nguoiBan: {
      tenCuaHang: sanPham?.nguoiBan?.tenCuaHang ?? 'Hoàng Minh Tech',
      soDanhGia: sanPham?.nguoiBan?.soDanhGia ?? 128,
      danhGia: sanPham?.nguoiBan?.danhGia ?? 4,
      anhDaiDien: sanPham?.nguoiBan?.anhDaiDien ?? null,
    },
    thongSoKyThuat: parsedThongSo.length > 0 ? parsedThongSo : [
      'Kiến trúc NVIDIA Ada Lovelace',
      '24 GB GDDR6X 384-bit',
      '16384 nhân CUDA',
      'Tốc độ xung nhịp lên tới 2.52 GHz',
      'Hỗ trợ DLSS 3 & Ray Tracing thế hệ 3',
      'Độ phân giải hỗ trợ tối đa 8K',
    ],
  };

  // Ảnh hiển thị
  const danhSachAnh = demo?.url ? [demo.url] : [];
  // const { id } = useParams();
  const handleLienHeNguoiBan = async () => {
    try {

      const userInfo = getUserInfoFromToken();
      const idKhachHang = userInfo ? userInfo.id : null;

      // Track click
      await theoDoiClickMutation.mutateAsync({
        idSanPham: sanPham.id,
        idKhachHang,
        trinhDuyetFingerprint: navigator.userAgent
      });

      // Update customer reward points
      if (userInfo && userInfo.id) {
        try {
          await khachHangService.createKhachHang({
            idNguoiDung: userInfo.id,
            hoTen: userInfo.hoTen || userInfo.name || userInfo.sub || "Khách Hàng"
          });
        } catch (khErr) {
          console.error("Lỗi khi cộng điểm thưởng:", khErr);
        }
      }

      window.open(
        sanPham.urlAffiliate,
        "_blank"
      );

    } catch (error) {
      console.error(error);
    }
  };
  const theoDoiClickMutation = useTheoDoiClick();

  /* ── Error state ── */
  if (isError) {
    return (
      <UserLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 py-12">
          <span className="material-symbols-outlined text-6xl text-error">error_outline</span>
          <h2 className="text-2xl font-headline font-bold text-on-surface">Không tìm thấy sản phẩm</h2>
          <p className="text-on-surface-variant text-center max-w-sm">
            {error?.response?.data || 'Sản phẩm không tồn tại hoặc đã bị gỡ khỏi hệ thống.'}
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-container transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {isLoading ? (
        <ChiTietSanPhamSkeleton />
      ) : (
        <div className="px-4 md:px-8 pb-20">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-2 text-xs font-medium text-outline py-6 font-label">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to={`/danh-muc/${sanPham?.idDanhMuc}`} className="hover:text-primary transition-colors">
              {demo.danhMuc}
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface line-clamp-1 max-w-[200px]">{demo.tenSanPham}</span>
          </nav>

          {/* ── Bento Grid: Gallery + Transactional Panel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT: Hero Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main image */}
              <div className="aspect-[4/3] bg-surface-container-lowest rounded-xl overflow-hidden group relative shadow-sm">
                <img
                  alt={demo.tenSanPham}
                  src={danhSachAnh[anhChinh]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    Mới 99%
                  </span>
                  <span className="bg-white/80 backdrop-blur text-blue-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    Chính hãng
                  </span>
                </div>
                {/* Arrow prev / next */}
                {danhSachAnh.length > 1 && (
                  <>
                    <button
                      onClick={() => setAnhChinh((p) => (p - 1 + danhSachAnh.length) % danhSachAnh.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 shadow transition-all"
                    >
                      <span className="material-symbols-outlined text-on-surface">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setAnhChinh((p) => (p + 1) % danhSachAnh.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 shadow transition-all"
                    >
                      <span className="material-symbols-outlined text-on-surface">chevron_right</span>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-5 gap-3">
                {danhSachAnh.slice(0, 5).map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAnhChinh(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all
                      ${anhChinh === idx
                        ? 'border-primary shadow-md'
                        : 'border-transparent hover:border-outline-variant opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img src={src} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 4 && danhSachAnh.length > 5 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold">
                        +{danhSachAnh.length - 5}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Transactional Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                {/* SKU + Title */}
                <div className="space-y-1 mb-5">
                  <span className="font-label text-xs font-semibold text-primary uppercase tracking-widest">
                    Mã sản phẩm: {demo.maSku}
                  </span>
                  <h1 className="text-2xl font-headline font-extrabold tracking-tight text-on-surface leading-tight">
                    {demo.tenSanPham}
                  </h1>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-7">
                  <span className="text-4xl font-black text-secondary tracking-tighter">
                    {formatCurrency(demo.giaBan)}
                  </span>
                  {demo.giaGoc && demo.giaGoc > demo.giaBan && (
                    <span className="text-outline line-through text-lg font-medium">
                      {formatCurrency(demo.giaGoc)}
                    </span>
                  )}
                </div>

                {/* Info badges */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <span className="text-[10px] uppercase tracking-wider text-outline font-bold block mb-1">Tình trạng</span>
                    <span className="text-sm font-bold text-on-surface">{demo.tinhTrang}</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <span className="text-[10px] uppercase tracking-wider text-outline font-bold block mb-1">Bảo hành</span>
                    <span className="text-sm font-bold text-on-surface">{demo.baoHanh}</span>
                  </div>
                </div>

                {/* Seller card */}
                <div className="border border-outline-variant/20 rounded-xl p-4 flex items-center gap-4 mb-7 bg-surface-bright">
                  <div className="relative flex-shrink-0">
                    {demo.nguoiBan.anhDaiDien ? (
                      <img
                        src={demo.nguoiBan.anhDaiDien}
                        alt="Người bán"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl">store</span>
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-on-surface truncate">{demo.nguoiBan.tenCuaHang}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {renderStars(demo.nguoiBan.danhGia)}
                      <span className="text-xs font-bold text-outline ml-1">
                        ({demo.nguoiBan.soDanhGia} đánh giá)
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant">verified_user</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLienHeNguoiBan}
                    disabled={theoDoiClickMutation.isPending}
                    className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
                  >
                    <span className="material-symbols-outlined">
                      chat_bubble
                    </span>

                    {theoDoiClickMutation.isPending
                      ? "Đang chuyển..."
                      : "Liên hệ với người bán"}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <span className="material-symbols-outlined">call</span>
                      Gọi điện
                    </button>
                    <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors group">
                      <span
                        className="material-symbols-outlined group-hover:text-red-500 transition-colors"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        favorite
                      </span>
                      Lưu tin
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="bg-blue-50/60 border border-primary/10 p-5 rounded-xl flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  security
                </span>
                <div>
                  <h5 className="text-sm font-bold text-blue-900 mb-1">Giao dịch an toàn</h5>
                  <p className="text-xs text-blue-800/70 leading-relaxed">
                    Luôn kiểm tra linh kiện trực tiếp và không chuyển khoản trước khi nhận hàng. Precision Marketplace hỗ trợ kiểm định tại Lab.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Description + Sidebar ── */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Description (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Mô tả chi tiết sản phẩm
                </h2>

                <article className="prose prose-blue max-w-none text-on-surface-variant leading-relaxed space-y-6">
                  {demo.moTa ? (
                    <p>{demo.moTa}</p>
                  ) : (
                    <p>
                      Sản phẩm <strong>{demo.tenSanPham}</strong> được mua chính hãng tại Việt Nam. Linh kiện sử dụng cho công việc chuyên nghiệp trong môi trường kiểm soát, không đào coin, không ép xung.
                    </p>
                  )}

                  {/* Thông số kỹ thuật */}
                  {demo.thongSoKyThuat.length > 0 && (
                    <div className="bg-surface-container-low p-6 rounded-lg">
                      <h3 className="text-lg font-headline font-bold text-on-surface mb-4">Thông số kỹ thuật nổi bật:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                        {demo.thongSoKyThuat.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-6 py-6 border-t border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                      <span className="text-sm font-medium">{demo.diaChiNguoiBan}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">schedule</span>
                      <span className="text-sm font-medium">Đăng {demo.thoiGianDang}</span>
                    </div>
                    {demo.luotXem > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">visibility</span>
                        <span className="text-sm font-medium">
                          {new Intl.NumberFormat('vi-VN').format(demo.luotXem)} lượt xem
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Related knowledge */}
                  <div className="pt-8 border-t border-outline-variant/30">
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">auto_stories</span>
                      Kiến thức liên quan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link
                        to="#"
                        className="group flex flex-col p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors"
                      >
                        <span className="text-primary text-xs font-bold mb-1 group-hover:underline">Hướng dẫn kiểm tra</span>
                        <span className="text-sm font-semibold text-on-surface line-clamp-2">
                          Cách kiểm tra linh kiện cũ (benchmark & nhiệt độ)
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="group flex flex-col p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors"
                      >
                        <span className="text-primary text-xs font-bold mb-1 group-hover:underline">Thị trường linh kiện</span>
                        <span className="text-sm font-semibold text-on-surface line-clamp-2">
                          Xu hướng giá linh kiện điện tử tháng này
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Sidebar: Sản phẩm tương tự (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-surface-container-lowest p-6 rounded-xl border-t-4 border-secondary shadow-sm">
                <h3 className="font-headline font-bold text-on-surface mb-5">Sản phẩm tương tự</h3>

                {sanPhamTuongTu.length === 0 ? (
                  <div className="text-center py-6 text-outline-variant">
                    <span className="text-3xl block mb-2">📦</span>
                    <p className="text-sm">Chưa có sản phẩm tương tự.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sanPhamTuongTu.map((item) => (
                      <Link
                        key={item.id}
                        to={`/san-pham/${item.id}`}
                        className="flex gap-3 group hover:bg-surface-container-low rounded-lg p-2 transition-colors"
                      >
                        <div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                          {item.url ? (
                            <img src={item.url} alt={item.tenSanPham} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline-variant">image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">{item.tenSanPham}</p>
                          <p className="text-secondary font-black mt-1 text-sm">{formatCurrency(item.giaKhuyenMai ?? item.giaNiemYet ?? 0)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => window.location.href = "http://localhost:3000/"}
                  className="w-full mt-6 text-primary text-sm font-bold hover:underline"
                >
                  Xem thêm sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default ChiTietSanPhamPage;
