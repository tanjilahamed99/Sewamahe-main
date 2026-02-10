import API from "@/lib/axios";

export const getAllUsers = () => {
  return API.get("/api/admin/users/all");
};
export const deleteUser = (data) => {
  return API.delete("/api/admin/user", data);
};

export const updateUser = (data) => {
  return API.put("/api/admin/user/update", data);
};

export const updatePaygic = (data) => {
  return API.post("/api/admin/paygic/set", data);
};

export const updateLiveKit = (data) => {
  return API.post("/api/admin/liveKit/set", data);
};

export const getLiveKit = () => {
  return API.get("/api/admin/liveKit/get");
};

export const getLiveKitUser = () => {
  return API.get("/api/website/liveKit/get");
};

export const updateRazorpay = (data) => {
  return API.post("/api/admin/razorpay/set", data);
};

export const updateWebData = (data) => {
  return API.put("/api/admin/website/set", data);
};

export const getWebData = () => {
  return API.get("/api/user/webData/get");
};

export const getPayGicInfo = () => {
  return API.get("/api/admin/paygic/get");
};

export const getRazorpayInfo = () => {
  return API.get("/api/admin/razorpay/get");
};

export const creditUser = (data) => {
  return API.post("/api/admin/credit", data);
};

export const consultantStatusUpdate = (data) => {
  return API.post("/api/admin/consultant-status-update", data);
};

export const getAllWithdrawals = () => {
  return API.get("/api/admin/withdrawals/all");
};

export const getSingleWithdrawals = (id) => {
  return API.get(`/api/admin/withdrawals/single/${id}`);
};

export const updateWithdrawalStatus = ({ id, data }) => {
  return API.put(`/api/admin/withdrawal/update/${id}`, data);
};

export const getAllTransactions = () => {
  return API.get("/api/admin/transactions/all");
};

export const getAllContact = () => {
  return API.get("/api/admin/contact/get/all");
};

export const deleteContact = ({contactId}) => {
  return API.delete("/api/admin/contact/delete", { data: { contactId } });
};
