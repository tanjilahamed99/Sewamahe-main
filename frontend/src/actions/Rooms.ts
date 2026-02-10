import API from '@/lib/axios';

export const createRoom = async (id) => {
    const res = await API.post("/api/rooms", { id });
    return res.data;
};

export const getRooms = async () => {
    const res = await API.post("/api/rooms/list", { limit: 30 });
    return res.data;
};

export const getRoom = async (id) => {
    const res = await API.get(`/api/rooms/join/${id}`);
    return res.data;
};

export const getFavoriteRooms = async () => {
    const res = await API.post("/api/rooms/favorites", { limit: 30 });
    return res.data;
};

export const removeRoom = async ({roomId}) => {
    const res = await API.post("/api/rooms/remove", { roomId });
    return res.data;
};



