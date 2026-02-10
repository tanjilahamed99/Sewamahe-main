import API from "@/lib/axios";

export const updateMyBalance = async (data) => {
    const res = await API.put("/api/user/balance/update", data);
    return res.data;
}