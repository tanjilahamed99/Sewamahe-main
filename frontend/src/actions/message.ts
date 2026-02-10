import API from "@/lib/axios";

export const Message = (data) => {
    return API.post(`/api/message`, data);
};
export const getMoreMessages = (data) => {
    return API.post(`/api/message/more`, data);
};