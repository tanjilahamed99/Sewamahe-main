import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const Navigate = (path: string) => {
    window.location.href = path;
};

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    function (response) {
        return response;
    },
    async (error) => {
        const status = error.response.status;
        console.log("error in interceptor", status, error);
        if (status == 401 || status == 403) {
            window.localStorage.clear();
            Navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default API;
