import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Div100vh from "react-div-100vh";
import {
  FaLock,
  FaUser,
  FaPencilAlt,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";

import Credits from "./components/Credits";
import Logo from "./components/Logo";
import Input from "./components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { login, register } from "@/actions/auth";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { toast } from "sonner";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // --- Login state ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keep, setKeep] = useState(true);
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // --- Register state ---
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerUserType, setRegisterUserType] = useState("user");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState({});

  // Toggle forms
  const [step, setStep] = useState(1);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);

      // Set user in Redux
      await dispatch(setCredentials(res.data.user));

      navigate("/dashboard");
      toast.success("Login successful!");
      setLoginErrors({});
    } catch (err) {
      setLoginErrors(err.response?.data || { general: "Login failed" });
      toast.error("Login failed!");
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const reg = await register({
        username: registerUsername,
        email: registerEmail,
        firstName: registerFirstName,
        lastName: registerLastName,
        type: registerUserType,
        password: registerPassword,
        repeatPassword: registerRepeatPassword,
      });

      const res = await login(registerEmail, registerPassword);

      // Store only token
      localStorage.setItem("token", res.data.token);

      // User in Redux
      dispatch(setCredentials(res.data.user));

      setRegisterErrors({});
      navigate("/dashboard");

      toast.success("Registration successful!");
    } catch (err) {
      setRegisterErrors(
        err.response?.data || { general: "Registration failed" }
      );
      toast.error("Registration failed!");
    }
  };

  const loginInfo = Object.keys(loginErrors).map((key) => (
    <div className="text-center text-red-400 text-sm font-medium" key={key}>
      {loginErrors[key]}
    </div>
  ));

  const registerInfo = Object.keys(registerErrors).map((key) => (
    <div className="text-center text-red-400 text-sm font-medium" key={key}>
      {registerErrors[key]}
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
          {/* Login/Register Card */}
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
                  Consultation<span className="text-red-500">Platform</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Secure Business Solutions
                </p>
              </div>

              {/* Toggle Tabs */}
              <div className="flex rounded-lg bg-gray-900/50 p-1 mb-8 border border-gray-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex-1 rounded-md py-3 text-center font-semibold transition-all duration-300 ${
                    step === 1
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}>
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex-1 rounded-md py-3 text-center font-semibold transition-all duration-300 ${
                    step === 2
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}>
                  SIGN UP
                </button>
              </div>

              {/* Forms */}
              <div className="space-y-6">
                {/* Error Messages */}
                <div className="mb-2">
                  {step === 1 ? loginInfo : registerInfo}
                </div>

                {step === 1 && (
                  <form onSubmit={onLogin} className="space-y-6">
                    {/* Email/Username */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaUser className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Username or Email"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaLock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
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

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={keep}
                            onChange={(e) => setKeep(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-600 rounded peer-checked:border-red-500 peer-checked:bg-red-500 transition-all duration-200 group-hover:border-gray-500 flex items-center justify-center">
                            {keep && (
                              <FaCheck className="w-3 h-3 text-gray-900" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          Remember me
                        </span>
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200 hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 px-5 font-semibold uppercase text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95">
                      SIGN IN
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={onRegister} className="space-y-6">
                    {/* Username */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaUser className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaEnvelope className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                      />
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <FaPencilAlt className="h-4 w-4 text-gray-500" />
                        </div>
                        <input
                          value={registerFirstName}
                          onChange={(e) => setRegisterFirstName(e.target.value)}
                          type="text"
                          placeholder="First Name"
                          required
                          className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <FaPencilAlt className="h-4 w-4 text-gray-500" />
                        </div>
                        <input
                          value={registerLastName}
                          onChange={(e) => setRegisterLastName(e.target.value)}
                          type="text"
                          placeholder="Last Name"
                          required
                          className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                        />
                      </div>
                    </div>

                    {/* User Type */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <FaUser className="h-5 w-5 text-gray-500" />
                      </div>
                      <Select
                        onValueChange={(value) => setRegisterUserType(value)}
                        defaultValue="User">
                        <SelectTrigger className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border border-gray-700 text-white shadow-xl">
                          <SelectItem
                            value="User"
                            className="focus:bg-gray-800 focus:text-white">
                            User
                          </SelectItem>
                          <SelectItem
                            value="Consultant"
                            className="focus:bg-gray-800 focus:text-white">
                            Consultant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaLock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                      />
                    </div>

                    {/* Repeat Password */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaLock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        value={registerRepeatPassword}
                        onChange={(e) =>
                          setRegisterRepeatPassword(e.target.value)
                        }
                        type="password"
                        placeholder="Repeat Password"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                      />
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-center gap-3">
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-5 h-5 cursor-pointer accent-red-600 rounded border-2 border-gray-600 bg-gray-900 focus:ring-2 focus:ring-red-600/50 focus:ring-offset-0 focus:outline-none checked:border-red-600 checked:bg-red-600"
                          required
                        />
                      </div>
                      <label htmlFor="terms" className="text-sm text-gray-400">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-red-400 hover:text-red-300 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-red-400 hover:text-red-300 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {/* Register Button */}
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 px-5 font-semibold uppercase text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95">
                      CREATE ACCOUNT
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800/50 p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {step === 2
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setStep(step === 1 ? 2 : 1)}
                    className="font-semibold text-red-500 hover:text-red-400 transition-colors duration-200">
                    {step === 2 ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <FaLock className="h-4 w-4" />
              <span>Protected by end-to-end encryption</span>
            </div>
          </div>

          {/* Credits - positioned at bottom */}
          <div className="mt-6 text-center">
            <Credits />
          </div>
        </div>
      </div>
    </Div100vh>
  );
}

export default Login;
