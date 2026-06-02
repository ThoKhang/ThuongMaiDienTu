import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LOAI_OPTIONS = [
    { value: "TatCa",    label: "Tất cả",        icon: "📋" },
    { value: "Admin",    label: "Hệ thống",       icon: "🛡️" },
    { value: "DoiTac",   label: "Đối tác",        icon: "🏢" },
    { value: "KhachHang",label: "Người dùng",     icon: "👤" },
];

export default function TinTucSideBar() {
    const [data, setData] = useState(null);
    const [trangTin, setTrangTin] = useState(0);
    const [loai, setLoai] = useState("TatCa");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tongSoTrang = data?.totalPages || 1;

    const formatNgay = (ngay) =>
        new Date(ngay).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });

    const tomTat = (text, maxLen = 120) =>
        text && text.length > maxLen ? text.substring(0, maxLen) + "..." : text;

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:8080/api/tintuc/phan-trang?page=${trangTin}`)
            .then(res => { if (!res.ok) throw new Error("Lỗi server: " + res.status); return res.json(); })
            .then(d => { setData(d); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, [trangTin]);

    // Lọc phía FE theo loaiNguoiDang
    const danhSachHienThi = data?.content?.filter(tin =>
        loai === "TatCa" || tin.loaiNguoiDang === loai
    ) || [];

    const handleChonLoai = (val) => {
        setLoai(val);
        setTrangTin(0);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
    );

    if (error) return (
        <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl border border-red-200 my-4">
            ⚠️ Không thể tải dữ liệu tin tức: {error}
        </div>
    );

    return (
        <>
            {/* TAB LỌC LOẠI */}
            <div className="flex gap-2 flex-wrap mb-6">
                {LOAI_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => handleChonLoai(opt.value)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all
                            ${loai === opt.value
                                ? "bg-blue-600 text-white border-blue-600 shadow"
                                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                            }`}
                    >
                        <span>{opt.icon}</span>{opt.label}
                    </button>
                ))}
            </div>

            {/* GRID BÀI VIẾT */}
            {danhSachHienThi.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <span className="text-4xl">📰</span>
                    <p className="mt-2 font-semibold">Chưa có bài viết nào.</p>
                </div>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[630px] content-start">
                    {danhSachHienThi.map((tin) => (
                        <Link
                            key={tin.id}
                            to={`/tin-tuc/${tin.id}`}
                            className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-400"
                        >
                            <div className="relative h-40 overflow-hidden bg-gray-100 flex items-center justify-center border-b border-gray-200">
                                {tin.hinhAnh ? (
                                    <img
                                        src={`http://localhost:8080/upload/${tin.hinhAnh}`}
                                        alt={tin.tieuDe}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=News"; }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-200 flex items-center justify-center">
                                        <span className="text-5xl">📰</span>
                                    </div>
                                )}
                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                    {formatNgay(tin.ngayDang)}
                                </span>
                                {/* Badge loại người đăng */}
                                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded shadow-sm
                                    ${tin.loaiNguoiDang === "Admin" ? "bg-purple-600 text-white" :
                                      tin.loaiNguoiDang === "DoiTac" ? "bg-green-600 text-white" :
                                      "bg-yellow-500 text-white"}`}>
                                    {tin.loaiNguoiDang === "Admin" ? "🛡️ Hệ thống" :
                                     tin.loaiNguoiDang === "DoiTac" ? "🏢 Đối tác" : "👤 Người dùng"}
                                </span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-relaxed">
                                    {tin.tieuDe}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed flex-1">
                                    {tomTat(tin.noiDung)}
                                </p>
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-blue-600 group-hover:underline">Đọc tiếp →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            )}

            {/* PAGINATION */}
            {data?.content?.length > 0 && (
                <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button onClick={() => setTrangTin(0)} disabled={trangTin === 0}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">⏮</button>
                        <button onClick={() => setTrangTin(t => Math.max(0, t - 1))} disabled={trangTin === 0}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">←</button>
                        {Array.from({ length: tongSoTrang }, (_, i) => (
                            <button key={i} onClick={() => setTrangTin(i)}
                                className={`px-4 py-2 rounded-lg border transition font-medium 
                                ${trangTin === i ? "bg-yellow-500 text-white border-yellow-500" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setTrangTin(t => Math.min(tongSoTrang - 1, t + 1))} disabled={trangTin === tongSoTrang - 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">→</button>
                        <button onClick={() => setTrangTin(tongSoTrang - 1)} disabled={trangTin === tongSoTrang - 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">⏭</button>
                    </div>
                </div>
            )}
        </>
    );
}