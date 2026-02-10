import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const user = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms Of Use", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <img
                  src="./logo.png"
                  alt="Logo"
                  className="h-16 w-18 text-black"
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-black tracking-tight">
                Sewamahe
              </span>
            </div>

            <div className="hidden lg:block ml-12">
              <div className="flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      px-3 py-2 text-sm font-medium transition-all duration-300 relative
                      ${
                        isActive(item.href)
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                      }
                    `}>
                    {item.name}
                    {/* Active indicator - professional border */}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-black"></span>
                    )}
                    {/* Hover effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <Link to="/dashboard">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black p-2">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  block px-3 py-3 text-base font-medium rounded-lg transition-colors
                  ${
                    isActive(item.href)
                      ? "text-black font-semibold bg-gray-50 border-l-4 border-black pl-2"
                      : "text-gray-700 hover:text-black hover:bg-gray-50"
                  }
                `}
                onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              {user ? (
                <Link to={"/dashboard"} onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-gray-700 hover:text-black font-medium py-3">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-gray-700 hover:text-black font-medium py-3">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
