import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/layout/DangKy/Header';
import Footer from './Components/layout/DangKy/Footer';
import Register from './Components/Pages/Auth/Register';
import Login from './Components/Pages/Auth/Login';
import ChiTietSanPhamPage from './Components/Pages/sanPham/chiTietSanPhamPage';

// BỔ SUNG IMPORT TRANG ADMIN
import AdminLayout from './Components/layout/admin/AdminLayout';
import Dashboard from './Components/Pages/admin/Dashboard';
import UserManagement from './Components/Pages/admin/UserManagement';

function App() {
  return (
    <>
      <Routes>
        {/* --- CÁC ROUTE KHÁCH HÀNG --- */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Register />
              <Footer />
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
        
        {/* Đã gộp thành công route Đăng nhập từ nhánh khác */}
        <Route path="/dang-nhap" element={<Login />} />
        
        <Route path="/san-pham/:id" element={<ChiTietSanPhamPage />} />

        {/* --- ROUTE LỒNG NHAU DÀNH CHO ADMIN --- */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Thuộc tính 'index' nghĩa là tự động hiển thị Dashboard khi vào đúng /admin */}
          <Route index element={<Dashboard />} />
          
          {/* Bỏ dấu '/' ở trước chữ users để nó nối tiếp vào /admin */}
          <Route path="users" element={<UserManagement />} />
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