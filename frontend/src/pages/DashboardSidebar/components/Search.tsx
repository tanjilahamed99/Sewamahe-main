import { useAppDispatch } from "@/hooks/useDispatch";
import UserHead from "./components/UserHead";
import { createRoom } from "@/actions/Rooms";
import { useLocation, useNavigate } from "react-router-dom";
import { setMessages, setRoom } from "@/features/chat/chatSlice";

const Search = ({users}) => {
    const dispatch = useAppDispatch();
      const navigate = useNavigate();
      const location = useLocation();

    const handleUserClick = async(user) => {
        const res = await createRoom(user._id);
        const target = `/room/${res.room._id}`;
        dispatch(setRoom(res.room));
        dispatch(setMessages(res.room.messages));

        if (location.pathname !== target) navigate(target, { replace: true });
    };

    return (
        <div className="flex flex-col">
            {users.length > 0 ? (
                users.map((user) => (
                    <UserHead
                        key={user._id}
                        handleUserClick={handleUserClick}
                        user={user}
                    />
                ))
            ) : (
                <div className="text-center text-gray-400 mt-5">
                    No users found
                </div>
            )}
        </div>
    );
};

export default Search;
