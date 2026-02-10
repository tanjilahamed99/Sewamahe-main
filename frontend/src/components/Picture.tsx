import configuration from "@/config/configuration";

interface PictureProps {
    user?: any;
    group?: boolean;
    picture?: any;
    title?: string;
    size?: number; // optional, default 64px
}

function Picture({
    user = {},
    group = false,
    picture,
    title = "Group",
    size = 64,
}: PictureProps) {
    const baseClasses =
        "flex items-center justify-center rounded-full bg-gray-600 text-white overflow-hidden";

    // if (group) {
    //     if (picture) {
    //         return (
    //             <img
    //                 src={`${configuration.url || ""}/api/images/${
    //                     picture.shieldedID
    //                 }/256`}
    //                 alt="Group"
    //                 className="rounded-full object-cover"
    //                 style={{ width: size, height: size }}
    //             />
    //         );
    //     }
    //     return (
    //         <div
    //             className={baseClasses}
    //             style={{ width: size, height: size, fontSize: size / 2 }}
    //         >
    //             {title.substr(0, 1).toUpperCase()}
    //         </div>
    //     );
    // }

    const firstName = user.firstName || "User";
    const lastName = user.lastName || "Name";

    if (user.picture) {
        return (
            <img
                src={`${configuration.url || ""}/api/image/${user.picture.shieldedID}`}
                alt={`${firstName} ${lastName}`}
                className="rounded-full object-cover"
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <div
            className={baseClasses}
            style={{ width: size, height: size, fontSize: size / 2 }}
        >
            {firstName[0]?.toUpperCase()}
            {lastName[0]?.toUpperCase()}
        </div>
    );
}

export default Picture;
