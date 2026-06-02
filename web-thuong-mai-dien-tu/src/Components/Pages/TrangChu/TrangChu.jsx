import { useEffect, useState } from "react";
import UserLayout from "../../layout/UserLayout";
import TatCaSanPham from "./TatCaSanPham";
import TinTucSideBar from "./TinTucSideBar";

export default function TrangChu() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(0);

    const tongSoTrang = data?.tongSoTrang || 1;

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/trangchu?page=${trangHienTai}`)
            .then(res => {
                if (!res.ok) throw new Error("Lỗi server: " + res.status);
                return res.json();
            })
            .then(d => { setData(d); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, [trangHienTai]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
    );

    if (error) return (
        <div className="text-center text-red-500 p-8">
            ⚠️ Không thể tải dữ liệu: {error}
        </div>
    );

    return (
        <UserLayout>
            <div className="flex flex-col min-h-screen">
                <div className="flex-1 px-2 md:px-4 w-full">

                    {/* ===== HERO BANNER ===== */}
                    <div className="relative mt-4 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 px-6 py-8 text-white">

                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/5 rounded-full" />
                            <div className="absolute bottom-0 right-32 w-48 h-48 bg-white/5 rounded-full" />
                            <div className="absolute top-6 right-64 w-16 h-16 bg-white/10 rounded-full" />
                        </div>

                        <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase
                                 bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
                  🛠️ Precision Marketplace
                </span>
                            <h1 className="text-4xl font-black leading-tight mt-2">
                                Nền Tảng Mua Bán
                            </h1>
                            <h1 className="text-4xl font-black text-blue-300 mb-4">
                                Linh Kiện Máy Tính
                            </h1>
                            <p className="text-sm text-white/70">
                                Marketplace chuyên biệt cho linh kiện máy tính · CPU, RAM, GPU, SSD chính hãng · Giá minh bạch · Giao hàng toàn quốc
                            </p>
                            <div className="flex items-center gap-6 mt-5">
                                {[
                                    { icon: "verified",       nhan: "Hàng chính hãng"     },
                                    { icon: "swap_horiz",     nhan: "Mua & bán dễ dàng"   },
                                    { icon: "local_shipping", nhan: "Giao hàng toàn quốc" },
                                ].map((item) => (
                                    <div key={item.nhan} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-300 text-xl">{item.icon}</span>
                                        <span className="text-xs text-white/80 font-medium">{item.nhan}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== NỘI DUNG CHÍNH ===== */}
                    <div className="flex gap-10 pt-6 pb-6">

                        {/* LEFT: SẢN PHẨM */}
                        <div className="flex-[10] flex flex-col">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
                                🔥 Sản phẩm
                            </h2>

                            <TatCaSanPham danhSach={data?.tatCaSanPham} />

                            {/* PAGINATION */}
                            {data?.tatCaSanPham?.length > 0 && (
                                <div className="border-t border-gray-200 mt-6 pt-4">
                                    <div className="flex flex-col items-center gap-1">
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
                                        <p className="text-sm text-gray-400 mt-1">
                                            Trang {trangHienTai + 1} / {tongSoTrang} — Tổng {data?.tongSoSanPham || 0} sản phẩm
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: TIN TỨC */}
                        <div className="flex-[4] border-l border-gray-200 pl-5">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
                                📰 Tin tức
                            </h2>
                            <TinTucSideBar danhSach={data?.tinTucMoiNhat} />
                        </div>

                    </div>
                </div>
            </div>
        </UserLayout>
    );
}