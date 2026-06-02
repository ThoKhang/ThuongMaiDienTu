import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout'; // Đảm bảo đường dẫn này đúng với dự án của bạn

/* ─── Skeleton Loader ─── */
const SkeletonBlock = ({ className = '' }) => (
    <div className={`animate-pulse bg-surface-container rounded-lg ${className}`} />
);

const ChiTietTinTucSkeleton = () => (
    <div className="px-4 md:px-8 pb-20 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
                <SkeletonBlock className="h-10 w-3/4" />
                <SkeletonBlock className="h-6 w-1/4" />
                <SkeletonBlock className="aspect-[16/9] w-full rounded-xl" />
                <div className="space-y-4">
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-5/6" />
                </div>
            </div>
            <div className="lg:col-span-4 space-y-4">
                <SkeletonBlock className="h-8 w-1/2 mb-6" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <SkeletonBlock className="w-24 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <SkeletonBlock className="h-4 w-full" />
                            <SkeletonBlock className="h-3 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function ChiTietTinTuc() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [baiViet, setBaiViet] = useState(null);
    const [tinMoiNhat, setTinMoiNhat] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatNgay = (ngay) => {
        if (!ngay) return "";
        return new Date(ngay).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    // Scroll lên đầu trang mỗi khi chuyển bài viết
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        Promise.all([
            fetch(`http://localhost:8080/api/tintuc/${id}`).then(res => {
                if (!res.ok) throw new Error("Không tìm thấy bài viết!");
                return res.json();
            }),
            fetch(`http://localhost:8080/api/tintuc/moi-nhat`).then(res => res.json().catch(() => []))
        ])
        .then(([baiVietData, tinMoiData]) => {
            setBaiViet(baiVietData);
            setTinMoiNhat(tinMoiData.filter(tin => tin.id !== parseInt(id)));
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [id]);

    if (error) {
        return (
            <UserLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 py-12">
                    <span className="material-symbols-outlined text-6xl text-error">error_outline</span>
                    <h2 className="text-2xl font-headline font-bold text-on-surface">Không tìm thấy bài viết</h2>
                    <p className="text-on-surface-variant text-center max-w-sm">
                        {error || 'Bài viết không tồn tại hoặc đã bị gỡ khỏi hệ thống.'}
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-container transition-colors"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            {loading ? (
                <ChiTietTinTucSkeleton />
            ) : (
                <div className="px-4 md:px-8 pb-20">
                    
                    {/* ── Breadcrumb ── */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-outline py-6 font-label">
                        <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                        
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        
                        <Link to="/tin-tuc" className="hover:text-primary transition-colors">
                            Tin tức công nghệ
                        </Link>
                        
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        
                        <span className="text-on-surface line-clamp-1 max-w-[300px]">
                            {baiViet?.tieuDe}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* ── LEFT: Nội dung bài viết (8 cols) ── */}
                        <div className="lg:col-span-8">
                            <article className="bg-surface-container-lowest p-6 md:p-10 rounded-xl shadow-sm border border-outline-variant/20">
                                
                                {/* Tiêu đề & Meta */}
                                <header className="mb-8">
                                    <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface leading-tight mb-4">
                                        {baiViet.tieuDe}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-outline border-b border-outline-variant/30 pb-6">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                                            {formatNgay(baiViet.ngayDang)}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-lg">person</span>
                                            Admin
                                        </div>
                                        <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ml-auto">
                                            Tin tức hệ thống
                                        </span>
                                    </div>
                                </header>

                                {/* Ảnh Cover */}
                                {baiViet.hinhAnh ? (
                                    <div className="w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
                                        <img 
                                            src={baiViet.hinhAnh} 
                                            alt={baiViet.tieuDe} 
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-[21/9] mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-inner">
                                        <span className="material-symbols-outlined text-6xl text-white/30">newspaper</span>
                                    </div>
                                )}

                                {/* Nội dung chi tiết */}
                                <div className="prose prose-lg prose-blue max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line">
                                    {baiViet.noiDung}
                                </div>
                                
                                {/* Box Share / Tags */}
                                <div className="mt-12 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm font-medium rounded-lg hover:bg-surface-container transition-colors cursor-pointer">#LinhKienPC</span>
                                        <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm font-medium rounded-lg hover:bg-surface-container transition-colors cursor-pointer">#CongNghe</span>
                                    </div>
                                    <button className="flex items-center gap-2 text-primary hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-bold">
                                        <span className="material-symbols-outlined">share</span>
                                        Chia sẻ
                                    </button>
                                </div>
                            </article>
                        </div>

                        {/* ── RIGHT: Sidebar Tin tức mới (4 cols) ── */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-t-4 border-secondary sticky top-[96px]">
                                <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary">flash_on</span>
                                    Tin tức mới nhất
                                </h3>

                                <div className="space-y-5">
                                    {tinMoiNhat.map((tin) => (
                                        <Link 
                                            key={tin.id} 
                                            to={`/tin-tuc/${tin.id}`}
                                            className="flex gap-4 group cursor-pointer hover:bg-surface-container-low rounded-lg p-2 transition-colors -ml-2"
                                        >
                                            {/* Thumbnail Mini */}
                                            <div className="w-24 h-16 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0 relative">
                                                {tin.hinhAnh ? (
                                                    <img 
                                                        src={tin.hinhAnh} 
                                                        alt={tin.tieuDe} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary-container text-primary">
                                                        <span className="material-symbols-outlined text-xl">article</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Title & Date Mini */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                                    {tin.tieuDe}
                                                </h4>
                                                <p className="text-xs text-outline mt-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                    {new Date(tin.ngayDang).toLocaleDateString("vi-VN")}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                    
                                    {tinMoiNhat.length === 0 && (
                                        <p className="text-outline text-sm text-center py-4">Chưa có tin tức nào khác.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </UserLayout>
    );
}