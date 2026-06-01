import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';

/**
 * Hook đăng ký tài khoản người mua
 * Sau khi thành công, lưu token vào localStorage và điều hướng về trang chủ
 */
export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData) => authService.registerUser(userData),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
      }
      toast.success('Đăng ký người dùng thành công!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Lỗi đăng ký:', error);
      toast.error(error.response?.data || 'Đã có lỗi xảy ra từ máy chủ!');
    }
  });
};

/**
 * Hook đăng ký tài khoản người bán (DoiTac)
 * Yêu cầu người dùng đã đăng nhập (có token) trước khi gọi API này.
 * Trả về DoiTacLienKetResponse từ backend.
 */
export const useRegisterVendor = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (vendorData) => authService.registerVendor(vendorData),
    onSuccess: () => {
      toast.success('Đăng ký người bán thành công! Vui lòng chờ duyệt.');
      navigate('/');
    },
    onError: (error) => {
      console.error('Lỗi đăng ký người bán:', error);
      toast.error(error.response?.data || 'Đã có lỗi khi đăng ký người bán!');
    }
  });
};
