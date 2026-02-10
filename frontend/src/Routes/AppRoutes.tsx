import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Authentication/Login";
import ForgetPassword from "@/pages/Authentication/ForgotPassword";
import PrivetRoutes from "./PrivetRoutes";
import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect } from "react";
import initIO from "@/actions/initIO";
import FirebaseProvider from "@/providers/FirebaseProvider";
import IncomingCallPage from '@/pages/IncomingCallPage/IncomingCallPage'

export const AppRoutes = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || !user) return;
    initIO(token);
  }, [token, user]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FirebaseProvider>
            <Home />
          </FirebaseProvider>
        }
      />
      <Route
        path="/about"
        element={
          <FirebaseProvider>
            <About />
          </FirebaseProvider>
        }
      />
      <Route
        path="/contact"
        element={
          <FirebaseProvider>
            <Contact />
          </FirebaseProvider>
        }
      />
      <Route
        path="/privacy"
        element={
          <FirebaseProvider>
            <Privacy />
          </FirebaseProvider>
        }
      />
      <Route
        path="/terms"
        element={
          <FirebaseProvider>
            <Terms />
          </FirebaseProvider>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route
        path="/*"
        element={
          !user ? (
            <Navigate to="/" />
          ) : (
            <FirebaseProvider>
              <PrivetRoutes />
            </FirebaseProvider>
          )
        }
      />

      <Route path="*" element={<NotFound />} />

      {/* app related route */}
      <Route path="/call/ringing" element={<IncomingCallPage />} />
    </Routes>
  );
};
