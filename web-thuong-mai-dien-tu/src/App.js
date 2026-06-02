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

import AdminLayout from './Components/layout/admin/AdminLayout';
import Dashboard from './Components/Pages/admin/Dashboard';
import UserManagement from './Components/Pages/admin/UserManagement';
import ProductManagement from './Components/Pages/admin/ProductManagement';
import TransactionManagement from './Components/Pages/admin/TransactionManagement';
// THÊM IMPORT TRANG QUẢN LÝ ĐỐI TÁC
import PartnerManagement from './Components/Pages/admin/PartnerManagement'; 
import VendorLayout from './Components/layout/vendor/VendorLayout';
import QuanLyTinDang from './Components/Pages/sanPham/QuanLyTinDang';
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

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="commissions" element={<TransactionManagement />} />
          
          {/* THÊM ROUTE CHO TRANG ĐỐI TÁC */}
          <Route path="partners" element={<PartnerManagement />} />
        </Route>

        {/* --- ROUTE LỒNG NHAU DÀNH CHO VENDOR --- */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<QuanLyTinDang />} />
          <Route path="quan-ly-tin" element={<QuanLyTinDang />} />
          <Route path="dang-tin" element={<div className="bg-white p-6 rounded-2xl shadow-sm"><h2 className="text-xl font-bold mb-4">Đăng sản phẩm mới</h2><p className="text-slate-500">Tính năng đăng sản phẩm mới đang được phát triển.</p></div>} />
          <Route path="dashboard" element={<div className="bg-white p-6 rounded-2xl shadow-sm"><h2 className="text-xl font-bold mb-4">Tổng quan cửa hàng</h2><p className="text-slate-500">Báo cáo doanh số và phân tích sẽ hiển thị ở đây.</p></div>} />
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