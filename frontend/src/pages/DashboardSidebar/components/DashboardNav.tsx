import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Picture from "../../../components/Picture";
import { Cpu, Ellipsis, Settings, Home } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = ({ setShowSettings, showSettings, Logout, user, setIsHome }) => {
  const userLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms Of Use", path: "/terms" },
    { name: "Contact Us", path: "/contact" },
  ];
  const adminLinks = [
    { name: "Admin Dashboard", path: "/admin" },
    { name: "User Management", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Consultant", path: "/admin/consultant" },
    { name: "Withdrawal Request", path: "/admin/withdrawal-request" },
    { name: "All Transaction", path: "/admin/transaction" },
    { name: "About us", path: "/admin/aboutAs" },
    { name: "Contact us", path: "/admin/contactAs" },
    { name: "Terms of use", path: "/admin/terms" },
    { name: "Privacy Policy", path: "/admin/privacy" },
  ];

  return (
      <div className="px-4 py-2 flex justify-between items-center h-14 w-full shadow-md">
          <Link to={"/dashboard"} className="relative">
              <>
                  <Picture size={40} user={user} />
                  <div className="w-3.5 h-3.5 rounded-full  bg-green-500 absolute -right-0.5 bottom-0 border-2 border-white" />
              </>
          </Link>
          <div className="flex items-center">
              {/* Settings Button */}

              {user?.type === "admin" && (
                  <Link to={"/admin"}>
                      <Cpu size={20} />
                  </Link>
              )}
              <Button
                  variant="ghost"
                  onClick={() => setIsHome(true)}
                  className="md:hidden"
              >
                  <Home className="scale-110" />
              </Button>

              <Button
                  variant="ghost"
                  onClick={() => setShowSettings(!showSettings)}
                  className=""
              >
                  <Settings
                      className={`scale-110 ${
                          showSettings ? "text-[#da7d02]" : ""
                      }`}
                      size={20}
                  />
              </Button>

              {/* Dropdown Menu */}
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0">
                          <Ellipsis className="scale-110" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 ">
                      {user.type === "admin"
                          ? adminLinks.map((l) => (
                                <Link key={l.name} to={l.path}>
                                    <DropdownMenuItem className="text-xs">
                                        {l.name}
                                    </DropdownMenuItem>
                                </Link>
                            ))
                          : userLinks.map((l) => (
                                <Link key={l.name} to={l.path}>
                                    <DropdownMenuItem className="text-xs">
                                        {l.name}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                          className="text-red-600 text-xs"
                          onClick={() => Logout()}
                      >
                          Logout
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
      </div>
  );
};

export default TopBar;
