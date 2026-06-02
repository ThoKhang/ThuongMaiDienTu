import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserLayout from '../../layout/UserLayout';

export default function DangTin() {
    const navigate = useNavigate();
    const [tieuDe, setTieuDe] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [fileAnh, setFileAnh] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lấy ID người dùng (Nếu bạn lưu là 'id' hay 'userId' thì hãy sửa cho khớp)
    const idNguoiDang = localStorage.getItem('userId') || localStorage.getItem('id'); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileAnh(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idNguoiDang) {
            toast.error("Vui lòng đăng nhập để thực hiện chức năng này!");
            return navigate('/dang-nhap');
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('tieuDe', tieuDe);
        formData.append('noiDung', noiDung);
        formData.append('idNguoiDang', idNguoiDang);
        if (fileAnh) formData.append('file', fileAnh);

        try {
            const response = await fetch('http://localhost:8080/api/tintuc/dang-tin', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Gửi bài thành công! Vui lòng chờ Admin kiểm duyệt.');
                navigate('/tin-dang');
            } else {
                toast.error('Lỗi khi gửi bài viết.');
            }
        } catch (error) {
            toast.error('Không thể kết nối đến máy chủ.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <UserLayout>
            <div className="px-4 md:px-8 pb-20">
                
                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-2 text-xs font-medium text-outline py-6 font-label">
                    <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <Link to="/tin-dang" className="hover:text-primary transition-colors">Quản lý bài đăng</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface line-clamp-1">Viết bài mới</span>
                </nav>

                <div className="max-w-4xl mx-auto mt-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Tạo bài viết mới</h1>
                        <p className="text-on-surface-variant mt-2">Chia sẻ kiến thức, tin tức công nghệ hoặc đánh giá linh kiện đến cộng đồng Precision Marketplace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-sm border border-outline-variant/30 space-y-8">
                        
                        {/* Tiêu đề */}
                        <div>
                            <label className="block text-sm font-bold text-on-surface mb-2 font-headline">
                                Tiêu đề bài viết <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                required 
                                value={tieuDe}
                                onChange={(e) => setTieuDe(e.target.value)}
                                placeholder="Ví dụ: Đánh giá chi tiết hiệu năng RTX 4090 Founders Edition..."
                                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface"
                            />
                        </div>

                        {/* Nội dung */}
                        <div>
                            <label className="block text-sm font-bold text-on-surface mb-2 font-headline">
                                Nội dung chi tiết <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                required 
                                value={noiDung}
                                onChange={(e) => setNoiDung(e.target.value)}
                                rows="10"
                                placeholder="Nhập nội dung bài viết của bạn tại đây..."
                                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-on-surface leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Ảnh minh họa */}
                        <div>
                            <label className="block text-sm font-bold text-on-surface mb-3 font-headline">Ảnh bìa minh họa</label>
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <label className="flex flex-col items-center justify-center w-full sm:w-2/3 h-48 border-2 border-dashed border-outline-variant/60 rounded-2xl cursor-pointer hover:bg-surface-container hover:border-primary/50 transition-colors bg-surface-container-lowest group relative overflow-hidden">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <span className="material-symbols-outlined text-5xl text-outline mb-3 group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                                        <p className="text-sm text-on-surface font-bold">Kéo thả hoặc click để chọn ảnh</p>
                                        <p className="text-xs text-outline mt-1 uppercase tracking-widest font-label mt-2">PNG, JPG, WEBP (Tối đa 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                                
                                {preview ? (
                                    <div className="w-full sm:w-1/3 h-48 relative rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm group">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">Ảnh đã chọn</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full sm:w-1/3 h-48 rounded-2xl border border-outline-variant/20 bg-surface-container-low flex flex-col items-center justify-center text-outline border-dashed">
                                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">image</span>
                                        <span className="text-xs font-medium">Chưa có ảnh</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nút hành động */}
                        <div className="pt-6 border-t border-outline-variant/30 flex justify-end gap-4">
                            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl font-bold text-on-surface-variant bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                                Hủy bỏ
                            </button>
                            <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl font-bold text-white bg-primary hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center gap-2">
                                {isSubmitting ? 'Đang tải lên...' : 'Gửi bài chờ duyệt'}
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
}