import {
  FiPhone,
  FiMoreHorizontal,
  FiVideo,
  FiStar,
  FiInfo,
  FiArrowLeft,
} from "react-icons/fi";
import moment from "moment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import { getRooms, removeRoom } from "@/actions/Rooms";
import { setFavorites, setRooms } from "@/features/chat/chatSlice";
import { toggleFavorite } from "@/actions/user";
import { useEffect, useRef, useState } from "react";
import Picture from "@/components/Picture";
import { FaStar } from "react-icons/fa";
import { Calling } from "@/actions/call";

export const RoomNav = () => {
  const user = useAppSelector((state) => state.auth.user);
  const room = useAppSelector((state) => state.chat.room) || {};
  const favorites = useAppSelector((state) => state.chat.favorites) || {};
  const typing = useAppSelector((state) => state.chat.typing[room._id] || []);
  const onlineUsers = useAppSelector((state) => state.chat.onlineUsers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let other;
  if (room.people) {
    room.people.forEach((person) => {
      if (user._id !== person._id) other = person;
    });
  }

  // No room selected yet
  if (!room || Object.keys(room).length === 0) return;

  const title = (
    room.isGroup ? room.title : `${other?.firstName} ${other?.lastName}`
  ).slice(0, 22);

  const call = async (isVideo: boolean) => {
    await Calling({
      isVideo,
      dispatch,
      navigate,
      onlineUsers,
      other,
      room,
      toast,
      user,
    });
  };

  const handleFavorite = async () => {
    const res = await toggleFavorite(room._id);
    dispatch(setFavorites(res.favorites));
  };
  const isFavorite = favorites.some(
    (fav) => fav._id?.toString() === room._id?.toString(),
  );

  const roomInfo = () => {
    navigate(`/room/${room._id}/info`, { replace: true });
  };

  const Online = ({ other }) => {
    const prevStatusRef = useRef(false);
    const [lastOnline, setLastOnline] = useState(null);

    useEffect(() => {
      const isOnline = onlineUsers.filter((u) => u.id === other._id).length > 0;

      if (prevStatusRef.current && !isOnline) {
        setLastOnline(moment().valueOf());
      }

      prevStatusRef.current = isOnline;
    }, [onlineUsers, other]);

    const status = onlineUsers.find((u) => u.id === other._id)?.status;

    if (status === "busy") return "Busy";
    if (status === "online") return "Online";
    if (status === "away") return "Away";
    if (lastOnline) return `Last online: ${moment(lastOnline).fromNow()}`;
    return `Last online: ${
      other?.lastOnline ? moment(other.lastOnline).fromNow() : "Never"
    }`;
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

  const getStatus = () => {
    if (room.isGroup) return null;
    if (!other) {
      return;
    }
    if (
      onlineUsers.filter((u) => u.id === other._id && u.status === "busy")
        .length > 0
    )
      return "busy";
    if (
      onlineUsers.filter((u) => u.id === other._id && u.status === "online")
        .length > 0
    )
      return "online";
    if (
      onlineUsers.filter((u) => u.id === other._id && u.status === "away")
        .length > 0
    )
      return "away";
    return null;
  };

  const back = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <Card
      className="flex items-center justify-between md:px-4 py-2 h-14 border-b rounded-none bg-background/70 
        backdrop-blur-sm">
      {/* Left - Info */}
      <div className="flex items-center w-1/2 md:w-full gap-2 md:gap-0">
        <button className="text-3xl m-0 md:p-3 md:hidden" onClick={back}>
          <FiArrowLeft className="text-xl" />
        </button>
        <div className="flex items-center gap-1 md:gap-3">
          <div className="relative">
            <Picture size={42} user={other} />
            {getStatus() ? (
              <div className="w-3.5 h-3.5 rounded-full  bg-green-500 absolute -right-0.5 bottom-0 border-2 border-white" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-gray-600 leading-tight text-sm">
              {title}
              {title.length >= 22 && "..."}
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground md:truncate md:max-w-[180px]">
              {typing.length > 0
                ? "typing..."
                : other && <Online other={other} />}
            </div>
          </div>
        </div>
      </div>
      {/* Right - Controls */}
      <div className="flex items-center md:gap-1 w-1/2 md:w-full justify-end">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => call(true)}
          title="Video Call"
          className="hover:bg-primary/10">
          <FiVideo className="md:w-5 md:h-5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => call(false)}
          title="Voice Call"
          className="hover:bg-primary/10">
          <FiPhone className="md:w-5 md:h-5" />
        </Button>

        <Button size="icon" variant="ghost" onClick={handleFavorite}>
          {isFavorite ? (
            <FaStar className="w-5 h-5 text-yellow-500" />
          ) : (
            <FiStar className="w-5 h-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" title="More Options">
              <FiMoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={roomInfo}
              className="flex items-center justify-between">
              Room Info
              <FiInfo className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={remove}
              className="text-destructive hover:bg-destructive/10">
              Remove Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
