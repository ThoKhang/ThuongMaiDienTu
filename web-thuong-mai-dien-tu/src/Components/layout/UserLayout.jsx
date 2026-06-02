import React, { useState } from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };
  const danhMucIdToPath = {
    1: '/danh-muc/vi-xu-ly',
    2: '/danh-muc/ram',
    3: '/danh-muc/luu-tru',
    4: '/danh-muc/bo-mach-chu',
    5: '/danh-muc/nguon-psu',
    6: '/danh-muc/card-do-hoa',
  };
  const getActivePath = () => {
    const isDanhMucPage = location.pathname.startsWith('/danh-muc/');
    if (isDanhMucPage) return location.pathname;

    const idDanhMuc = location.state?.idDanhMuc;
    if (idDanhMuc) return danhMucIdToPath[idDanhMuc] || null;

    return null;
  };

  const activePath = getActivePath();

  const danhMucSidebar = [
    { icon: 'memory', label: 'Vi xử lý', path: '/danh-muc/1' },
    { icon: 'sd_storage', label: 'RAM', path: '/danh-muc/2' },
    { icon: 'hard_drive', label: 'Lưu trữ', path: '/danh-muc/3' },
    { icon: 'settings_input_component', label: 'Bo mạch chủ', path: '/danh-muc/4' },
    { icon: 'power', label: 'Nguồn PSU', path: '/danh-muc/5' },
    { icon: 'video_settings', label: 'Card đồ họa', path: '/danh-muc/6' },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* ── TOP NAVBAR ── */}
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
              className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all"
              placeholder="Tìm kiếm linh kiện..."
              type="text"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined text-outline text-lg">search</span>
            </button>
          </form>
        </div>

        {/* Nav links + actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/tin-dang" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Tin đăng
            </Link>
            <Link to="/yeu-thich" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Yêu thích
            </Link>
            <Link to="/tin-tuc" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Tin tức
            </Link>
            <Link to="/ho-tro" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Hỗ trợ
            </Link>
          </div>

          <div className="flex items-center gap-3 border-l border-outline-variant pl-5">
            {isLoggedIn ? (
              <>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
                  <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                </button>
                <button
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
                  onClick={() => navigate('/dang-tin')}
                >
                  Đăng tin
                </button>
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-xl">person</span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dang-nhap"
                  className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/dang-ky"
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDE NAVBAR ── */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 z-40 flex flex-col pt-[72px] pb-8 space-y-1 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{
          background: 'rgba(249,249,249,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <div className="px-5 mb-2 pt-4">
          <h3 className="text-blue-600 font-extrabold text-base tracking-tight">Linh Kiện Gốc</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Phòng thí nghiệm chính xác</p>
        </div>

        <nav className="flex-1 mt-4 px-2">
          {danhMucSidebar.map((item) => {
            const isActive = activePath === item.path;
            return(
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
              <span>{item.label}</span>
            </Link>
            );
          })}
        </nav>

        <div className="px-4 mb-4">
          <button
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/quan-ly-cua-hang')}
          >
            Quản lý cửa hàng
          </button>
        </div>

        <div className="px-3 space-y-0.5">
          <Link
            to="/cai-dat"
            className="flex items-center gap-3 px-3 py-3 text-sm text-gray-500 rounded-lg hover:text-blue-600 hover:translate-x-1 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span>Cài đặt</span>
          </Link>
          <Link
            to="/tro-giup"
            className="flex items-center gap-3 px-3 py-3 text-sm text-gray-500 rounded-lg hover:text-blue-600 hover:translate-x-1 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[22px]">help</span>
            <span>Trợ giúp</span>
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="md:ml-64 pt-[72px] min-h-screen">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="md:ml-64 py-10 px-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 font-headline text-xs uppercase tracking-widest">
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <span className="text-sm font-black text-gray-900">Precision Marketplace</span>
          <p className="text-gray-500 normal-case tracking-normal text-xs">
            © 2024 Precision Marketplace. Đối tác linh kiện chuyên nghiệp.
          </p>
        </div>
        <div className="flex gap-6">
          {['Về chúng tôi', 'Điều khoản', 'Bảo mật', 'Liên hệ'].map((item) => (
            <Link
              key={item}
              to="#"
              className="text-gray-500 hover:text-blue-600 transition-colors normal-case tracking-normal text-xs"
            >
              {item}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
