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
    }
};