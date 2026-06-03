import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaShieldAlt, FaInfoCircle, FaMoneyCheckAlt, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify'; 

const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await adminService.getAllTransactions();
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            toast.error("Không thể tải danh sách giao dịch.");
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, maGD, status) => {
        const actionText = status === 'DaXacNhan' ? 'XÁC NHẬN (Thanh toán hoa hồng)' : 'TỪ CHỐI (Hủy hoa hồng)';
        if(window.confirm(`Bạn muốn ${actionText} giao dịch ${maGD}?`)) {
            try {
                await adminService.updateTransactionStatus(id, status);
                toast.success(`Đã xử lý giao dịch ${maGD} thành công!`);
                fetchTransactions(); 
            } catch (error) {
                toast.error(`Lỗi khi xử lý giao dịch!`);
            }
        }
    };

    const filtered = transactions.filter(t => 
        t.maGiaoDich?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.sanPham?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tính toán mini-stats
    const tongChoDuyet = transactions.filter(t => t.trangThaiXacThuc === 'ChoDuyet').reduce((sum, t) => sum + t.hoaHong, 0);
    const tongDaTra = transactions.filter(t => t.trangThaiXacThuc === 'DaXacNhan').reduce((sum, t) => sum + t.hoaHong, 0);

    if (loading) return <div style={{ padding: '20px', color: '#1E3A8A', fontWeight: 'bold' }}>Đang tải dữ liệu...</div>;

    return (
        <div>
            <div style={{ marginBottom: '24px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Đối soát Giao dịch Affiliate</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaShieldAlt /> Kiểm tra luồng Click chống gian lận và xác nhận thanh toán hoa hồng cho đối tác.
                </p>
            </div>

            {/* Khối Thống kê nhanh */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #F59E0B', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>HOA HỒNG CHỜ DUYỆT</div>
                    <div style={{ color: '#F59E0B', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>{tongChoDuyet.toLocaleString('vi-VN')} đ</div>
                </div>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #10B981', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>ĐÃ THANH TOÁN</div>
                    <div style={{ color: '#10B981', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>{tongDaTra.toLocaleString('vi-VN')} đ</div>
                </div>
                <div style={{ background: '#FFF', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #3B82F6', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 'bold' }}>SỐ ĐƠN CẦN XỬ LÝ</div>
                    <div style={{ color: '#3B82F6', fontSize: '24px', fontWeight: '900', marginTop: '5px' }}>
                        {transactions.filter(t => t.trangThaiXacThuc === 'ChoDuyet').length} <span style={{ fontSize: '14px', color: '#9CA3AF' }}>giao dịch</span>
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Lịch sử & Đối soát</h3>
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#6B7280' }} />
                        <input type="text" placeholder="Tìm mã GD, sản phẩm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 16px 10px 42px', width: '280px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none' }} />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', marginTop: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F8FAFC' }}>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Mã GD</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Đối tác / Sản phẩm</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Doanh thu</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Hoa hồng</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Trạng thái</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700, textAlign: 'center' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#3B82F6' }}>
                                        {t.maGiaoDich}
                                        <div style={{ color: '#9CA3AF', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }} title={`Click ID: ${t.idClick} | IP: ${t.ipClick}`}>
                                            <FaInfoCircle /> {t.ipClick}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 700, color: '#111827' }}>[{t.doiTac}]</div>
                                        <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '2px' }}>{t.sanPham} (x{t.soLuong})</div>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}><FaClock/> {t.ngayGiaoDich} - Khách: {t.khachHang}</div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>
                                        {t.tongGiaTri?.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#10B981' }}>
                                        + {t.hoaHong?.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        {t.trangThaiXacThuc === 'DaXacNhan' && <span style={{ background: '#D1FAE5', color: '#10B981', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Đã xác nhận</span>}
                                        {t.trangThaiXacThuc === 'ChoDuyet' && <span style={{ background: '#FEF3C7', color: '#D97706', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Chờ duyệt</span>}
                                        {t.trangThaiXacThuc === 'TuChoi' && <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Đã từ chối</span>}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            {t.trangThaiXacThuc === 'ChoDuyet' && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(t.id, t.maGiaoDich, 'DaXacNhan')} style={{ padding: '8px 12px', background: '#10B981', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }} title="Duyệt hoa hồng">
                                                        <FaCheckCircle />
                                                    </button>
                                                    <button onClick={() => handleUpdateStatus(t.id, t.maGiaoDich, 'TuChoi')} style={{ padding: '8px 12px', background: '#EF4444', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }} title="Từ chối (Đơn Hủy/Lừa đảo)">
                                                        <FaTimesCircle />
                                                    </button>
                                                </>
                                            )}
                                        </div>
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

export default TransactionManagement;