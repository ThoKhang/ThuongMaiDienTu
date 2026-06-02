// Helper: decode JWT payload đúng chuẩn UTF-8 (atob() không xử lý được tiếng Việt)
const decodeJwtPayload = (token) => {
    try {
        const base64 = token.split(".")[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const jsonStr = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Lỗi decode JWT:", e);
        return null;
    }
};

export const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    if (!payload) return null;
    console.log("payload", payload);
    return payload.id;
};

export const getUserInfoFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    console.log("JWT payload:", payload);
    return payload;
};