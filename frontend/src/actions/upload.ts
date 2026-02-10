import API from "@/lib/axios";

export const uploadImage = async (formData) => {
    const res = await API.post("/api/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
export const uploadFile = async (formData) => {
    const res = await API.post("/api/uploadfile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
