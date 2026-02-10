import API from "@/lib/axios";

export const login = (email, password) => {
  return API.post("/api/auth/login", { email, password });
};

export const register = (data) => {
  return API.post("/api/auth/register", data);
};

export const myData = () => {
  return API.get("api/auth/profile");
};

export const sendCode = (email) => {
  return API.post("api/auth/forgot-password", { email });
};

export const forgetPassword = (email, authCode, password) => {
  return API.post("/api/auth/reset-password", {
    email,
    code: authCode,
    password,
  });
};

export const changePassword = (email, newPassword, password) => {
  return API.post("/api/auth/change-password", {
    email,
    newPassword,
    password,
  });
};

export const saveFcmToken = (data) => {
  return API.post("/api/auth/save-fcm-token", data);
};
