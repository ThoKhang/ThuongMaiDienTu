import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa';
const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <FaHome /> },
        { path: '/admin/users', name: 'Quản lý người dùng', icon: <FaUsers /> },
        { path: '/admin/products', name: 'Kiểm duyệt sản phẩm', icon: <FaBoxOpen /> },
        { path: '/admin/commissions', name: 'Quản lý hoa hồng', icon: <FaMoneyBillWave /> },
    ];

    return (
        // Nền tổng thể màu xanh xám nhạt để làm nổi bật nội dung
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F4F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            
            {/* Sidebar MÀU XANH ĐẬM (Deep Blue) */}
            <aside style={{ width: '260px', backgroundColor: '#1E3A8A', color: '#FFFFFF', boxShadow: '4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h2 style={{ margin: 0, color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>LKMT Portal</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#93C5FD', fontWeight: 500 }}>Admin Workspace</p>
                </div>

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
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', borderRadius: '8px', transition: '0.3s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EF4444'; e.currentTarget.style.color = '#FFF'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}>
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;