import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserLayout from '../../layout/UserLayout';

/* ─── Skeleton Loader ─── */
const SkeletonBlock = ({ className = '' }) => (
    <div className={`animate-pulse bg-surface-container rounded-lg ${className}`} />
);

const TinDangSkeleton = () => (
    <div className="space-y-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                <SkeletonBlock className="w-32 h-24 rounded-lg shrink-0" />
                <div className="flex-1 space-y-3 py-2">
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-4 w-1/4" />
                    <SkeletonBlock className="h-6 w-24 rounded-full mt-2" />
                </div>
            </div>
        ))}
    </div>
);

export default function TinDang() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State Modal
    const [editingNews, setEditingNews] = useState(null);
    const [editTieuDe, setEditTieuDe] = useState('');
    const [editNoiDung, setEditNoiDung] = useState('');
    const [editFile, setEditFile] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const idNguoiDang = localStorage.getItem('userId') || localStorage.getItem('id');

    const fetchMyNews = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/tintuc/cua-toi/${idNguoiDang}`);
            if (res.ok) {
                const data = await res.json();
                setNewsList(data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách bài viết.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idNguoiDang) fetchMyNews();
        else setLoading(false);
    }, [idNguoiDang]);

    const openEditModal = (item) => {
        setEditingNews(item);
        setEditTieuDe(item.tieuDe);
        setEditNoiDung(item.noiDung);
        setEditFile(null);
       setEditPreview(item.hinhAnh ? `http://localhost:8080/upload/${item.hinhAnh}` : null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setEditFile(file);
            setEditPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('tieuDe', editTieuDe);
        formData.append('noiDung', editNoiDung);
        formData.append('idNguoiDang', idNguoiDang);
        if (editFile) formData.append('file', editFile);

        try {
            const res = await fetch(`http://localhost:8080/api/tintuc/cua-toi/${editingNews.id}`, {
                method: 'PUT',
                body: formData
            });

            if (res.ok) {
                toast.success("Cập nhật thành công! Bài viết đang được xét duyệt lại.");
                setEditingNews(null);
                fetchMyNews();
            } else {
                toast.error("Lỗi khi cập nhật bài viết.");
            }
        } catch (error) {
            toast.error("Không thể kết nối đến máy chủ.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'DaDuyet': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 tracking-wide uppercase">Đã Duyệt</span>;
            case 'TuChoi': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 tracking-wide uppercase">Từ Chối</span>;
            default: return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 tracking-wide uppercase">Chờ Duyệt</span>;
        }
    };

    if (!idNguoiDang) {
        return (
            <UserLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 py-12">
                    <span className="material-symbols-outlined text-6xl text-error" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Yêu cầu đăng nhập</h2>
                    <p className="text-on-surface-variant text-center max-w-sm">Vui lòng đăng nhập vào hệ thống để quản lý các bài viết cá nhân của bạn.</p>
                    <Link to="/dang-nhap" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">
                        Đi đến Đăng nhập
                    </Link>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="px-4 md:px-8 pb-20">
                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-2 text-xs font-medium text-outline py-6 font-label">
                    <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface line-clamp-1">Bài đăng của tôi</span>
                </nav>

                <div className="max-w-5xl mx-auto mt-4">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-headline font-extrabold text-on-surface tracking-tight">Bài đăng của tôi</h1>
                            <p className="text-on-surface-variant mt-2 text-sm">Quản lý, theo dõi và cập nhật nội dung các bài viết của bạn trên hệ thống.</p>
                        </div>
                        <Link to="/dang-tin" className="shrink-0 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95">
                            <span className="material-symbols-outlined">edit_square</span>
                            <span>Viết bài mới</span>
                        </Link>
                    </div>

                    {/* Danh sách bài viết */}
                    {loading ? (
                        <TinDangSkeleton />
                    ) : newsList.length === 0 ? (
                        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>article</span>
                            <h3 className="text-xl font-bold text-on-surface mb-2">Chưa có bài viết nào</h3>
                            <p className="text-on-surface-variant mb-6">Bạn chưa tạo bài viết nào trên hệ thống. Hãy bắt đầu chia sẻ ngay!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {newsList.map((item) => (
                                <div key={item.id} className="group bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/30 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 transition-all shadow-sm hover:shadow-md">
                                    <div className="w-full sm:w-40 h-28 shrink-0 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20 relative">
                                        <img 
                                            src={item.hinhAnh ? `http://localhost:8080/upload/${item.hinhAnh}` : null}
                                            alt="Thumb" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                {getStatusBadge(item.trangThaiDuyet)}
                                                <span className="text-xs font-label text-outline flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                    {new Date(item.ngayDang).toLocaleDateString("vi-VN", {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"})}
                                                </span>
                                            </div>
                                            <Link to={`/tin-tuc/${item.id}`} className="text-lg font-headline font-bold text-on-surface hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                {item.tieuDe}
                                            </Link>
                                        </div>
                                        
                                        <div className="mt-4 flex items-center gap-3">
                                            {item.trangThaiDuyet !== 'TuChoi' ? (
                                                <button onClick={() => openEditModal(item)} className="text-primary hover:bg-blue-50 bg-primary-container/20 border border-primary/20 px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                    Chỉnh sửa
                                                </button>
                                            ) : (
                                                <span className="text-xs text-error font-medium flex items-center gap-1 px-2 py-1 bg-error/10 rounded-lg">
                                                    <span className="material-symbols-outlined text-[14px]">info</span>
                                                    Bài viết bị từ chối không thể sửa
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL SỬA BÀI VIẾT TÁI THIẾT KẾ */}
            {editingNews && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setEditingNews(null)}></div>
                    <div className="relative bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden border border-outline-variant/30 animate-in fade-in zoom-in duration-200">
                        
                        {/* Modal Header */}
                        <div className="px-8 py-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest z-10">
                            <div>
                                <h2 className="text-2xl font-headline font-extrabold text-on-surface">Cập nhật bài viết</h2>
                                <p className="text-xs text-outline mt-1 font-label">Bản chỉnh sửa sẽ được gửi lại cho Admin kiểm duyệt</p>
                            </div>
                            <button onClick={() => setEditingNews(null)} className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-high hover:text-error transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-surface-container-lowest">
                            <form id="editForm" onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-on-surface mb-2 font-headline">Tiêu đề</label>
                                    <input type="text" required value={editTieuDe} onChange={(e) => setEditTieuDe(e.target.value)} className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-on-surface mb-2 font-headline">Nội dung</label>
                                    <textarea required value={editNoiDung} onChange={(e) => setEditNoiDung(e.target.value)} rows="8" className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface leading-relaxed"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-on-surface mb-3 font-headline">Cập nhật ảnh minh họa</label>
                                    <div className="flex items-center gap-5">
                                        <div className="w-32 h-24 shrink-0 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30">
                                            {editPreview ? (
                                                <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-outline">
                                                    <span className="material-symbols-outlined text-2xl">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="hidden" />
                                            <label htmlFor="file-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 rounded-lg text-sm font-bold text-on-surface cursor-pointer transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">upload</span> Thay ảnh mới
                                            </label>
                                            <p className="text-xs text-outline mt-2">Bỏ qua nếu bạn muốn giữ nguyên ảnh cũ.</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-outline-variant/20 flex justify-end gap-3 bg-surface-container-lowest z-10">
                            <button type="button" onClick={() => setEditingNews(null)} className="px-6 py-2.5 font-bold text-on-surface-variant bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-colors">
                                Hủy bỏ
                            </button>
                            <button type="submit" form="editForm" disabled={isSubmitting} className="px-8 py-2.5 font-bold text-white bg-primary rounded-xl hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-primary/20">
                                {isSubmitting ? 'Đang xử lý...' : 'Lưu & Gửi Duyệt Lại'}
                                {!isSubmitting && <span className="material-symbols-outlined text-[18px]">published_with_changes</span>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}