import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/layout/DangKy/Header';
import Footer from './Components/layout/DangKy/Footer';
import Register from './Components/Pages/Auth/Register';
import Login from './Components/Pages/Auth/Login';
import ChiTietSanPhamPage from './Components/Pages/sanPham/chiTietSanPhamPage';

import AdminLayout from './Components/layout/admin/AdminLayout';
import Dashboard from './Components/Pages/admin/Dashboard';
import UserManagement from './Components/Pages/admin/UserManagement';
import ProductManagement from './Components/Pages/admin/ProductManagement';
import TransactionManagement from './Components/Pages/admin/TransactionManagement';
// THÊM IMPORT TRANG QUẢN LÝ ĐỐI TÁC
import PartnerManagement from './Components/Pages/admin/PartnerManagement'; 

function App() {
  return (
    <>
      <Routes>
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
        
        <Route path="/dang-nhap" element={<Login />} />
        
        <Route path="/san-pham/:id" element={<ChiTietSanPhamPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="commissions" element={<TransactionManagement />} />
          
          {/* THÊM ROUTE CHO TRANG ĐỐI TÁC */}
          <Route path="partners" element={<PartnerManagement />} />
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