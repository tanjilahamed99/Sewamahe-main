import { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { Lightbox } from "react-modal-image";
import { moreMessages } from "@/features/chat/chatSlice";
import { getMoreMessages } from "@/actions/message";
import configuration from "@/config/configuration";
import Message from "./components/Message";
import Loader from "@/components/Loader";
import Picture from "../../../../components/Picture";

export default function Content() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const messages = useAppSelector((state) => state.chat.messages);
    const room = useAppSelector((state) => state.chat.room);
    const typing = useAppSelector(
        (state) => state.chat.typing[room?._id] || []
    );
    const chatRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [openImage, setOpenImage] = useState(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const prevMessagesLength = useRef(messages.length);

    // Identify the other user (if not group chat)
    let other = { firstName: "A", lastName: "A" };
    if (!room?.isGroup && room?.people) {
        room.people.forEach((person) => {
            if (person._id !== user._id) other = person;
        });
    }

    // Check if user is at bottom of chat
    const checkIfAtBottom = useCallback(() => {
        if (!chatRef.current) return true;
        const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        return distanceFromBottom <= 100;
    }, []);

    // Infinite scroll for more messages
    const onScroll = useCallback(async () => {
        const chat = chatRef.current;
        if (!chat) return;

        // Update whether user is at bottom
        setIsAtBottom(checkIfAtBottom());

        // Load more messages when at top
        if (chat.scrollTop === 0 && !loading) {
            setLoading(true);
            try {
                const { data } = await getMoreMessages({
                    roomID: room._id,
                    firstMessageID: messages[0]?._id,
                });
                const scrollHeightBefore = chat.scrollHeight;
                dispatch(moreMessages(data.messages));
                setTimeout(() => {
                    if (chatRef.current) {
                        chatRef.current.scrollTop =
                            chatRef.current.scrollHeight - scrollHeightBefore;
                    }
                }, 0);
            } catch (err) {
                console.error("Error loading more messages", err);
            } finally {
                setLoading(false);
            }
        }
    }, [loading, messages, room?._id, dispatch, checkIfAtBottom]);

    // Handle new messages - auto scroll to bottom only if user is already at bottom
    useEffect(() => {
        if (!chatRef.current || messages.length === 0) return;

        const isNewMessageAdded = messages.length > prevMessagesLength.current;

        if (isNewMessageAdded && isAtBottom) {
            setTimeout(() => {
                if (chatRef.current) {
                    chatRef.current.scrollTo({
                        top: chatRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }
            }, 10);
        }

        prevMessagesLength.current = messages.length;
    }, [messages.length, isAtBottom]);

    // Scroll to bottom on initial load
    useEffect(() => {
        if (chatRef.current && messages.length > 0) {
            setTimeout(() => {
                if (chatRef.current) {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                    setIsAtBottom(true);
                }
            }, 50);
        }
    }, [room?._id]);

    // Handle typing indicator - scroll to bottom if at bottom
    useEffect(() => {
        if (typing.length > 0 && isAtBottom && chatRef.current) {
            setTimeout(() => {
                if (chatRef.current) {
                    chatRef.current.scrollTo({
                        top: chatRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }
            }, 50);
        }
    }, [typing.length, isAtBottom]);

    return (
        <div className="flex-grow h-full flex flex-col max-w-full overflow-hidden">
            {loading && (
                <div className="flex justify-center py-2">
                    <Loader className="w-5 h-5" />
                </div>
            )}

            <div className="flex-1 overflow-hidden">
                {/* Lightbox Dialog */}
                {openImage && (
                    <Lightbox
                        medium={`${configuration.url || ""}/api/image/${
                            openImage.content
                        }/1024`}
                        large={`${configuration.url || ""}/api/image/${
                            openImage.content
                        }/2048`}
                        alt="Lightbox"
                        hideDownload
                        onClose={() => setOpenImage(null)}
                    />
                )}

                {/* Scrollable Messages Area */}
                <div
                    ref={chatRef}
                    onScroll={onScroll}
                    className="h-full overflow-y-auto scroll-smooth"
                >
                    <div className="flex flex-col min-h-full">
                        <div className="max-w-4xl mx-auto w-full px-2 sm:px-4 py-2">
                            {/* Messages */}
                            {messages.map((message, index) => (
                                <Message
                                    key={message._id}
                                    message={message}
                                    previous={messages[index - 1]}
                                    next={messages[index + 1]}
                                    onOpen={setOpenImage}
                                />
                            ))}

                            {/* Typing Animation */}
                            {typing.length > 0 && (
                                <div className="flex items-end space-x-2 mb-4">
                                    <Picture user={other} size={60} />
                                    <div className="bg-muted text-muted-foreground px-4 py-3 rounded-2xl rounded-bl-none">
                                        <div className="flex space-x-1 items-center">
                                            <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                                            <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
