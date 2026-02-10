import { uploadImage } from "@/actions/upload";
import { changePicture } from "@/actions/user";
import Picture from "@/components/Picture";
import { Button } from "@/components/ui/button";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Setting = ({ handleLogout, showPopup, showQualificationPopup }) => {
    const user = useAppSelector((state) => state.auth.user);
    const fileInput = useRef(null);
    const dispatch = useAppDispatch();

    const change = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("crop", "square");
        const picture = await uploadImage(formData);
        await changePicture(picture.image._id);
        const newUser = { ...user, picture: picture.image };
        dispatch(setCredentials(newUser));
    };

    const remove = async () => {
        await changePicture(null);
        const newUser = { ...user, picture: undefined };
        dispatch(setCredentials(newUser));
    };

    return (
        <div className="p-4 space-y-2 flex flex-col items-center text-white">
            <div className="relative inline-block my-6">
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={(e) => change(e.target.files[0])}
                    className="hidden"
                />
                {/* Picture Container */}
                <div
                    className="group relative cursor-pointer rounded-xl overflow-hidden transition duration-300"
                    onClick={() => fileInput.current?.click()}
                >
                    <Picture size={140} user={user} />
                    <div className="absolute inset-0 flex rounded-full items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                        <FiEdit2 className="text-white text-2xl" />
                    </div>
                </div>
            </div>
            <Button
                onClick={() => showPopup(true)}
                className="uppercase w-full bg-black/90 text-xs hover:bg-black/30 hover:text-black"
            >
                Change Password
            </Button>
            {user.type === "Consultant" && (
                <Button
                    onClick={() => showQualificationPopup(true)}
                    className="uppercase w-full bg-black/90 text-xs hover:bg-black/30 hover:text-black"
                >
                    Qualification
                </Button>
            )}
            <Button
                onClick={remove}
                className="uppercase w-full bg-black/90 text-xs hover:bg-black/30 hover:text-black"
            >
                Remove Picture
            </Button>
            <Link to="/monetization" className="w-full">
                <Button className="uppercase w-full bg-black/90 text-xs hover:bg-black/30 hover:text-black">
                    Monetization
                </Button>
            </Link>
            <Button
                onClick={handleLogout}
                variant="destructive"
                className="uppercase w-full text-xs"
            >
                Logout
            </Button>
        </div>
    );
};

export default Setting;