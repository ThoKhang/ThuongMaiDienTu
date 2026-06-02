import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";

export default function DanhMucSanPham() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trangHienTai, setTrangHienTai] = useState(0);
    const [sapXep, setSapXep] = useState("moi-nhat");
    const [boLocGia, setBoLocGia] = useState(null);

    const giaOptions = [
        { label: "Dưới 1 triệu", value: "duoi-1tr", min: 0,        max: 1000000  },
        { label: "1 - 5 triệu",  value: "1tr-5tr",  min: 1000000,  max: 5000000  },
        { label: "5 - 20 triệu", value: "5tr-20tr", min: 5000000,  max: 20000000 },
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
            {/* flex-col + min-h-screen để đẩy pagination xuống đáy */}
            <div className="flex flex-col min-h-screen">

                {/* Nội dung chính — flex-1 chiếm hết không gian còn lại */}
                <div className="flex-1 px-4 md:px-8 py-6 w-full">

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
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {danhSachHienThi().map(sp => {
                                const phanTram = tinhPhanTram(sp.giaNiemYet, sp.giaKhuyenMai);
                                return (
                                    <Link
                                        key={sp.id}
                                        to={`/san-pham/${sp.id}`}
                                        state={{ idDanhMuc: sp.idDanhMuc }}
                                        className="group bg-white rounded-xl overflow-hidden hover:shadow-xl
                                                   transition-all duration-300 flex flex-col border border-gray-100">
                                        <div className="relative h-48 overflow-hidden bg-surface-container-low
                                                        flex items-center justify-center">
                                            <span className="text-5xl">🖥️</span>
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

                {/* ===== PAGINATION — luôn ở dưới cùng của page ===== */}
                {!loading && danhSachHienThi().length > 0 && (
                    <div className="border-t border-gray-200 mt-auto">
                        <div className="flex flex-col items-center gap-1 py-3">

                            <div className="flex justify-center items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => setTrangHienTai(t => Math.max(0, t - 1))}
                                    disabled={trangHienTai === 0}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                               hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                    ← Trước
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
                                    Sau →
                                </button>
                            </div>

                            <p className="text-sm text-gray-400">
                                Trang {trangHienTai + 1} / {tongSoTrang} — Tổng {data?.tongSoSanPham || 0} sản phẩm
                            </p>

                        </div>
                    </div>
                )}

            </div>
        </UserLayout>
    );
}