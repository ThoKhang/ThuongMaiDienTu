import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import api from '../../../configs/api';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaInfoCircle, FaMoneyCheckAlt, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AdminQuanLyThanhToan = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchTransactions();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/sanpham');
            if (res.data && res.data.content) {
                setProducts(res.data.content);
            } else if (Array.isArray(res.data)) {
                setProducts(res.data);
            }
        } catch (e) {
            console.error("Lỗi lấy sản phẩm", e);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/api/giaodich-affiliate');
            if (Array.isArray(res.data)) {
                setTransactions(res.data);
            } else {
                setTransactions([]);
            }
            setLoading(false);
        } catch (error) {
            toast.error("Không thể tải danh sách giao dịch.");
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, maGD, newStatus) => {
        if (!newStatus) return;

        const statusLabel = newStatus === 'ThanhCong' ? 'Thành Công' : newStatus === 'GianLan' ? 'Gian Lận' : 'Chờ Duyệt';
        const result = await Swal.fire({
            title: "Xác nhận đổi trạng thái",
            text: `Bạn muốn đổi giao dịch #${id} sang trạng thái ${statusLabel}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        });

        if (!result.isConfirmed) return;

        try {
            await api.put(`/api/giaodich-affiliate/${id}/trang-thai?trangThai=${newStatus}`);

            await Swal.fire({
                title: "Thành công",
                text: `Đã cập nhật trạng thái giao dịch #${id} thành công!`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            fetchTransactions();
        } catch (error) {
            Swal.fire({
                title: "Lỗi",
                text: "Lỗi khi xử lý giao dịch!",
                icon: "error"
            });
        }
    };

    const filtered = transactions.filter(t =>
        t.id?.toString().includes(searchTerm) ||
        t.idSanPham?.toString().includes(searchTerm)
    );

    // Tính toán mini-stats
    const tongChoDuyet = transactions.filter(t => t.trangThaiXacThuc === 'ChoDuyet').reduce((sum, t) => sum + (t.hoaHongNhan || 0), 0);
    const tongDaTra = transactions.filter(t => t.trangThaiXacThuc === 'ThanhCong').reduce((sum, t) => sum + (t.hoaHongNhan || 0), 0);

    if (loading) return <div style={{ padding: '20px', color: '#1E3A8A', fontWeight: 'bold' }}>Đang tải dữ liệu...</div>;

    const getProductName = (id) => {
        const p = products.find(x => x.id === id);
        return p ? p.tenSanPham : id;
    };

    return (
        <div>
            <div style={{ marginBottom: '24px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Quản lý Thanh Toán Affiliate</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaMoneyCheckAlt /> Xem và cập nhật trạng thái thanh toán cho đối tác (Chờ duyệt, Thành công, Gian lận).
                </p>
            </div>

            {/* Khối Thống kê nhanh */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #F59E0B', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>HOA HỒNG CHỜ DUYỆT</div>
                    <div style={{ color: '#F59E0B', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>{tongChoDuyet.toLocaleString('vi-VN')} đ</div>
                </div>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #10B981', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>ĐÃ THANH TOÁN (THÀNH CÔNG)</div>
                    <div style={{ color: '#10B981', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>{tongDaTra.toLocaleString('vi-VN')} đ</div>
                </div>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #EF4444', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>GIAN LẬN PHÁT HIỆN</div>
                    <div style={{ color: '#EF4444', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>
                        {transactions.filter(t => t.trangThaiXacThuc === 'GianLan').length} <span style={{ fontSize: '14px', color: '#9CA3AF' }}>giao dịch</span>
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Danh sách Giao dịch Thanh toán</h3>
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#6B7280' }} />
                        <input type="text" placeholder="Tìm ID giao dịch, SP..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 16px 10px 42px', width: '280px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none' }} />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', marginTop: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F8FAFC' }}>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Mã GD</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Đối tác / Sản phẩm</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Tổng GT</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Hoa hồng</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>PTTT</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700, textAlign: 'center' }}>Hành động Cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#3B82F6' }}>
                                        #{t.id}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 700, color: '#111827' }}>Đối tác ID: {t.idDoiTac}</div>
                                        <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '2px' }}>{getProductName(t.idSanPham)} (x{t.soLuong})</div>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}><FaClock /> {t.ngayGiaoDich || 'N/A'}</div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>
                                        {t.tongGiaTri?.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#10B981' }}>
                                        {t.hoaHongNhan?.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{t.phuongThucTT}</span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <select 
                                            value={t.trangThaiXacThuc} 
                                            onChange={(e) => handleUpdateStatus(t.id, t.id, e.target.value)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #D1D5DB',
                                                outline: 'none',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                backgroundColor: t.trangThaiXacThuc === 'ThanhCong' ? '#D1FAE5' : (t.trangThaiXacThuc === 'GianLan' ? '#FEE2E2' : '#FEF3C7'),
                                                color: t.trangThaiXacThuc === 'ThanhCong' ? '#10B981' : (t.trangThaiXacThuc === 'GianLan' ? '#DC2626' : '#D97706')
                                            }}
                                        >
                                            <option value="ChoDuyet">Chờ duyệt</option>
                                            <option value="ThanhCong">Thành công</option>
                                            <option value="GianLan">Gian lận</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Không có giao dịch nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminQuanLyThanhToan;
