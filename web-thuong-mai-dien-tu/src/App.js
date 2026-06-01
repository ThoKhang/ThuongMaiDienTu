import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/layout/DangKy/Header';
import Footer from './Components/layout/DangKy/Footer';
import Register from './Components/Pages/Auth/Register';
import ChiTietSanPhamPage from './Components/Pages/sanPham/chiTietSanPhamPage';

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
          } />
        <Route path="/san-pham/:id" element={<ChiTietSanPhamPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
