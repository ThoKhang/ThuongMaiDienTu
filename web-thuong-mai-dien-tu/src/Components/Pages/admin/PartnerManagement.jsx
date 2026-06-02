import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { FaHandshake, FaSearch, FaSave, FaCheckCircle, FaBan, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PartnerManagement = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State quản lý việc chỉnh sửa dòng
    const [editingId, setEditingId] = useState(null);
    const [editRate, setEditRate] = useState(0);
    const [editStatus, setEditStatus] = useState('');

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const data = await adminService.getAllPartners();
            setPartners(data);
            setLoading(false);
        } catch (error) {
            toast.error("Không thể tải danh sách đối tác.");
            setLoading(false);
        }
    };

    const handleStartEdit = (partner) => {
        setEditingId(partner.id);
        setEditRate(partner.tyLeHoaHong);
        setEditStatus(partner.trangThai);
    };

    const handleSaveConfig = async (id) => {
        try {
            await adminService.updatePartnerConfig(id, editRate, editStatus);
            toast.success("Cấu hình đối tác đã được cập nhật!");
            setEditingId(null);
            fetchPartners();
        } catch (error) {
            toast.error("Lỗi khi lưu cấu hình.");
        }
    };

    const filtered = partners.filter(p => 
        p.tenDoiTac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '20px', color: '#1E3A8A', fontWeight: 'bold' }}>Đang tải danh sách đối tác...</div>;

    return (
        <div>
            {/* Header Banner */}
            <div style={{ marginBottom: '24px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Quản lý mạng lưới Đối tác</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaHandshake /> Cấu hình tỷ lệ chia sẻ hoa hồng affiliate, kiểm soát API và theo dõi doanh số của các thương hiệu.
                </p>
            </div>

            {/* Bảng chức năng chính */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Danh sách nhà phân phối</h3>
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#6B7280' }} />
                        <input type="text" placeholder="Tìm tên đối tác, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 16px 10px 42px', width: '280px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none' }} />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', marginTop: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F8FAFC' }}>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Thương hiệu</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Liên hệ & Kết nối</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Chiết khấu</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Hiệu suất tích lũy</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700 }}>Trạng thái</th>
                                <th style={{ padding: '16px', color: '#4B5563', fontWeight: 700, textAlign: 'center' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6', backgroundColor: editingId === p.id ? '#F8FAFC' : 'transparent' }}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#111827', fontSize: '15px' }}>
                                        {p.tenDoiTac}
                                        <div style={{ fontValue: 'normal', color: '#9CA3AF', fontSize: '12px', fontWeight: 400, marginTop: '4px' }}>Ngày tham gia: {p.ngayHopTac}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: '#4B5563' }}>{p.email}</div>
                                        <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px', fontFamily: 'monospace' }}>API: {p.apiEndpoint || 'Chưa thiết lập'}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        {editingId === p.id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <input type="number" step="0.1" value={editRate} onChange={(e) => setEditRate(parseFloat(e.target.value))} style={{ width: '60px', padding: '6px', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
                                                <span style={{ fontWeight: 'bold' }}>%</span>
                                            </div>
                                        ) : (
                                            <span style={{ fontWeight: 'bold', color: '#3B82F6', fontSize: '15px' }}>{p.tyLeHoaHong}%</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: '#374151', fontWeight: 600 }}><FaChartBar style={{ color: '#9CA3AF' }} /> {p.tongSoDonHang} đơn hàng</div>
                                        <div style={{ color: '#10B981', fontWeight: 'bold', fontSize: '13px', marginTop: '2px' }}>+ {p.tongHoaHongTichLuy?.toLocaleString('vi-VN')} đ</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        {editingId === p.id ? (
                                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #D1D5DB' }}>
                                                <option value="HoatDong">Hoạt động</option>
                                                <option value="TamDung">Tạm dừng</option>
                                            </select>
                                        ) : (
                                            <>
                                                {p.trangThai === 'HoatDong' ? (
                                                    <span style={{ background: '#D1FAE5', color: '#10B981', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Đang chạy</span>
                                                ) : (
                                                    <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Tạm ngừng</span>
                                                )}
                                            </>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        {editingId === p.id ? (
                                            <button onClick={() => handleSaveConfig(p.id)} style={{ padding: '8px 12px', background: '#10B981', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                <FaSave /> Lưu
                                            </button>
                                        ) : (
                                            <button onClick={() => handleStartEdit(p)} style={{ padding: '6px 12px', background: '#EFF6FF', color: '#3B82F6', border: '1px solid #BFDBFE', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                                                Cấu hình
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PartnerManagement;