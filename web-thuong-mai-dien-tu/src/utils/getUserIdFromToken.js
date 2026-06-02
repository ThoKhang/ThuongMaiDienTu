export const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );
        console.log("payload", payload);
        return payload.id;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserInfoFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
};