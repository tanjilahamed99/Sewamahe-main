import configuration from "@/config/configuration";
import API from "@/lib/axios";

export const getRazorpayInfo = ({ userId, email }) => {
    return API({
        method: "get",
        url: `${configuration.url || ""}/api/payment/razorpay/get/${userId}/${email}`,
    });
};
