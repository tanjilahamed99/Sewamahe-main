import configuration from "@/config/configuration";
import axios from "axios";

const getWebsiteInfo = () => {
    return axios({
        method: "get",
        url: `${configuration.url || ""}/api/website/get`,
    });
};

export default getWebsiteInfo;
