import { useAppSelector } from "@/hooks/useDispatch";
import Room from "./components/Room";

const Favorites = () => {
    const favorites = useAppSelector((state) => state.chat.favorites);
    return (
        <>
            {favorites.length > 0 ? (
                favorites.map((user) => (
                    <Room
                        key={user._id}
                        room={user}
                    />
                ))
            ) : (
                <div className="text-center text-gray-400 mt-5">
                    No favorite users found
                </div>
            )}
        </>
    );
};

export default Favorites;
