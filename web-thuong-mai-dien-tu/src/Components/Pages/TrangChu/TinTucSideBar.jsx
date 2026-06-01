export default function TinTucSideBar({ danhSach }) {
  const formatNgay = (ngay) =>
    new Date(ngay).toLocaleDateString("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });

  const tomTat = (text, maxLen = 80) =>
    text && text.length > maxLen ? text.substring(0, maxLen) + "..." : text;

  return (
    <div className="flex flex-col gap-0">
      {danhSach?.map((tin, idx) => (
        <div key={tin.id}
          className={`py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition
                      ${idx !== danhSach.length - 1 ? "border-b border-gray-100" : ""}`}>
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
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
  );
}