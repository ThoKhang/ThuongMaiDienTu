import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const NewsManagement = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('accessToken');

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/news', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Không thể tải danh sách tin tức');
            const data = await response.json();
            // Sắp xếp tin mới nhất lên đầu
            data.sort((a, b) => new Date(b.ngayDang) - new Date(a.ngayDang));
            setNews(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        const result = await Swal.fire({
            title: "Xác nhận",
            text: `Bạn có chắc chắn muốn chuyển bài viết này sang trạng thái: ${status}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/news/${id}/status?status=${status}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Cập nhật trạng thái thành công!');
                fetchNews(); // Tải lại danh sách
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật.');
            }
        } catch (error) {
            toast.error('Lỗi kết nối máy chủ.');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'DaDuyet':
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Đã Duyệt</span>;
            case 'TuChoi':
                return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">Từ Chối</span>;
            default:
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">Chờ Duyệt</span>;
        }
    };

    const formatNgay = (ngay) => {
        return new Date(ngay).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Tin Tức & Bài Đăng</h1>
                    <p className="text-sm text-gray-500 mt-1">Duyệt hoặc từ chối bài viết từ Cộng đồng & Đối tác.</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm border border-blue-100">
                    Tổng số bài viết: {news.length}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                                <th className="p-4 font-bold rounded-tl-lg">ID</th>
                                <th className="p-4 font-bold">Hình ảnh</th>
                                <th className="p-4 font-bold w-1/3">Tiêu đề</th>
                                <th className="p-4 font-bold">Người đăng (ID)</th>
                                <th className="p-4 font-bold">Ngày đăng</th>
                                <th className="p-4 font-bold">Trạng thái</th>
                                <th className="p-4 font-bold text-center rounded-tr-lg">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {news.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-8 text-gray-500">
                                        Chưa có bài viết nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                news.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-sm font-semibold text-gray-600">#{item.id}</td>
                                        <td className="p-4">
                                            {item.hinhAnh ? (
                                                <img
                                                    src={item.hinhAnh ? (item.hinhAnh.startsWith('http') ? item.hinhAnh : `/upload/${item.hinhAnh}`) : "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60' viewBox='0 0 100 60'%3E%3Crect fill='%23e2e8f0' width='100' height='60'/%3E%3Ctext fill='%2364748b' font-family='sans-serif' font-size='10' dy='4' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ETrống%3C/text%3E%3C/svg%3E"}
                                                    alt="Thumbnail"
                                                    className="w-16 h-12 object-cover rounded shadow-sm border border-gray-200"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60' viewBox='0 0 100 60'%3E%3Crect fill='%23f87171' width='100' height='60'/%3E%3Ctext fill='%23ffffff' font-family='sans-serif' font-size='10' dy='4' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ELỗi%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-16 h-12 bg-gray-100 flex items-center justify-center rounded border border-gray-200">
                                                    <span className="text-xs text-gray-400">Trống</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-gray-900 line-clamp-2">{item.tieuDe}</p>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 font-medium">ID: {item.idNguoiDang}</td>
                                        <td className="p-4 text-sm text-gray-500">{formatNgay(item.ngayDang)}</td>
                                        <td className="p-4">
                                            {getStatusBadge(item.trangThaiDuyet)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleUpdateStatus(item.id, 'DaDuyet')}
                                                    disabled={item.trangThaiDuyet === 'DaDuyet'}
                                                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${item.trangThaiDuyet === 'DaDuyet'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                        }`}
                                                >
                                                    Duyệt
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(item.id, 'TuChoi')}
                                                    disabled={item.trangThaiDuyet === 'TuChoi'}
                                                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${item.trangThaiDuyet === 'TuChoi'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-red-600 text-white hover:bg-red-700'
                                                        }`}
                                                >
                                                    Từ chối
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NewsManagement;