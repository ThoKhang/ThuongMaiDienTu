import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function TatCaSanPham() {
    const [data, setData] = useState(null);
    const [trang, setTrang] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tongSoTrang = data?.totalPages || 1;

    const formatGia = (gia) => gia?.toLocaleString("vi-VN") + "đ";

    const tinhPhanTramGiam = (niemYet, khuyenMai) => {
        if (!niemYet || !khuyenMai || khuyenMai >= niemYet) return null;
        return Math.round(((niemYet - khuyenMai) / niemYet) * 100);
    };

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("q");

        if (query) {
            import("../../../services/sanPhamService").then(({ sanPhamService }) => {
                sanPhamService.searchByKeyword(query)
                    .then(results => {
                        setData({ content: results || [], totalPages: 1 });
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(err.message);
                        setLoading(false);
                    });
            });
        } else {
            fetch(`http://localhost:8080/api/sanpham/phan-trang?page=${trang}`)
                .then(res => {
                    if (!res.ok) throw new Error("Lỗi server: " + res.status);
                    return res.json();
                })
                .then(d => {
                    setData(d);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [trang, location.search]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl border border-red-200 my-4">
                ⚠️ Không thể tải dữ liệu sản phẩm: {error}
            </div>
        );
    }

    if (!data?.content || data.content.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                <span className="text-4xl">📦</span>
                <p className="mt-2 font-semibold">Chưa có sản phẩm nào.</p>
            </div>
        );
    }

    return (
        <>
            {/* GRID */}
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[630px] content-start">
                {data.content.map(sp => {
                    const phanTram = tinhPhanTramGiam(sp.giaNiemYet, sp.giaKhuyenMai);
                    return (
                        <Link
                            key={sp.id}
                            to={`/san-pham/${sp.id}`}
                            state={{ idDanhMuc: sp.idDanhMuc }}
                            className="group bg-white rounded-xl overflow-hidden hover:shadow-xl
                                                   transition-all duration-300 flex flex-col border border-gray-400"
                        >
                            <div className="relative h-40 overflow-hidden bg-surface-container-low
                                                        flex items-center justify-center">
                                {sp.url ? (
                                    <img
                                        src={sp.url}
                                        alt={sp.tenSanPham}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
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
                                        className="text-primary hover:bg-blue-50 p-2 rounded-full transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">favorite</span>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>

            {/* PAGINATION */}
            {data?.content?.length > 0 && (
                <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex flex-col items-center gap-2 flex-wrap">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {/* ⏮️ Về đầu */}
                            <button
                                onClick={() => setTrang(0)}
                                disabled={trang === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                 ⏮
                            </button>

                            {/* ← */}
                            <button
                                onClick={() => setTrang(t => Math.max(0, t - 1))}
                                disabled={trang === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                 ←
                            </button>

                            {/* số trang */}
                            {Array.from({ length: tongSoTrang }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTrang(i)}
                                    className={`px-4 py-2 rounded-lg border transition font-medium 
                                    ${trang === i ? "bg-yellow-500 text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* → */}
                            <button
                                onClick={() => setTrang(t => Math.min(tongSoTrang - 1, t + 1))}
                                disabled={trang === tongSoTrang - 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                →
                            </button>

                            {/* ⏭️ Về cuối */}
                            <button
                                onClick={() => setTrang(tongSoTrang - 1)}
                                disabled={trang === tongSoTrang - 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                 ⏭
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}