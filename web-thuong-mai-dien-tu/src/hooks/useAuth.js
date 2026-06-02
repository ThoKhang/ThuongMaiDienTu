import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';

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

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
      }
      if (response.tenDangNhap) {
        localStorage.setItem('username', response.tenDangNhap);
      }
      if (response.roles) {
        localStorage.setItem('roles', JSON.stringify(response.roles));
      }
    },
    onError: (error) => {
      console.error('Lỗi đăng nhập:', error);
      toast.error(error.response?.data || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
    }
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (email) => authService.sendOtp(email),
    onSuccess: () => {
      toast.success('Mã OTP đã được gửi thành công! Hãy kiểm tra console/logs của server.');
    },
    onError: (error) => {
      console.error('Lỗi gửi OTP:', error);
      toast.error(error.response?.data || 'Gửi mã OTP thất bại!');
    }
  });
};

export const useLoginOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) => authService.loginOtp(email, otp),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
      }
      if (response.tenDangNhap) {
        localStorage.setItem('username', response.tenDangNhap);
      }
      if (response.roles) {
        localStorage.setItem('roles', JSON.stringify(response.roles));
      }
    },
    onError: (error) => {
      console.error('Lỗi đăng nhập OTP:', error);
      toast.error(error.response?.data || 'Đăng nhập bằng OTP thất bại!');
    }
  });
};
