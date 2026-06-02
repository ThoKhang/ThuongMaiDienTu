import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";

const DANH_MUC_CONFIG = {
    1: {
        ten: "Vi Xử Lý",
        tenPhu: "Hiệu Năng Vượt Trội",
        moTa: "Tuyển chọn các dòng CPU Intel, AMD mới nhất. Tối ưu cho gaming, đồ họa và xử lý đa nhiệm.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-blue-900 to-blue-600",
        accent: "text-blue-300",
    },
    2: {
        ten: "Bộ Nhớ RAM",
        tenPhu: "Hiệu Suất Cao",
        moTa: "Tuyển chọn các dòng RAM DDR4, DDR5 chính hãng cho máy trạm và gaming. Đảm bảo độ ổn định tuyệt đối trong mọi tác vụ.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-orange-900 to-orange-500",
        accent: "text-orange-300",
    },
    3: {
        ten: "Lưu Trữ",
        tenPhu: "Tốc Độ Cao",
        moTa: "SSD NVMe, SATA và HDD từ các thương hiệu hàng đầu. Dung lượng lớn, tốc độ đọc ghi vượt trội.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-green-900 to-green-600",
        accent: "text-green-300",
    },
    4: {
        ten: "Bo Mạch Chủ",
        tenPhu: "Nền Tảng Vững Chắc",
        moTa: "Mainboard từ ASUS, MSI, Gigabyte hỗ trợ Intel và AMD. Đa dạng form factor, tích hợp đầy đủ kết nối.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-purple-900 to-purple-600",
        accent: "text-purple-300",
    },
    5: {
        ten: "Nguồn PSU",
        tenPhu: "Ổn Định & Bền Bỉ",
        moTa: "Nguồn máy tính 80 Plus Gold, Platinum từ Corsair, Seasonic, be quiet! Bảo vệ hệ thống toàn diện.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-yellow-900 to-yellow-600",
        accent: "text-yellow-300",
    },
    6: {
        ten: "Card Đồ Họa",
        tenPhu: "Chinh Phục Mọi Tựa Game",
        moTa: "GPU NVIDIA GeForce và AMD Radeon mới nhất. Trải nghiệm gaming 4K, ray tracing và AI rendering đỉnh cao.",
        label: "DANH MỤC KỸ THUẬT",
        gradient: "from-red-900 to-red-600",
        accent: "text-red-300",
    },
};

const DEFAULT_CONFIG = {
    ten: "Sản Phẩm",
    tenPhu: "Chính Hãng",
    moTa: "Khám phá các sản phẩm chất lượng cao, chính hãng với giá tốt nhất.",
    label: "DANH MỤC SẢN PHẨM",
    gradient: "from-gray-900 to-gray-600",
    accent: "text-gray-300",
};

