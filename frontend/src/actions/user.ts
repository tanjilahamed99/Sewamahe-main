import API from "@/lib/axios";

export const getUsers = async ({search}) => {
    const res = await API.post("/api/user", { limit:30, search });
    return res.data;
};

export const getFavorite = async () => {
    const res = await API.post("/api/user/favorites");
    return res.data;
};
export const toggleFavorite = async (roomId) => {
    const res = await API.post("/api/user/toggleFavorite", { roomId });
    return res.data;
};

export const changePicture = async (imageId) => {
    const res = await API.post("/api/user/changePicture", { imageId });
    return res.data;
}