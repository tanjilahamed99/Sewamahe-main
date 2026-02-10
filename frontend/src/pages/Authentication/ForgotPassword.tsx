import { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import Credits from "./components/Credits";
import Logo from "./components/Logo";
import {
  FaLock,
  FaUser,
  FaArrowLeft,
  FaEnvelope,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { forgetPassword, sendCode } from "@/actions/auth";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useDispatch";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [codeErrors, setCodeErrors] = useState({});
  const [changeErrors, setChangeErrors] = useState({});
  const [sent, setSent] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const onCode = async (e) => {
    e.preventDefault();
    try {
      const res = await sendCode(email);
      setSent(true);
      toast.success("Verification code sent to your email!");
      setCodeErrors({});
    } catch (e) {
      const errors =
        !e.response || typeof e.response.data !== "object"
          ? { generic: "Could not connect to server." }
          : e.response.data;
      setCodeErrors(errors);
      toast.error("Failed to send verification code");
    }
  };

  const onChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgetPassword(email, authCode, password);
      console.log(data);

      navigate("/login", { replace: true });
      setSent(false);
      toast.success("Password changed! You may now sign in.");
      setChangeErrors({});
    } catch (e) {
      const errors =
        !e.response || typeof e.response.data !== "object"
          ? { generic: "Could not connect to server." }
          : e.response.data;
      setChangeErrors(errors);
      toast.error("Failed to change password");
    }
  };

  const codeInfo = Object.keys(codeErrors).map((key) => (
    <div className="text-center text-red-400 text-sm font-medium" key={key}>
      {codeErrors[key]}
    </div>
  ));

  const changeInfo = Object.keys(changeErrors).map((key) => (
    <div className="text-center text-red-400 text-sm font-medium" key={key}>
      {changeErrors[key]}
    </div>
  ));

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <Div100vh>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#ff1212_1px,transparent_1px),linear-gradient(180deg,#ff1212_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-600/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-red-700/3 blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md mx-4">
          {/* Password Reset Card */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border border-red-900/30 shadow-2xl shadow-red-900/10 overflow-hidden">
            {/* Card Header */}
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-lg opacity-30" />
                  <div className="relative w-24 h-24 rounded-full border-2 border-red-600/50 p-2 bg-black flex items-center justify-center">
                    <Logo />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Reset<span className="text-red-500">Password</span>
                </h2>
                <p className="text-gray-400 text-sm text-center">
                  Enter your email to receive a verification code
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      sent
                        ? "bg-gradient-to-r from-red-600 to-red-700"
                        : "bg-gray-800 border border-gray-700"
                    } transition-all duration-300`}>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div
                    className={`w-20 h-1 ${
                      sent
                        ? "bg-gradient-to-r from-red-600 to-red-700"
                        : "bg-gray-700"
                    } transition-all duration-300`}
                  />
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      sent
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-gradient-to-r from-red-600 to-red-700"
                    } transition-all duration-300`}>
                    <span
                      className={`font-bold ${
                        sent ? "text-gray-400" : "text-white"
                      }`}>
                      2
                    </span>
                  </div>
                </div>
              </div>

              {/* Send Code Form */}
              <form
                className={`${sent ? "hidden" : "space-y-6"}`}
                onSubmit={onCode}>
                {/* Error Messages */}
                <div className="mb-2">{codeInfo}</div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FaEnvelope className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                {/* Send Code Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 px-5 font-semibold uppercase text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95">
                  SEND VERIFICATION CODE
                </button>
              </form>

              {/* Change Password Form */}
              <form
                className={`${sent ? "space-y-6" : "hidden"}`}
                onSubmit={onChange}>
                {/* Success Message */}
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/30">
                  <p className="text-green-400 text-sm text-center font-medium">
                    ✓ Verification code sent to your email
                  </p>
                </div>

                {/* Error Messages */}
                <div className="mb-2">{changeInfo}</div>

                {/* Verification Code */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FaLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    type="text"
                    placeholder="Enter 6-digit verification code"
                    required
                    maxLength={6}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 tracking-widest text-center"
                  />
                </div>

                {/* New Password */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FaLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-200">
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-2">
                    Password must contain:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      One number
                    </li>
                  </ul>
                </div>

                {/* Change Password Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 px-5 font-semibold uppercase text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95">
                  CHANGE PASSWORD
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800/50 p-6">
              <div className="text-center space-y-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors duration-200 group">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </Link>

                {/* Additional Help */}
                <div className="pt-4 border-t border-gray-800/30">
                  <p className="text-xs text-gray-500">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={onCode}
                      className="text-red-400 hover:text-red-300 font-medium hover:underline">
                      Resend code
                    </button>{" "}
                    or{" "}
                    <Link
                      to="/support"
                      className="text-red-400 hover:text-red-300 font-medium hover:underline">
                      Contact support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <FaLock className="h-4 w-4" />
              <span>All password resets are encrypted and secure</span>
            </div>
          </div>

          {/* Credits Section */}
          <div className="mt-8 text-center text-gray-500 text-sm space-y-3">
            <p className="italic">
              Everyone has a sweet side. Everything can taste like honey.
            </p>
            <p>
              Special thanks to all contributors who made Sewamahe possible.
            </p>
            <p>
              This page uses{" "}
              <a
                href="https://github.com/zzseba78/Kick-Off"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline">
                Kick-Off
              </a>{" "}
              by zzseba78
            </p>
            <p>
              Background images from{" "}
              <a
                href="https://picsum.photos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline">
                Picsum Photos
              </a>
            </p>
            <p>
              Thanks to all contributors to React, Redux, Socket.IO, Emoji Mart,
              Axios, SASS, and Moment
            </p>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default ForgetPassword;
