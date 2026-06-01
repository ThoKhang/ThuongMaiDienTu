import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { FaLock, FaUnlock, FaSearch, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify'; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setLoading(false);
            toast.error("Không thể tải danh sách tài khoản.");
        }
    };

    // Thêm hàm kiểm tra Admin
    const isAdminUser = (user) => {
        return user.vaiTros.some(role => role.toLowerCase() === 'admin');
    };

    const handleToggleStatus = async (user) => {
        // ✅ Chặn ngay từ frontend
        if (isAdminUser(user)) {
            toast.warning("Không thể khóa tài khoản Admin!");
            return;
        }

        const hienTaiDangHoatDong = user.trangThai === 'HoatDong';
        const hanhDong = hienTaiDangHoatDong ? 'khóa' : 'mở khóa';

        if (window.confirm(`Bạn có chắc chắn muốn ${hanhDong} tài khoản ${user.tenDangNhap}?`)) {
            try {
                await adminService.toggleUserStatus(user.id);
                toast.success(`Đã ${hanhDong} tài khoản ${user.tenDangNhap} thành công!`);
                fetchUsers();
            } catch (error) {
                toast.error(`Lỗi khi ${hanhDong} tài khoản. Vui lòng thử lại!`);
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.tenDangNhap.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '20px', color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Đang tải dữ liệu...</div>;

    return (
        <div>
            {/* TIÊU ĐỀ GIỚI THIỆU TRANG TRÔNG CAO CẤP HƠN */}
            <div style={{ marginBottom: '32px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Quản lý Tài khoản</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaShieldAlt /> Quản trị rủi ro, phân quyền và kiểm soát trạng thái truy cập của toàn bộ thành viên hệ thống.
                </p>
            </div>

            <div style={{ background: '#fff', padding: '0', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: '20px', fontWeight: 'bold' }}>Danh sách thành viên</h3>
                    
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: '#6B7280' }} />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm tài khoản, email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '12px 16px 12px 42px', width: '320px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '14px', transition: 'all 0.3s', backgroundColor: '#F9FAFB' }}
                            onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; e.target.style.backgroundColor = '#FFF'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#F9FAFB'; }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto', padding: '0 24px 24px 24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px', marginTop: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#EFF6FF' }}>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700, borderRadius: '8px 0 0 8px' }}>ID</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Tài khoản</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Thông tin liên hệ</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Vai trò</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700 }}>Trạng thái</th>
                                <th style={{ padding: '16px', color: '#1E3A8A', fontWeight: 700, textAlign: 'center', borderRadius: '0 8px 8px 0' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#6B7280' }}>#{user.id}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>{user.tenDangNhap}</div>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>Tham gia: {new Date(user.ngayTao).toLocaleDateString('vi-VN')}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: '#4B5563', fontWeight: 500 }}>{user.email}</div>
                                        <div style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '4px' }}>{user.soDienThoai || 'Chưa cập nhật SĐT'}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ background: '#3B82F6', color: '#FFF', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                                            {user.vaiTros.join(', ')}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        {user.trangThai === 'HoatDong' ? (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700, background: '#D1FAE5', padding: '6px 12px', borderRadius: '6px' }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 5px #10B981' }}></span> Hoạt động
                                            </span>
                                        ) : (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontWeight: 700, background: '#FEE2E2', padding: '6px 12px', borderRadius: '6px' }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 5px #EF4444' }}></span> Đã khóa
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                         {isAdminUser(user) ? (
                                            // ✅ Hiển thị badge thay vì nút khóa cho Admin
                                            <span style={{
                                                padding: '8px 16px',
                                                background: '#EFF6FF',
                                                color: '#1E3A8A',
                                                borderRadius: '8px',
                                                fontSize: '13px',
                                                fontWeight: 'bold'
                                            }}>
                                                Quản trị viên
                                            </span>
                                        ) : (
                                        <button 
                                            onClick={() => handleToggleStatus(user)}
                                            title={user.trangThai === 'HoatDong' ? "Nhấn để khóa" : "Nhấn để mở khóa"}
                                            style={{ 
                                                padding: '10px 18px', 
                                                background: user.trangThai === 'HoatDong' ? '#FEF2F2' : '#ECFDF5', 
                                                color: user.trangThai === 'HoatDong' ? '#EF4444' : '#10B981', 
                                                border: `1px solid ${user.trangThai === 'HoatDong' ? '#FCA5A5' : '#6EE7B7'}`, 
                                                borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', transition: 'all 0.2s',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'; }}
                                        >
                                            {user.trangThai === 'HoatDong' ? <><FaLock /> Khóa TK</> : <><FaUnlock /> Mở khóa</>}
                                        </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ padding: '60px', textAlign: 'center', color: '#9CA3AF', fontSize: '16px' }}>Không tìm thấy tài khoản nào phù hợp với từ khóa của bạn.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;