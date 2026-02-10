import configuration from "@/config/configuration";
import IO from "socket.io-client";


let socket = null;
export const initSocket = (token: string) => {
    if (!socket) {
        socket = IO(configuration.url, {
            auth: { token },
            transports: ["websocket"],
            withCredentials: true,
        });
    }
    return socket;
};

export const getSocket = () => socket;
