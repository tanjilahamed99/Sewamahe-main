const Loader = ({className}) => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
            <div
                className={`${className} border-4 border-gray-300 border-t-blue-400 rounded-full animate-[spinPulse_1.5s_linear_infinite] flex items-center justify-center`}
            ></div>
            <style>
                {`
                    @keyframes spinPulse {
                        0% {
                            transform: rotate(0deg) scale(1);
                        }
                        50% {
                            transform: rotate(180deg) scale(1.3);
                        }
                        100% {
                            transform: rotate(360deg) scale(1);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;
