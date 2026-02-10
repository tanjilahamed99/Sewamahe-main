import { ReactNode } from "react";

interface InputProps {
    icon?: ReactNode;
    placeholder?: string;
    type?: string;
    defaultValue?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ icon, placeholder, type = "text", onChange, defaultValue }: InputProps) {
    return (
        <div className="my-2 w-full">
            <div className="relative w-full">
                {/* Icon with focus animation */}
                {icon && (
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                        {icon}
                    </span>
                )}

                <input
                    className="peer w-full bg-transparent rounded-full border border-gray-400 
                     px-4 py-2 pr-10 shadow-sm
                     transition-all duration-300 
                     focus:border-white focus:bg-white/5
                     focus:shadow-lg focus:outline-none text-gray-400 font-medium text-base"
                    required
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
}

export default Input;
