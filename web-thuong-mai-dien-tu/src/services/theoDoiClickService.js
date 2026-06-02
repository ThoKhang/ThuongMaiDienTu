import api from "../configs/api";

export const theoDoiClickService = {
    createClick: async (data) => {
        const response = await api.post(
            "/api/theodoi-click",
            data
        );
        return response.data;
    }
};