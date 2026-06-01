import Footer from "./Components/layout/DangKy/Footer";
import Header from "./Components/layout/DangKy/Header";
import Main from "./Components/Pages/Auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </div>
  );
}

export default App;
