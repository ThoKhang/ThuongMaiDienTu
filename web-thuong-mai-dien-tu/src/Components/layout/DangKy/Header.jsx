import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-effect shadow-[0_1px_0_0_rgba(0,0,0,0.05)] px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-xl font-headline font-extrabold tracking-tight text-primary">
          Precision Marketplace
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <span className="text-sm font-medium text-gray-600">
          Bạn đã có tài khoản?
        </span>
        <Link to="/dang-nhap" className="px-5 py-2 text-sm font-semibold text-primary border border-primary-container rounded-lg hover:bg-primary-fixed duration-200">
          Đăng nhập
        </Link>
      </div>
    </header>
  );
};

export default Header;