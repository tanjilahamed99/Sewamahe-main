import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const AuthNav = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden"; // lock scroll
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto"; // restore scroll
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const isActive = (path: string) => location.pathname === path;

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav className="flex justify-between items-center bg-blue-900/80 backdrop-blur-md px-6 py-3 shadow-md fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <Link
                to="/"
                className="text-2xl font-bold font-serif text-white hover:text-blue-500 transition-colors duration-300 delay-100"
                onClick={() => setIsOpen(false)}
            >
                Sawamahe
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                {links.map((l) => (
                    <Link
                        key={l.name}
                        to={l.path}
                        className={`relative font-medium transition-all duration-300 group ${
                            isActive(l.path)
                                ? "text-blue-400"
                                : "text-white hover:text-blue-400 hover:-translate-y-0.5"
                        }`}
                    >
                        {l.name}
                        <span
                            className={`absolute left-1/2 -bottom-1 h-[2px] transition-all duration-300 group-hover:left-0 ${
                                isActive(l.path)
                                    ? "w-full bg-blue-400"
                                    : "w-0 bg-blue-400 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                ))}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
                <button
                    className="text-2xl text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-fit w-64 bg-neutral-900 text-white flex flex-col gap-6 px-6 py-6 pt-10 shadow-lg transform transition-transform duration-300 md:hidden z-50 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {links.map((l) => (
                    <Link
                        key={l.name}
                        to={l.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative font-medium transition-all duration-300 w-fit group ${
                            isActive(l.path)
                                ? "text-blue-400"
                                : "text-gray-200 hover:text-blue-400 hover:-translate-y-1"
                        }`}
                    >
                        {l.name}
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                                isActive(l.path)
                                    ? "w-full bg-blue-400"
                                    : "w-0 bg-blue-400 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default AuthNav;
