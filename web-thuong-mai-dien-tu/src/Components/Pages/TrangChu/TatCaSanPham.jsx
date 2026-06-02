import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TatCaSanPham() {
  const [danhSach, setDanhSach] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Tự động gọi API khi component được load
  useEffect(() => {
    fetch(`http://localhost:8080/api/sanpham/phan-trang?page=0`)
      .then(res => res.json())
      .then(d => {
        // Tự động tìm mảng dữ liệu dù Backend đặt tên là tatCaSanPham hay sanPham
        setDanhSach(d.tatCaSanPham || d.sanPham || d.content || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tải dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  const formatGia = (gia) => gia?.toLocaleString("vi-VN") + "đ";

  const tinhPhanTramGiam = (niemYet, khuyenMai) => {
    if (!niemYet || !khuyenMai || khuyenMai >= niemYet) return null;
    return Math.round(((niemYet - khuyenMai) / niemYet) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (danhSach.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <span className="text-4xl">📦</span>
        <p className="mt-2 font-semibold">Chưa có sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {danhSach.map(sp => {
        const phanTram = tinhPhanTramGiam(sp.giaNiemYet, sp.giaKhuyenMai);

        return (
          <Link
            key={sp.id}
            to={`/san-pham/${sp.id}`}
            state={{ idDanhMuc: sp.idDanhMuc }}
            // Thêm class group để làm hiệu ứng hover ảnh
            className="group border border-gray-200 rounded-xl p-3 hover:shadow-lg
                       hover:border-blue-300 transition-all cursor-pointer bg-white block"
          >
            {/* Khung chứa ảnh có overflow-hidden */}
            <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200
                            rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">

              {/* 2. Logic hiển thị ảnh chuẩn */}
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
                <span className="text-4xl">🖥️</span>
              )}

              {/* Tag giảm giá nổi lên trên (z-10) */}
              {phanTram && (
                <span className="absolute top-2 left-2 bg-red-500 text-white
                                 text-xs font-bold px-2 py-0.5 rounded z-10">
                  -{phanTram}%
                </span>
              )}
            </div>

            <p className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
              {sp.tenSanPham}
            </p>

            <div className="mt-2">
              <p className="text-blue-600 font-bold text-sm">
                {formatGia(sp.giaKhuyenMai || sp.giaNiemYet)}
              </p>

              {sp.giaKhuyenMai && sp.giaKhuyenMai < sp.giaNiemYet && (
                <p className="text-gray-400 text-xs line-through">
                  {formatGia(sp.giaNiemYet)}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}