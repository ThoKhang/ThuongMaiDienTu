import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/layout/DangKy/Header';
import Footer from './Components/layout/DangKy/Footer';
import Register from './Components/Pages/Auth/Register';
import Login from './Components/Pages/Auth/Login';
import ChiTietSanPhamPage from './Components/Pages/sanPham/chiTietSanPhamPage';
import Home from './Components/Pages/TrangChu/TrangChu';
import DanhMuc from './Components/Pages/DanhMuc/DanhMuc';

// BỔ SUNG IMPORT TRANG CHI TIẾT TIN TỨC
import ChiTietTinTuc from './Components/Pages/TinTuc/ChiTietTinTuc';

// BỔ SUNG IMPORT TRANG ĐĂNG TIN VÀ QUẢN LÝ TIN CỦA USER
import DangTin from './Components/Pages/TinTuc/DangTin';
import TinDang from './Components/Pages/TinTuc/TinDang';

import AdminLayout from './Components/layout/admin/AdminLayout';
import Dashboard from './Components/Pages/admin/Dashboard';
import UserManagement from './Components/Pages/admin/UserManagement';
import ProductManagement from './Components/Pages/admin/ProductManagement';
import TransactionManagement from './Components/Pages/admin/TransactionManagement';
// THÊM IMPORT TRANG QUẢN LÝ ĐỐI TÁC
import PartnerManagement from './Components/Pages/admin/PartnerManagement';
import NewsManagement from './Components/Pages/admin/NewsManagement';
import VendorLayout from './Components/layout/vendor/VendorLayout';
import QuanLyTinDang from './Components/Pages/sanPham/QuanLyTinDang';
import VendorDashboard from './Components/Pages/sanPham/VendorDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/dang-ky"
          element={
            <>
              <Header />
              <Register />
              <Footer />
            </>
          }
        />

        <Route path="/dang-nhap" element={<Login />} />

        <Route path="/san-pham/:id" element={<ChiTietSanPhamPage />} />
        <Route path="/danh-muc/:id" element={<DanhMuc />} />

        {/* --- ĐỊNH TUYẾN CHO ĐĂNG TIN VÀ QUẢN LÝ TIN (USER) --- */}
        <Route path="/dang-tin" element={<DangTin />} />
        <Route path="/tin-dang" element={<TinDang />} />

        {/* THÊM ĐỊNH TUYẾN CHO TRANG CHI TIẾT TIN TỨC */}
        <Route 
          path="/tin-tuc/:id" 
          element={
            <>
              <Header />
              <ChiTietTinTuc />
              <Footer />
            </>
          } 
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="commissions" element={<TransactionManagement />} />

          {/* THÊM ROUTE CHO TRANG ĐỐI TÁC */}
          <Route path="partners" element={<PartnerManagement />} />
          <Route path="news" element={<NewsManagement />} />
        </Route>

        {/* --- ROUTE LỒNG NHAU DÀNH CHO VENDOR --- */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<QuanLyTinDang />} />
          <Route path="quan-ly-tin" element={<QuanLyTinDang />} />
          <Route path="dang-tin" element={<div className="bg-white p-6 rounded-2xl shadow-sm"><h2 className="text-xl font-bold mb-4">Đăng sản phẩm mới</h2><p className="text-slate-500">Tính năng đăng sản phẩm mới đang được phát triển.</p></div>} />
          <Route path="dashboard" element={<VendorDashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;