export default function DanhMucSanPham() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trangHienTai, setTrangHienTai] = useState(0);
    const [sapXep, setSapXep] = useState("moi-nhat");
    const [boLocGia, setBoLocGia] = useState(null);
    const config = DANH_MUC_CONFIG[Number(id)] || DEFAULT_CONFIG;

    const giaOptions = [
        { label: "Dưới 1 triệu", value: "duoi-1tr", min: 0,         max: 1000000  },
        { label: "1 - 5 triệu",  value: "1tr-5tr",  min: 1000000,   max: 5000000  },
        { label: "5 - 20 triệu", value: "5tr-20tr", min: 5000000,   max: 20000000 },
        { label: "Trên 20 triệu",value: "tren-20tr", min: 20000000, max: Infinity },
    ];

    useEffect(() => {
        setTrangHienTai(0);
        setBoLocGia(null);
        setSapXep("moi-nhat");
    }, [id]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/danh-muc/${id}?page=${trangHienTai}`)
            .then(res => res.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id, trangHienTai]);

    const formatGia = (gia) => gia?.toLocaleString("vi-VN") + "đ";

    const tinhPhanTram = (niemYet, khuyenMai) => {
        if (!niemYet || !khuyenMai || khuyenMai >= niemYet) return null;
        return Math.round(((niemYet - khuyenMai) / niemYet) * 100);
    };

    const danhSachHienThi = () => {
        if (!data?.sanPham) return [];
        let arr = [...data.sanPham];
        
        if (q) {
            arr = arr.filter(sp => sp.tenSanPham.toLowerCase().includes(q.toLowerCase()));
        }

        if (boLocGia) {
            const opt = giaOptions.find(o => o.value === boLocGia);
            if (opt) arr = arr.filter(sp => {
                const gia = sp.giaKhuyenMai || sp.giaNiemYet;
                return gia >= opt.min && gia < opt.max;
            });
        }
        if (sapXep === "gia-tang") return arr.sort((a, b) => (a.giaKhuyenMai || a.giaNiemYet) - (b.giaKhuyenMai || b.giaNiemYet));
        if (sapXep === "gia-giam") return arr.sort((a, b) => (b.giaKhuyenMai || b.giaNiemYet) - (a.giaKhuyenMai || a.giaNiemYet));
        return arr;
    };

    const tongSoTrang = data?.tongSoTrang || 1;

    return (
        <UserLayout>
            <div className="flex flex-col min-h-screen">

                {/* ===== HERO HEADER ===== */}
                <div className={`bg-gradient-to-r ${config.gradient} mx-2 md:mx-4 mt-4 rounded-2xl px-8 py-8 text-white`}>
                    <span className="text-xs font-bold tracking-widest uppercase
                                     bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                        {config.label}
                    </span>
                    <h1 className="text-3xl font-black mt-2 leading-tight">
                        {config.ten}
                    </h1>
                    <h1 className={`text-3xl font-black ${config.accent}`}>
                        {config.tenPhu}
                    </h1>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                        {config.moTa}
                    </p>
                </div>

                {/* ===== NỘI DUNG CHÍNH ===== */}
                <div className="flex-1 px-2 md:px-4 py-6 w-full">

                    {/* Bộ lọc + Sắp xếp */}
                    <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs font-bold text-outline uppercase tracking-wider">Bộ lọc:</span>
                            {giaOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setBoLocGia(boLocGia === opt.value ? null : opt.value)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
                                        ${boLocGia === opt.value
                                        ? "bg-orange-500 text-white border-orange-500"
                                        : "bg-white text-on-surface border-gray-300 hover:border-orange-400 hover:text-orange-500"
                                    }`}>
                                    {opt.label}
                                </button>
                            ))}
                            {boLocGia && (
                                <button
                                    onClick={() => setBoLocGia(null)}
                                    className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300
                                               text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                    Xóa lọc
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-xs font-medium text-outline">Sắp xếp:</span>
                            <select
                                value={sapXep}
                                onChange={(e) => setSapXep(e.target.value)}
                                className="border-none bg-transparent text-sm font-bold p-0 focus:ring-0 cursor-pointer">
                                <option value="moi-nhat">Mới nhất</option>
                                <option value="gia-tang">Giá thấp nhất</option>
                                <option value="gia-giam">Giá cao nhất</option>
                            </select>
                        </div>
                    </section>

                    {/* Thông tin lọc */}
                    {boLocGia && (
                        <div className="mb-4 text-sm text-gray-500">
                            Đang lọc: <span className="text-orange-500 font-semibold">
                                {giaOptions.find(o => o.value === boLocGia)?.label}
                            </span>
                        </div>
                    )}

                    {/* Grid sản phẩm */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                        </div>
                    ) : danhSachHienThi().length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <span className="text-5xl">📦</span>
                            <p className="mt-4 font-semibold">Không có sản phẩm phù hợp</p>
                            {boLocGia && (
                                <button onClick={() => setBoLocGia(null)}
                                        className="mt-3 text-orange-500 underline text-sm">
                                    Xóa bộ lọc
                                </button>
                            )}
                        </div>
                    ) : (
                        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[630px] content-start">
                            {danhSachHienThi().map(sp => {
                                const phanTram = tinhPhanTram(sp.giaNiemYet, sp.giaKhuyenMai);
                                return (
                                    <Link
                                        key={sp.id}
                                        to={`/san-pham/${sp.id}`}
                                        state={{ idDanhMuc: sp.idDanhMuc }}
                                        className="group bg-white rounded-xl overflow-hidden hover:shadow-xl
                                                   transition-all duration-300 flex flex-col border border-gray-400">
                                        <div className="relative h-40 overflow-hidden bg-surface-container-low
                                                        flex items-center justify-center">

                                            {/* --- Hiển thị ảnh từ trường url, nếu không có thì hiện icon mặc định --- */}
                                            {sp.url ? (
                                                <img
                                                    src={sp.url}
                                                    alt={sp.tenSanPham}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                            // Thay thế bằng ảnh mặc định nếu link bị lỗi
                                                            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                                        }}
                                                />
                                            ) : (
                                                <span className="text-5xl">🖥️</span>
                                            )}

                                            {phanTram ? (
                                                <span className="absolute top-3 left-3 bg-red-500 text-white
                                                                 text-[10px] font-bold px-2 py-1 rounded uppercase">
                                                    -{phanTram}%
                                                </span>
                                            ) : (
                                                <span className="absolute top-3 left-3 bg-primary text-white
                                                                 text-[10px] font-bold px-2 py-1 rounded uppercase">
                                                    Chính hãng
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-headline font-bold text-on-surface mb-2
                                                           group-hover:text-primary transition-colors line-clamp-2 text-sm">
                                                {sp.tenSanPham}
                                            </h3>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div>
                                                    <p className="text-base font-bold text-secondary">
                                                        {formatGia(sp.giaKhuyenMai || sp.giaNiemYet)}
                                                    </p>
                                                    {sp.giaKhuyenMai && sp.giaKhuyenMai < sp.giaNiemYet && (
                                                        <p className="text-xs text-gray-400 line-through">
                                                            {formatGia(sp.giaNiemYet)}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => e.preventDefault()}
                                                    className="text-primary hover:bg-blue-50 p-2 rounded-full transition-colors">
                                                    <span className="material-symbols-outlined text-xl">favorite</span>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </section>
                    )}
                </div>

                {/* ===== PAGINATION ===== */}
                {!loading && danhSachHienThi().length > 0 && (
                    <div className="border-t border-gray-200 mt-auto">
                        <div className="flex flex-col items-center gap-1 py-3">
                            <div className="flex justify-center items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => setTrangHienTai(tongSoTrang - 1)}
                                    disabled={trangHienTai === tongSoTrang - 1}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                    ⏮
                                </button>
                                <button
                                    onClick={() => setTrangHienTai(t => Math.max(0, t - 1))}
                                    disabled={trangHienTai === 0}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                                               hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                    ←
                                </button>
                                {Array.from({ length: tongSoTrang }, (_, i) => (
                                    <button key={i}
                                            onClick={() => setTrangHienTai(i)}
                                            className={`px-4 py-2 rounded-lg border transition font-medium
                                                ${trangHienTai === i
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}>
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setTrangHienTai(t => Math.min(tongSoTrang - 1, t + 1))}
                                    disabled={trangHienTai === tongSoTrang - 1}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                                               hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                    →
                                </button>
                                <button
                                    onClick={() => setTrangHienTai(tongSoTrang - 1)}
                                    disabled={trangHienTai === tongSoTrang - 1}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                    ⏭
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </UserLayout>
    );
}