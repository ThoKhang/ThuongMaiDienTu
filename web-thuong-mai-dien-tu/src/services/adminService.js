import api from '../configs/api'; 

export const adminService = {
    getAllUsers: async () => {
        // Gắn /api trực tiếp vào request
        const response = await api.get('/api/admin/users');
        return response.data;
    },
    
    toggleUserStatus: async (id) => {
        // Gắn /api trực tiếp vào request
        const response = await api.put(`/api/admin/users/${id}/status`);
        return response.data;
    },
    getAllProducts: async () => {
        const response = await api.get('/api/admin/products');
        return response.data;
    },
    
    updateProductStatus: async (id, status) => {
        // Truyền status qua Query Parameter (?status=DaDuyet)
        const response = await api.put(`/api/admin/products/${id}/status?status=${status}`);
        return response.data;
    },
    getDashboardStats: async () => {
        const response = await api.get('/api/admin/dashboard');
        return response.data;
    },
    getAllTransactions: async () => {
        const response = await api.get('/api/admin/transactions');
        return response.data;
    },
    
    updateTransactionStatus: async (id, status) => {
        const response = await api.put(`/api/admin/transactions/${id}/status?status=${status}`);
        return response.data;
    }
};