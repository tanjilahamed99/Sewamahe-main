import moment from "moment";
import configuration from "@/config/configuration";

function Credits() {
    return (
        <span>
            {" - "}
            <button
                className="text-white hover:underline underline-offset-2 transition"
                title="Special thanks and open source resources in use"
            >
                Credits
            </button>
        </span>
    );
}

function Copyright() {
    const brand = configuration.brand || "Sewamahe";
    const year = moment().year();

    return (
        <div
            id="copyright"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center"
        >
            <span className="text-sm text-gray-300">
                © {year} {brand}
                {configuration.showCredits && <Credits />} - v
            </span>
        </div>
    );
}

export default Copyright;
