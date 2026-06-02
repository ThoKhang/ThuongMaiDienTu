import { useEffect, useState } from "react";
import UserLayout from "../../layout/UserLayout";
import TatCaSanPham from "./TatCaSanPham";
import TinTucSideBar from "./TinTucSideBar";

export default function TrangChu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(0);

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

  return (
      <UserLayout>  {/* ← UserLayout bọc TẤT CẢ, kể cả loading/error */}
        <div className="px-4 w-full">

          {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                </div>
            )}

          {/* Error */}
          {error && (
              <div className="text-center text-red-500 p-8">
                ⚠️ Không thể tải dữ liệu: {error}
              </div>
          )}

          {/* Content */}
          {!loading && !error && (
              <div className="flex gap-10">

                {/* LEFT: SẢN PHẨM */}
                <div className="flex-[10]">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
                    🔥 Sản phẩm
                  </h2>

                  <TatCaSanPham danhSach={data?.tatCaSanPham} />

                  {/* PAGINATION */}
                  <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                    <button
                        onClick={() => setTrangHienTai(t => Math.max(0, t - 1))}
                        disabled={trangHienTai === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                             hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                      ← Trước
                    </button>

                    {Array.from({ length: data?.tongSoTrang || 0 }, (_, i) => (
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
                        onClick={() => setTrangHienTai(t => Math.min((data?.tongSoTrang || 1) - 1, t + 1))}
                        disabled={trangHienTai === (data?.tongSoTrang || 1) - 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                             hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                      Sau →
                    </button>
                  </div>

                  {data?.tongSoSanPham > 0 && (
                      <p className="text-center text-sm text-gray-400 mt-3">
                        Trang {trangHienTai + 1} / {data?.tongSoTrang} — Tổng {data?.tongSoSanPham} sản phẩm
                      </p>
                  )}
                </div>

                {/* RIGHT: TIN TỨC */}
                <div className="flex-[4] border-l border-gray-200 pl-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
                    📰 Tin tức
                  </h2>
                  <TinTucSideBar danhSach={data?.tinTucMoiNhat} />
                </div>

              </div>
          )}

        </div>
      </UserLayout>
  );
}