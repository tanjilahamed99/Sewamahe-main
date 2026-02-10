import { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { setRooms, setTyping } from "@/features/chat/chatSlice";
import { Message } from "@/actions/message";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSend, FiImage, FiSmile, FiPaperclip } from "react-icons/fi";
import { getRooms } from "@/actions/Rooms";
import { getSocket } from "@/lib/socket";
import { uploadFile, uploadImage } from "@/actions/upload";

function BottomBar() {
    const imageInput = useRef(null);
    const fileInput = useRef(null);
    const room = useAppSelector((state) => state.chat.room);
    const user = useAppSelector((state) => state.auth.user);

    const [text, setText] = useState("");
    const [isPicker, showPicker] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!room) return;
        const isTyping = text.trim().length > 0;
        getSocket().emit("joinRoom", room._id);
        getSocket().emit("typing", {
            room: room._id,
            userId: user._id,
            isTyping,
        });
        getSocket().on("userTyping", ({ room, userId, isTyping }) => {
            if (userId === user._id) return;
            dispatch(setTyping({ room, userId, isTyping }));
        });
        return () => {
            getSocket().off("userTyping");
        };
    }, [text, dispatch, room, user]);

    const sendMessage = () => {
        if (text.length === 0) return;
        Message({
            roomID: room._id,
            authorID: user._id,
            content: text,
            contentType: "text",
        }).then(() => {
            getRooms()
                .then((res) =>
                    dispatch(setRooms(res.rooms))
                )
                .catch((err) => console.log(err));
        });
        setText("");
        showPicker(false);
    };

    const handleKeyPress = (event) => {
        showPicker(false);
        if (event.key === "Enter") sendMessage();
    };

    const sendImages = async (images) => {
        for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const formData = new FormData();
        formData.append("image", image);
        formData.append("crop", "square");
            try {
                const data = await uploadImage(formData);
                Message({
                    roomID: room._id,
                    authorID: user._id,
                    content: data.image.shieldedID,
                    type: "image",
                }).then(() => {
                    getRooms()
                        .then((res) => dispatch(setRooms(res.rooms)))
                        .catch((err) => console.log(err));
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const sendFiles = async (files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].size / (1024 * 1024) > 10)
                return alert("File exceeds 10MB limit!");
        }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append("file", file);
        try {
            const data = await uploadFile(formData);
            Message({
                roomID: room._id,
                authorID: user._id,
                content: data.file.shieldedID,
                type: "file",
                fileID: data.file._id,
            }).then(() => {
                getRooms()
                    .then((res) => dispatch(setRooms(res.rooms)))
                    .catch((err) => console.log(err));
            });
        } catch (err) {
            console.error(err);
        }
        }
    };

    return (
        <div className="w-full flex items-center gap-2 border-t bg-white dark:bg-gray-900 px-3 py-2">
            {/* Emoji Picker (hidden when not active) */}
            {isPicker && (
                <div className="absolute bottom-14 left-4 z-50 shadow-lg rounded-lg border bg-white dark:bg-gray-800">
                    {/* Insert your Picker component here */}
                    <Picker
                        data={data}
                        onEmojiSelect={(emoji) =>
                            setText((prev) => prev + emoji.native)
                        }
                        theme="light"
                        // onClickOutside={() => showPicker(false)}
                    />
                </div>
            )}

            {/* Emoji Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => showPicker(!isPicker)}
                className="hover:bg-transparent"
            >
                <FiSmile className={`w-6 h-6 ${isPicker ? "text-primary" : "text-gray-500"}`} />
            </Button>

            {/* Hidden Image Input */}
            <input
                type="file"
                ref={imageInput}
                accept="image/*"
                multiple
                hidden
                onChange={(e) => sendImages(e.target.files)}
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => imageInput.current?.click()}
            >
                <FiImage className="w-6 h-6" />
            </Button>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInput}
                multiple
                hidden
                onChange={(e) => sendFiles(e.target.files)}
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInput.current?.click()}
            >
                <FiPaperclip className="w-6 h-6" />
            </Button>

            {/* Message Input */}
            <Input
                type="text"
                placeholder="Type something to send..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => showPicker(false)}
                className="flex-1 !ring-0 border-2 focus:border-primary border-dotted"
            />

            {/* Send Button */}
            <button onClick={sendMessage} className="hover:bg-transparent">
                <FiSend className="w-5 h-5 text-black" />
            </button>
        </div>
    );
}

export default BottomBar;
