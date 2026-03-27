import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/config/firebase";
import { saveFcmToken } from "@/actions/auth";
import { updateUser } from "@/features/auth/authSlice";

const FirebaseProvider = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // ✅ Request FCM Token
  const requestPermission = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BJn_eJYJlOc59hCYZUQgUgRS6hHjqZcEzBvoN1ot1Vu5Y6-cB113vfB7gphuyHaEXgnjD2FXLFc2bftotYF3KeM",
      });

      if (token && user) {
        dispatch(updateUser({ fcmToken: token }));

        await saveFcmToken({
          userId: user._id,
          fcmToken: token,
        });

        // console.log("✅ FCM Token saved:", token);
      }
    } catch (err) {
      console.error("❌ Permission denied", err);
    }
  };


  // ✅ Foreground FCM listener
  useEffect(() => {
    requestPermission();

    onMessage(messaging, (payload) => {
      // console.log("🔥 FCM Foreground:", payload);
    });
  }, []);

  // ✅ Send auth data to Flutter WebView
  useEffect(() => {
    if (!user) return;

    if (
      typeof window !== "undefined" &&
      window.flutter_inappwebview &&
      window.flutter_inappwebview.callHandler
    ) {
      window.flutter_inappwebview.callHandler("userAuth", {
        userId: user._id,
        token: localStorage.getItem("token"),
      });
    }
  }, [user]);

  return children;
};

export default FirebaseProvider;
