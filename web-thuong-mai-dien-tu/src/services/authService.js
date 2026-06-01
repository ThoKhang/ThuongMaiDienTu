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
  }
};