import { memo } from "react";
import moment from "moment";
import emojiRegex from "emoji-regex";
import DOMPurify from "dompurify";
import striptags from "striptags";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useDispatch";
import configuration from "@/config/configuration";
import { FiDownloadCloud } from "react-icons/fi";
import Picture from "@/components/Picture";

interface MessageProps {
    message: any;
    previous?: any;
    next?: any;
    onOpen?: (msg: any) => void;
}

const Message = memo(({ message, previous, next, onOpen }: MessageProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const { content, date, type } = message;
    let { author } = message;

    if (!author) author = { firstName: "Deleted", lastName: "User" };
    if (previous && !previous.author) previous.author = author;
    if (next && !next.author) next.author = author;

    const isMine = user?._id === author?._id;
    
    // Message grouping (for bubble attachments)
    const attachPrevious =
        previous &&
        Math.abs(moment(previous.date).diff(moment(date), "minutes")) < 5 &&
        author._id === previous.author._id;

    const attachNext =
        next &&
        Math.abs(moment(next.date).diff(moment(date), "minutes")) < 5 &&
        author._id === next.author._id;

    // Emoji-only check
    const noEmoji = content.replace(emojiRegex(), "");
    const isOnlyEmoji = !noEmoji.replace(/[\s\n]/gm, "");

    const formatTime = (time: string) => moment(time).format("MMM DD - h:mm A");

    const convertUrls = (text: string) => {
        const urlRegex =
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
        return text.replace(
            urlRegex,
            (url) =>
                `<a href="${url}" target="_blank" class="text-blue-500 underline break-all">${url}</a>`
        );
    };

    const FileMessage = () => {
        if (!message?.file) return null;
        // File info
        const fileName = message.file.name || message.content || "File";
        const fileSize = message.file.size
            ? `${(message.file.size / 1024 / 1024).toFixed(1)} MB`
            : "";

        // Download URL from backend
        const downloadUrl = `${ configuration?.url || ""}/api/file/${encodeURIComponent(message.content)}`;
        return (
            <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={fileName}
                className="flex items-center justify-between p-1 md:p-2 gap-4 rounded-xl text-sm transition"
            >
                <div>
                    <h3 className="font-semibold text-sm sm:text-base break-all">
                        {fileName}
                    </h3>
                    {fileSize && (
                        <div className="text-xs opacity-75">{fileSize}</div>
                    )}
                </div>
                <FiDownloadCloud className="text-xl" />
            </a>
        );
    };

    // Content Renderer
    const renderContent = () => {
        switch (type) {
            case "image":
                return (
                    <img
                        src={`${configuration.url || ''}/api/image/${content}`}
                        alt="attachment"
                        onClick={() => onOpen?.(message)}
                        className="sm:max-w-xs rounded-xl cursor-pointer hover:opacity-90 transition"
                    />
                );

            case "file":
                return <FileMessage />;

            default: {
                const sanitized = DOMPurify.sanitize(
                    convertUrls(
                        striptags(content, [
                            "a",
                            "strong",
                            "b",
                            "i",
                            "em",
                            "u",
                            "br",
                        ])
                    )
                );
                return (
                    <div
                        className={cn(
                            "text-sm leading-relaxed break-words",
                            isOnlyEmoji && "text-3xl"
                        )}
                        dangerouslySetInnerHTML={{ __html: sanitized }}
                    />
                );
            }
        }
    };

    return (
        <div
            className={cn(
                "flex w-full mb-0.5 relative",
                isMine ? "justify-end" : "justify-start",
                attachPrevious ? "mt-0" : "mt-3"
            )}
        >
            {/* Avatar (left side) */}
            {!isMine &&
                <div className="w-14 mr-4">
                    {!attachPrevious && (
                        <div className="absolute top-0 left-0">
                            <Picture user={author} size={60} />
                        </div>
                    )}
                </div>
            }

            {/* Message bubble */}
            <div className="flex flex-col md:max-w-xs md:w-full">
                <Card
                    className={cn(
                        "relative p-3 rounded-xl w-full transition-all duration-200 border-none shadow-none",
                        type === "image" && "p-0 my-2 bg-transparent",
                        isMine
                            ? "bg-[#54d38a] text-white font-normal rounded-tr-none ml-auto"
                            : "bg-white text-gray-500 rounded-tl-none mr-auto",
                        isOnlyEmoji &&
                            "bg-transparent w-fit text-4xl leading-snug",
                        attachPrevious && "rounded-tl-xl rounded-tr-xl mt-0",
                        type === "image" && "rounded-xl bg-transparent"
                    )}
                >
                    {renderContent()}

                    {/* Tail */}
                    {!isOnlyEmoji && !attachPrevious && type !== "image" && (
                        <div
                            className={cn(
                                `absolute mx-auto h-0 w-0  border-solid !border-r-transparent !border-l-transparent rounded-sm top-0 bg-transparent`,
                                isMine
                                    ? " right-[-10px] border-b-[#54d38a] rotate-180 border-r-[1px] border-b-[20px] border-l-[12px]"
                                    : " left-[-10px] border-white rotate-180 border-r-[10px] border-b-[20px] border-l-[6px] "
                            )}
                        />
                    )}
                </Card>

                {/* Timestamp */}
                {!attachNext && (
                    <span
                        className={cn(
                            "text-xs text-muted-foreground mt-1 select-none",
                            isMine ? "text-right pr-1" : "text-left pl-1"
                        )}
                    >
                        {formatTime(date)}
                    </span>
                )}
            </div>

            {/* Avatar (right side, mine) */}
            {isMine &&
                <div className="w-14 ml-4">
                    {!attachPrevious &&
                        <div className="absolute top-0 right-0">
                            <Picture user={author} size={60} />
                        </div>
                    }
                </div>
            }
        </div>
    );
});

export default Message;
