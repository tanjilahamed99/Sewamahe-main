import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useEffect } from "react";

const Rooms = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {[].map((c) => (
                    <div
                        key={c._id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 cursor-pointer"
                    >
                        {c.participants.map((u) => (
                            <Avatar key={u._id} className="w-8 h-8">
                                <AvatarImage
                                    src={
                                        u.avatar ||
                                        `https://i.pravatar.cc/150?u=${u._id}`
                                    }
                                />
                                <AvatarFallback>
                                    {u.firstName[0]}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                        <span className="ml-2">
                            {c.participants.map((u) => u.firstName).join(", ")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;