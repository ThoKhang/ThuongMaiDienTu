import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Bổ sung Link để điều hướng

export default function TinTucSideBar() {
    const [data, setData] = useState(null);
    const [trangTin, setTrangTin] = useState(0);
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
    }, [trangTin]);

    // Trạng thái Loading giống trang sản phẩm
    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    // Trạng thái Lỗi
    if (error) {
        return (
            <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl border border-red-200 my-4">
                ⚠️ Không thể tải dữ liệu tin tức: {error}
            </div>
        );
    }

    // Trạng thái Trống
    if (!data?.content || data.content.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                <span className="text-4xl">📰</span>
                <p className="mt-2 font-semibold">Chưa có bài viết nào.</p>
            </div>
        );
    }

    return (
        <>
            {/* GRID BÀI VIẾT TƯƠNG TỰ SẢN PHẨM */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[630px] content-start">
                {data.content.map((tin) => (
                    <Link
                        key={tin.id}
                        to={`/tin-tuc/${tin.id}`} // Điều hướng sang trang chi tiết
                        className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-400"
                    >
                        {/* Ảnh Thumbnail */}
                        <div className="relative h-40 overflow-hidden bg-gray-100 flex items-center justify-center border-b border-gray-200">
                            {tin.hinhAnh ? (
                                <img
                                    src={tin.hinhAnh 
                                    ? `http://localhost:8080/upload/${tin.hinhAnh}` 
                                    : "https://via.placeholder.com/300x200?text=News"}
                                    alt={tin.tieuDe}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300x200?text=News";
                                    }}
                                />
                            ) : (
                                // Ảnh mặc định nếu tin tức không có hình
                                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-5xl">📰</span>
                                </div>
                            )}
                            
                            {/* Tag nhãn Ngày đăng */}
                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                {formatNgay(tin.ngayDang)}
                            </span>
                        </div>

                        {/* Nội dung tin tức */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-relaxed">
                                {tin.tieuDe}
                            </h3>
                            
                            <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed flex-1">
                                {tomTat(tin.noiDung)}
                            </p>
                            
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                                    Đọc tiếp →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>

            {/* PAGINATION - Copy chuẩn từ trang Sản Phẩm */}
            {data?.content?.length > 0 && (
                <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex flex-col items-center gap-2 flex-wrap">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {/* ⏮️ Về đầu */}
                            <button
                                onClick={() => setTrangTin(0)}
                                disabled={trangTin === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                ⏮
                            </button>

                            {/* ← */}
                            <button
                                onClick={() => setTrangTin(t => Math.max(0, t - 1))}
                                disabled={trangTin === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                ←
                            </button>

                            {/* Số trang */}
                            {Array.from({ length: tongSoTrang }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTrangTin(i)}
                                    className={`px-4 py-2 rounded-lg border transition font-medium 
                                    ${trangTin === i ? "bg-yellow-500 text-white border-yellow-500" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* → */}
                            <button
                                onClick={() => setTrangTin(t => Math.min(tongSoTrang - 1, t + 1))}
                                disabled={trangTin === tongSoTrang - 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                →
                            </button>

                            {/* ⏭️ Về cuối */}
                            <button
                                onClick={() => setTrangTin(tongSoTrang - 1)}
                                disabled={trangTin === tongSoTrang - 1}
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