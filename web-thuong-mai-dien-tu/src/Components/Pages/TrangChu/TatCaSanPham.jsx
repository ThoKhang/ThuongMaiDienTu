import { Link } from "react-router-dom";

export default function TatCaSanPham({ danhSach }) {
  const formatGia = (gia) => gia?.toLocaleString("vi-VN") + "đ";

  const tinhPhanTramGiam = (niemYet, khuyenMai) => {
    if (!niemYet || !khuyenMai || khuyenMai >= niemYet) return null;
    return Math.round(((niemYet - khuyenMai) / niemYet) * 100);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {danhSach?.map(sp => {
        const phanTram = tinhPhanTramGiam(sp.giaNiemYet, sp.giaKhuyenMai);

        return (
          <Link
            key={sp.id}
            to={`/san-pham/${sp.id}`}
            state={{ idDanhMuc: sp.idDanhMuc }}
            className="border border-gray-200 rounded-xl p-3 hover:shadow-lg
                       hover:border-blue-300 transition-all cursor-pointer bg-white block"
          >
           <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200
                           rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">

             {sp.url ? (
               <img
                 src={sp.url}
                 alt={sp.tenSanPham}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 onError={(e) => {
                   // Ảnh lỗi thì thay bằng ảnh xám mặc định
                   e.target.src = "https://via.placeholder.com/300x200?text=Loi+Anh";
                 }}
               />
             ) : (
               <span className="text-4xl">🖥️</span>
             )}

             {phanTram && (
               <span className="absolute top-2 left-2 bg-red-500 text-white
                                text-xs font-bold px-2 py-0.5 rounded z-10">
                 -{phanTram}%
               </span>
             )}
           </div>

            <p className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[40px]">
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