export default function DanhMucSideBar({ danhMucList }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-blue-600 text-white text-sm font-bold px-4 py-3">
        DANH MỤC LINH KIỆN
      </div>
      <ul>
        {danhMucList?.map((dm, idx) => (
          <li key={dm.id}
            className={`px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600
                        flex items-center gap-2 transition
                        ${idx !== danhMucList.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="text-blue-400">▸</span>
            {dm.tenDanhMuc}
          </li>
        ))}
      </ul>
    </div>
  );
}