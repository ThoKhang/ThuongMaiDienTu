import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { FaSearch, FaCheckCircle, FaBan, FaBoxOpen, FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify'; 

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await adminService.getAllProducts();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi tải sản phẩm:", error);
            toast.error("Không thể tải danh sách sản phẩm.");
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, tenSP, status) => {
        const actionText = status === 'DaDuyet' ? 'duyệt' : 'từ chối/khóa';
        if(window.confirm(`Bạn muốn ${actionText} sản phẩm: "${tenSP}"?`)) {
            try {
                await adminService.updateProductStatus(id, status);
                toast.success(`Đã ${actionText} sản phẩm thành công!`);
                fetchProducts(); // Load lại bảng
            } catch (error) {
                toast.error(`Lỗi khi xử lý. Vui lòng thử lại!`);
            }
        }
    };

    const filteredProducts = products.filter(p => 
        p.tenSanPham?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '20px', color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Đang tải dữ liệu sản phẩm...</div>;

    return (
        <div>
            {/* Header giới thiệu trang */}
            <div style={{ marginBottom: '32px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Kiểm duyệt Sản phẩm</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaBoxOpen /> Quản lý danh mục linh kiện từ đối tác, kiểm duyệt chất lượng link Affiliate trước khi hiển thị.
                </p>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: '20px', fontWeight: 'bold' }}>Danh sách linh kiện</h3>
                    
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#6B7280' }} />
                        <input 
                            type="text" 
                            placeholder="Tìm tên sản phẩm..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '12px 16px 12px 42px', width: '300px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '14px', backgroundColor: '#F9FAFB' }}
                            onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', marginTop: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#EFF6FF' }}>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700, borderRadius: '8px 0 0 8px' }}>Mã SP</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Tên linh kiện</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Giá niêm yết</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Trạng thái</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700, textAlign: 'center', borderRadius: '0 8px 8px 0' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#6B7280' }}>#{p.id}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>{p.tenSanPham}</div>
                                        <a href={p.urlAffiliate} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#3B82F6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                            <FaLink /> Link Affiliate gốc
                                        </a>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#EF4444' }}>
                                        {p.giaNiemYet?.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        {p.tinhTrangDuyet === 'DaDuyet' && (
                                            <span style={{ background: '#D1FAE5', color: '#10B981', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>Đã duyệt</span>
                                        )}
                                        {p.tinhTrangDuyet === 'ChoDuyet' && (
                                            <span style={{ background: '#FEF3C7', color: '#D97706', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>Chờ duyệt</span>
                                        )}
                                        {p.tinhTrangDuyet === 'TuChoi' && (
                                            <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>Bị khóa</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            {/* Nút Duyệt chỉ hiện khi đang Chờ duyệt hoặc Bị Khóa */}
                                            {p.tinhTrangDuyet !== 'DaDuyet' && (
                                                <button onClick={() => handleUpdateStatus(p.id, p.tenSanPham, 'DaDuyet')} style={{ padding: '8px 12px', background: '#10B981', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                                                    <FaCheckCircle /> Duyệt
                                                </button>
                                            )}
                                            {/* Nút Khóa/Từ chối chỉ hiện khi đang Chờ duyệt hoặc Đã Duyệt */}
                                            {p.tinhTrangDuyet !== 'TuChoi' && (
                                                <button onClick={() => handleUpdateStatus(p.id, p.tenSanPham, 'TuChoi')} style={{ padding: '8px 12px', background: '#EF4444', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                                                    <FaBan /> Khóa
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Không có sản phẩm nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;