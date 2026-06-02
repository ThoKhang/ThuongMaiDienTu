import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    navigate('/dang-nhap');
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-effect shadow-[0_1px_0_0_rgba(0,0,0,0.05)] px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-xl font-headline font-extrabold tracking-tight text-primary">
          Precision Marketplace
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Chào, <span className="font-bold text-gray-800">{username || 'Thành viên'}</span>
            </span>
            {(() => {
              try {
                const roles = JSON.parse(localStorage.getItem('roles') || '[]');
                if (roles.some(role => role.toUpperCase() === 'ROLE_ADMIN')) {
                  return (
                    <Link to="/admin" className="text-sm font-semibold text-primary hover:underline">
                      Kênh quản trị
                    </Link>
                  );
                }
              } catch (e) {}
              return null;
            })()}
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 duration-200 cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <span className="text-sm font-medium text-gray-600">
              Bạn đã có tài khoản?
            </span>
            <Link to="/dang-nhap" className="px-5 py-2 text-sm font-semibold text-primary border border-primary-container rounded-lg hover:bg-primary-fixed duration-200">
              Đăng nhập
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;