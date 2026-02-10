import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useDispatch";
import { addMessage, addUnreadMessage, setMessages, setRoom } from "@/features/chat/chatSlice";
import { getRoom } from "@/actions/Rooms";
import Loader from "@/components/Loader";
import { RoomNav } from "./components/Topbar";
import Content from "./components/Content/Content";
import SendBar from "./components/SendBar";
import { store } from "@/store";
import { getSocket } from "@/lib/socket";

const Conversation = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const socket = getSocket();

    useEffect(() => {
        setLoading(true);
        getRoom(id)
            .then((res) => {
                dispatch(setRoom(res.room));
                dispatch(setMessages(res.room.messages));
            })
            .catch(() => {
                dispatch(setRoom(null));
                dispatch(setMessages([]));
            });
        setLoading(false);
    }, [id]);
        
    useEffect(() => {
        if (!socket) return;
        const handleMessage = (data) => {
            const currentRoom = store.getState().chat.room;
            if (currentRoom && currentRoom._id === data.room._id) {
                dispatch(addMessage(data.message));
            }
            if (currentRoom && currentRoom._id !== data.room._id) {
                   dispatch(addUnreadMessage(data.message));
               }
        };
        socket.on("message-in", handleMessage);
        setLoading(false);
        return () => {
            socket.off("message-in", handleMessage);
        };
    }, [socket]);

    return (
        <div className="flex flex-col h-full bg-slate-100">
            <RoomNav />
            <div className="flex-1 overflow-y-auto space-y-2">
                {loading ? <Loader className="w-16 h-16" /> : <Content />}
            </div>
            <SendBar />
        </div>
    );
};

export default Conversation;
