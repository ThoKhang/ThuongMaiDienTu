import { useEffect, useState } from "react";

export default function TinTucSideBar() {
    const [data, setData] = useState(null);
    const [trangTin, setTrangTin] = useState(0);
    const [loading, setLoading] = useState(true);

    const tongSoTrang = data?.totalPages || 1;

    const formatNgay = (ngay) =>
        new Date(ngay).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });

    const tomTat = (text, maxLen = 80) =>
        text && text.length > maxLen ? text.substring(0, maxLen) + "..." : text;

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/tintuc/phan-trang?page=${trangTin}`)
            .then(res => res.json())
            .then(d => {
                console.log("TIN TỨC:", d); // 👈 debug cực quan trọng
                setData(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [trangTin]);

    if (loading) {
        return <div className="text-center py-6 text-gray-400">Đang tải tin tức...</div>;
    }

    return (
        <div>
            {/* DANH SÁCH */}
            <div className="flex flex-col gap-0">
                {data?.content?.map((tin, idx) => (
                    <div key={tin.id}
                         className={`py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition
            ${idx !== data.content.length - 1 ? "border-b border-gray-100" : ""}`}>

                        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                            {tin.tieuDe}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            🕐 {formatNgay(tin.ngayDang)}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {tomTat(tin.noiDung)}
                        </p>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            {data?.content?.length > 0 && (
                <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex flex-col items-center gap-2 flex-wrap">

                        <div className="flex gap-2 flex-wrap justify-center">

                            {/* ⏮️ Về đầu */}
                            <button
                                onClick={() => setTrangTin(0)}
                                disabled={trangTin === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                 ⏮
                            </button>

                            {/* ← */}
                            <button
                                onClick={() => setTrangTin(t => Math.max(0, t - 1))}
                                disabled={trangTin === 0}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                ←
                            </button>

                            {/* số trang (giữ nguyên của bạn) */}
                            {Array.from({ length: tongSoTrang }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTrangTin(i)}
                                    className={`px-4 py-2 rounded-lg border transition font-medium 
            ${trangTin === i ? "bg-yellow-500 text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* → */}
                            <button
                                onClick={() => setTrangTin(t => Math.min(tongSoTrang - 1, t + 1))}
                                disabled={trangTin === tongSoTrang - 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                →
                            </button>

                            {/* ⏭️ Về cuối */}
                            <button
                                onClick={() => setTrangTin(tongSoTrang - 1)}
                                disabled={trangTin === tongSoTrang - 1}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                                 ⏭
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}