import { useState } from "react";
import { FiPhone, FiMoreHorizontal } from "react-icons/fi";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Picture from "@/components/Picture";
import { useAppSelector } from "@/hooks/useDispatch";
import { getRooms, removeRoom } from "@/actions/Rooms";
import { setRooms } from "@/features/chat/chatSlice";
import { Calling} from "@/actions/call";

export default function Room({ room }) {
    const onlineUsers = useAppSelector((state) => state.chat.onlineUsers);
    const typing = useAppSelector((state) => state.chat.typing[room?._id] || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const [hover, setHover] = useState(false);

    let other ;
    room.people.forEach((person) => {
        if (user._id !== person._id) other = person;
    });
    if (!other?.firstName)
        other = { ...other, firstName: "Deleted", lastName: "User" };

    const title = (
        room.isGroup ? room.title : `${other.firstName} ${other.lastName}`
    ).substring(0, 22);

    let { lastMessage } = room;
    let text = "";
    if (!lastMessage && room.isGroup) text = "New group created.";
    if (!lastMessage && !room.isGroup)
        text = `No messages with ${other.firstName} yet.`;
    if (!lastMessage) lastMessage = {};

    if (lastMessage.author === user._id && !room.isGroup) text += "You: ";
    
    switch (lastMessage.type) {
        case "file":
            text += "Sent a file.";
            break;
        case "image":
            text += "Sent a picture.";
            break;
        default:
            text += lastMessage.content || "";
    }

    const date = lastMessage?.date
        ? moment(lastMessage.date).format("MMM D")
        : "";
    const time = lastMessage?.date
        ? moment(lastMessage.date).format("h:mm A")
        : "";

    const getStatus = () => {
        if (room.isGroup) return null;
        if (onlineUsers.some((u) => u.id === other._id && u.status === "busy"))
            return "busy";
        if (
            onlineUsers.some((u) => u.id === other._id && u.status === "online")
        )
            return "online";
        if (onlineUsers.some((u) => u.id === other._id && u.status === "away"))
            return "away";
        return null;
    };

    const call = async () => {
        await Calling({isVideo:false, dispatch,navigate,onlineUsers,other,room,toast,user})
    };

    const remove = async () => {
        try {
            await removeRoom({ roomId: room._id });
            toast.success("Room deleted successfully.");
            const res = await getRooms();
            dispatch(setRooms(res.rooms));
            navigate("/dashboard", { replace: true });
        } catch (e) {
            toast.error("Error while removing room. Please try again.");
        }
    };

    const status = getStatus();

    return (
        <Card
            className={`flex items-center text-gray-500  text-xs justify-between rounded-none py-2 px-3 h-14 hover:bg-muted transition cursor-pointer group ${
                location.pathname.includes(room._id) ? "bg-muted/60" : ""
            }`}
            onClick={() => {
                const target = `/room/${room._id}`;
                if (location.pathname !== target)
                    navigate(target, { replace: true });
            }}
        >
            {/* Left - Picture + Info */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Picture user={other} size={38} />
                    {status && (
                        <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                                status === "online"
                                    ? "bg-green-500"
                                    : status === "away"
                                    ? "bg-yellow-400"
                                    : "bg-gray-400"
                            }`}
                        ></span>
                    )}
                </div>

                <div>
                    <div className="font-bold">
                        {title}
                        {title.length > 22 && "..."}
                    </div>
                    <div className="truncate max-w-[180px]">
                        {typing.length > 0 ? "typing..." : text}
                    </div>
                </div>
            </div>

            {/* Right - Hover actions */}
            <div className="flex items-center">
                {hover || (
                    <div className="text-right leading-tight group-hover:hidden">
                        {date && (
                            <>
                                {date}
                                <br />
                                {time}
                            </>
                        )}
                    </div>
                )}
                <div
                    className={` ${
                        hover ? "group-hover:flex " : "group-hover:flex hidden"
                    } items-center"`}
                >
                    <Button size="icon" variant="ghost" onClick={call}>
                        <FiPhone className="h-4 w-4" />
                    </Button>
                    <DropdownMenu
                        open={hover}
                        onOpenChange={() => setHover(!hover)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <FiMoreHorizontal className="h-4 w-4 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className=" hover:bg-slate-50"
                        >
                            <DropdownMenuItem onClick={remove}>
                                Remove
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}
