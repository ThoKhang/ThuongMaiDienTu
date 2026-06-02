import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaSignOutAlt, FaBoxOpen, FaHandshake, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    const rolesStr = localStorage.getItem('roles');
    
    // Lấy username để hiển thị
    const [adminName, setAdminName] = useState('');

    let isAdmin = false;
    if (rolesStr) {
        try {
            const roles = JSON.parse(rolesStr);
            isAdmin = roles.some(role => role.toUpperCase() === 'ROLE_ADMIN');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!token || !isAdmin) {
            toast.error('Bạn không có quyền truy cập trang quản trị!');
            navigate('/'); // Đá về thẳng trang chủ nếu nhập bậy link
        } else {
            // Nếu hợp lệ thì lấy tên in ra
            const storedName = localStorage.getItem('username');
            if(storedName) setAdminName(storedName);
        }
    }, [token, isAdmin, navigate]);

    if (!token || !isAdmin) {
        return null;
    }

    const handleLogout = () => {
        if(window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống Admin?")) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
            localStorage.removeItem('roles');
            toast.success("Đã đăng xuất thành công!");
            navigate('/'); // ĐĂNG XUẤT XONG THÌ ĐÁ VỀ TRANG CHỦ
        }
    };

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <FaHome /> },
        { path: '/admin/users', name: 'Quản lý người dùng', icon: <FaUsers /> },
        { path: '/admin/products', name: 'Kiểm duyệt sản phẩm', icon: <FaBoxOpen /> },
        { path: '/admin/commissions', name: 'Quản lý hoa hồng', icon: <FaMoneyBillWave /> },
        { path: '/admin/partners', name: 'Quản lý đối tác', icon: <FaHandshake /> },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F4F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            
            <aside style={{ width: '260px', backgroundColor: '#1E3A8A', color: '#FFFFFF', boxShadow: '4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                
                {/* Khu vực Logo */}
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h2 style={{ margin: 0, color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>LKMT Portal</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#93C5FD', fontWeight: 500 }}>Admin Workspace</p>
                </div>
                
                {/* Khu vực Thông tin Admin */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.15)' }}>
                    <FaUserCircle style={{ fontSize: '32px', color: '#60A5FA' }} />
                    <div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Xin chào,</div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#F8FAFC' }}>{adminName || 'Quản trị viên'}</div>
                    </div>
                </div>

                {/* Menu */}
                <nav style={{ flex: 1, padding: '24px 12px' }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', margin: '0 0 8px 0',
                                    textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'all 0.3s ease', borderRadius: '8px',
                                    color: isActive ? '#FFFFFF' : '#BFDBFE',
                                    backgroundColor: isActive ? '#3B82F6' : 'transparent', 
                                    boxShadow: isActive ? '0 4px 10px rgba(59, 130, 246, 0.3)' : 'none'
                                }}
                                onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                                onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
                            >
                                <span style={{ fontSize: '18px', color: isActive ? '#FFF' : '#93C5FD' }}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', borderRadius: '8px', transition: '0.3s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EF4444'; e.currentTarget.style.color = '#FFF'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}>
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;