import UserLayout from "../../layout/UserLayout";
import TatCaSanPham from "./TatCaSanPham";
import TinTucSideBar from "./TinTucSideBar";

export default function TrangChu() {
    return (
        <UserLayout>
            <div className="flex flex-col min-h-screen">
                <div className="flex-1 px-2 md:px-4 w-full">

                    {/* ===== HERO ===== */}
                    <div className="relative mt-4 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 px-6 py-8 text-white">

                        <div className="relative z-10">
                            <h1 className="text-4xl font-black">
                                Nền Tảng Mua Bán
                            </h1>
                            <h1 className="text-4xl font-black text-blue-300 mb-4">
                                Linh Kiện Máy Tính
                            </h1>

                            <p className="text-sm text-white/70">
                                CPU, RAM, GPU, SSD chính hãng
                            </p>
                        </div>
                    </div>

                    {/* ===== CONTENT ===== */}
                    <div className="flex flex-col gap-10 pt-6 pb-6">

                        {/* SẢN PHẨM */}
                        <div className="bg-white border border-gray-200 rounded-xl px-4 py-7 mb-4 shadow-sm">
                            <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-3">
                                🔥 Sản phẩm
                            </h2>

                            {/* ⚠️ KHÔNG truyền props nữa */}
                            <TatCaSanPham />
                        </div>

                        {/* TIN TỨC */}
                        <div className="bg-white border border-gray-200 rounded-xl px-4 py-7 mb-4 shadow-sm">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
                                📰 Tin tức
                            </h2>

                            <TinTucSideBar />
                        </div>

                    </div>
                </div>
            </div>
        </UserLayout>
    );
}