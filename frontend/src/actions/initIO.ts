import {
    addMessage,
    addUnreadMessage,
    setOnlineUsers,
    setRooms,
} from "@/features/chat/chatSlice";
import { getRooms } from "./Rooms";
import { logout } from "@/features/auth/authSlice";
import messageSound from "../assets/message.mp3";
import { store } from "@/store";
import { initSocket } from "@/lib/socket";
import { callAccepted, callEnded, incomingCall, setCallToken } from "@/features/call/callSlice";

const initIO = (token: string) => {
    const socket = initSocket(token);
    socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
    });
    socket.on("disconnect", (reason: string) => {
        console.warn("❌ Socket disconnected:", reason);
    });

    socket.on("message-in", async (data) => {
        const { room, message } = data;
        const currentRoom = store.getState().chat.room;

        // Play message sound
        const audio = new Audio(messageSound);
        audio.play().catch(() => {});

        // Add message
        // if (currentRoom && currentRoom._id === room._id) {
        //     store.dispatch(addMessage(message));
        // }

        // if (currentRoom && currentRoom._id !== room._id) {
        //     store.dispatch(addUnreadMessage(message));
        // }

        // Refresh room list
        try {
            const res = await getRooms();
            store.dispatch(setRooms(res.rooms));
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("onlineUsers", (users) => {
        store.dispatch(setOnlineUsers(users));
    });
    
    socket.on("user-deleted", async () => {
        localStorage.removeItem("token");
        await store.dispatch(logout());
    });

    // here we will add the call listeners
    socket.on("call", (data) => {
        store.dispatch(incomingCall(data));
    });
    
    socket.on("setCallToken", (data) => {
        store.dispatch(setCallToken(data));
    });

    socket.on("answer", () => {
        store.dispatch(callAccepted());
    });

    socket.on("close", () => {
        store.dispatch(callEnded());
    });

    return socket;
};

export default initIO;
