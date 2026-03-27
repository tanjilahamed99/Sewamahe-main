import { useEffect, useRef } from "react";
import { answerCall } from "@/actions/call";
import { incomingCall } from "@/features/call/callSlice";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/config/firebase";
import { saveFcmToken } from "@/actions/auth";
import { updateUser } from "@/features/auth/authSlice";

const FirebaseProvider = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const acceptHandlerRef = useRef(null);

  // ✅ Safe JSON parser
  const safeParse = (val) => {
    try {
      return typeof val === "string" ? JSON.parse(val) : val;
    } catch (e) {
      console.warn("Parse failed:", val);
      return val;
    }
  };

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

        console.log("✅ FCM Token saved:", token);
      }
    } catch (err) {
      console.error("❌ Permission denied", err);
    }
  };

  // ✅ Accept Call Handler
  const onAcceptCall = async (payload) => {
    console.log("📞 CALL_ACTION accept received:", payload);

    // 🔹 Safe parsing
    const room =
      typeof payload.room === "string"
        ? JSON.parse(payload.room)
        : payload.room;
    const caller =
      typeof payload.caller === "string"
        ? JSON.parse(payload.caller)
        : payload.caller;
    const callee =
      typeof payload.callee === "string"
        ? JSON.parse(payload.callee)
        : payload.callee;

    console.log("✅ Parsed Data:", { room, caller, callee });

    const data = {
      status: 200,
      room,
      meetingID: payload.meetingID,
      roomID: payload.roomID,
      type: "audio",
      caller,
      callee, // ✅ store as object, NOT string
    };

    store.dispatch(incomingCall(data)); // now callee is object

    await answerCall({ userID: caller._id });
  };

  // ✅ WebView Message Listener
  useEffect(() => {
    acceptHandlerRef.current = onAcceptCall;

    const handleMessage = (event) => {
      let msg = event?.data;

      // Step 1: parse root if string
      if (typeof msg === "string") {
        try {
          msg = JSON.parse(msg);
        } catch (e) {
          console.warn("❌ Root parse failed:", msg);
          return;
        }
      }

      if (!msg || typeof msg !== "object") return;

      console.log("📩 Incoming message:", JSON.stringify(msg, null, 2));

      if (msg.type !== "CALL_ACTION") return;

      // Step 2: get action
      const action = msg?.payload?.action || msg?.action;

      // Step 3: get payload
      let payload = msg?.payload?.data || msg?.data;

      if (!payload) {
        console.warn("❌ Payload missing:", msg);
        return;
      }

      // Step 4: parse payload if string
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch (e) {
          console.warn("❌ Payload parse failed:", payload);
          return;
        }
      }

      console.log("📦 Final payload:", JSON.stringify(payload, null, 2));

      // Step 5: handle action
      if (action === "accept") {
        acceptHandlerRef.current?.(payload);
      }

      if (action === "decline") {
        console.log("📴 Call declined");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ✅ Foreground FCM listener
  useEffect(() => {
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("🔥 FCM Foreground:", payload);
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
