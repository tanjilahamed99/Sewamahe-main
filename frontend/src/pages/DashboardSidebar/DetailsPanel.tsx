import { useAppSelector } from "@/hooks/useDispatch";
import { Link, useNavigate } from "react-router-dom";
import Picture from "../../components/Picture";
import { FiArrowLeft } from "react-icons/fi";

const DetailsPanel = ({ className = "" }) => {
    const location = window.location.pathname;
    const user = useAppSelector((state) => state.auth.user);
    const room = useAppSelector((state) => state.chat.room);
    const navigate = useNavigate();
    const back = () => navigate(`/room/${room._id}`, { replace: true });
    let selectedUser = null;

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    if (!room || room.people.length === 0 || location === "/dashboard" && user.type === 'Consultant') {
        return (
            <div
                className={`flex flex-col items-center justify-center h-full p-4  text-center ${className}`}
            >
                <div className="w-full flex flex-col items-center mt-8">
                    <img src="/logo.png" alt="Logo" className="max-w-28 mb-6" />
                    <h2 className="text-base font-bold mb-2">
                        Welcome To Sewamahe{" "}
                    </h2>
                    <p className="text-muted-foreground text-xs px-8">
                        Sewamahe is a messaging app that enables real-time
                        messaging, audio and video calls.
                    </p>
                </div>
                <div className="flex flex-col justify-end h-full text-sm space-y-1">
                    {links.map((l) => (
                        <Link
                            to={l.path}
                            key={l.path}
                            className="text-primary hover:underline"
                        >
                            {l.name}
                        </Link>
                    ))}
                    <p className="pt-2">
                        Copyright @Sewamahe <br /> v2.9.2
                    </p>
                </div>
            </div>
        );
    }
    if (room.people) {
        room.people.forEach((person) => {
            if (user._id !== person._id) selectedUser = person;
        });
    }
    
    return (
        <div className={`${className}`}>
            {location.includes("/info") && (
                <div className="flex items-center justify-between px-4 py-2 h-14 border-b rounded-none bg-background/70 backdrop-blur-sm">
                    <FiArrowLeft onClick={back} className="cursor-pointer" />
                </div>
            )}
            <div className={`p-6 flex flex-col items-center space-y-8`}>
                <Picture size={200} user={selectedUser} />
                <div >
                    <h3 className=" font-semibold">
                        <span className="font-normal">Name: </span>
                        {selectedUser?.firstName} {selectedUser?.lastName}
                    </h3>
                    {selectedUser.type === "Consultant" && (
                        <div>
                            <h3 className=" font-semibold">
                                <span className="font-normal">
                                    Qualification:{" "}
                                </span>
                                {selectedUser?.qualification}
                            </h3>
                            <h3 className=" font-semibold">
                                <span className="font-normal">Status: </span>
                                {selectedUser?.consultantStatus}
                            </h3>
                            <h3 className=" font-semibold">
                                <span className="font-normal">Fees: </span>
                                {selectedUser?.price}/Minute
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPanel;
