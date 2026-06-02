import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VendorLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const token = localStorage.getItem('accessToken');
    const rolesStr = localStorage.getItem('roles');
    let isVendor = false;
    if (rolesStr) {
        try {
            const roles = JSON.parse(rolesStr);
            isVendor = roles.some(role => role.toUpperCase() === 'ROLE_DOITAC');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (!token || !isVendor) {
            toast.error('Bạn không có quyền truy cập kênh người bán!');
            navigate('/dang-nhap');
        }
    }, [token, isVendor, navigate]);

    if (!token || !isVendor) {
        return null;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/tim-kiem?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const menuItems = [
        { path: '/vendor/dashboard', name: 'Tổng quan', icon: 'dashboard' },
        { path: '/vendor/quan-ly-tin', name: 'Quản lý tin đăng', icon: 'storefront' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-on-surface font-body">
            
            {/* ── TOP NAVBAR (Đồng bộ với Portal chính) ── */}
            <nav
                className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-8 py-3 gap-6 font-headline antialiased"
                style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 1px 0 0 rgba(0,0,0,0.06)',
                }}
            >
                {/* Logo + Search */}
                <div className="flex items-center gap-6 flex-1">
                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-full hover:bg-surface-container transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <span className="material-symbols-outlined text-on-surface-variant">menu</span>
                    </button>

                    <Link to="/" className="text-xl font-extrabold tracking-tight text-blue-700 whitespace-nowrap">
                        Precision Marketplace
                    </Link>

                    <form onSubmit={handleSearch} className="relative hidden md:block flex-1 max-w-md">
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all"
                            placeholder="Tìm kiếm linh kiện..."
                            type="text"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                            <span className="material-symbols-outlined text-outline text-lg">search</span>
                        </button>
                    </form>
                </div>

                {/* Nav Actions */}
                <div className="flex items-center gap-6">
                    <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider">
                        Kênh Người Bán
                    </span>

                    <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
                        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative">
                            <span className="material-symbols-outlined text-slate-600">notifications</span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
                            >
                                <span className="material-symbols-outlined text-blue-600 text-xl">person</span>
                            </button>
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tài khoản</p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{localStorage.getItem('username') || 'Người bán'}</p>
                                    </div>
                                    <Link
                                        to="/"
                                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Về trang mua sắm
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            localStorage.removeItem('accessToken');
                                            localStorage.removeItem('username');
                                            localStorage.removeItem('roles');
                                            navigate('/dang-nhap');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-650 hover:bg-red-50 transition-colors font-semibold"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDE NAVBAR (Glassmorphism sáng đồng bộ) ── */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 z-40 flex flex-col pt-[72px] pb-8 space-y-1 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{
                    background: 'rgba(250,250,250,0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRight: '1px solid rgba(0,0,0,0.05)',
                }}
            >
                <div className="px-5 mb-2 pt-4">
                    <h3 className="text-blue-600 font-extrabold text-base tracking-tight">Kênh Người Bán</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Seller Center Portal</p>
                </div>

                <nav className="flex-1 mt-4 px-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/vendor/dashboard' && location.pathname === '/vendor/');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-bold pl-2'
                                        : 'text-gray-500 hover:text-blue-600 hover:translate-x-1 hover:bg-blue-50/50'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-4 mb-4">
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Quay lại mua sắm
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="md:ml-64 pt-[72px] min-h-screen">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default VendorLayout;
