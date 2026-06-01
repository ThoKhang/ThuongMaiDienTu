import api from '../configs/api';
export const authService = {
  registerUser: async (userData) => {
    const response = await api.post('/api/auth/register-user', userData);
    const authHeader = response.headers['authorization'];
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    return { 
      message: response.data, 
      token: token 
    };
  },
  registerVendor: async (vendorData) => {
    const response = await api.post('/api/auth/register-vendor', vendorData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
  sendOtp: async (email) => {
    const response = await api.post('/api/auth/send-otp', { email });
    return response.data;
  },
  loginOtp: async (email, otp) => {
    const response = await api.post('/api/auth/login-otp', { email, otp });
    return response.data;
  }
};