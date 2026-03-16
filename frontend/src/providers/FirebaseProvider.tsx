import { useEffect } from "react";
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

  const requestPermission = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BJn_eJYJlOc59hCYZUQgUgRS6hHjqZcEzBvoN1ot1Vu5Y6-cB113vfB7gphuyHaEXgnjD2FXLFc2bftotYF3KeM",
      });
      if (token) {
        if (user) {
          // send backend to same fcm token
          dispatch(
            updateUser({
              fcmToken: token,
            }),
          );
          await saveFcmToken({
            userId: user._id,
            fcmToken: token,
          });
        }
      }
    } catch (err) {
      console.error("Permission denied", err);
    }
  };

  useEffect(() => {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.addEventListener("message", async (event) => {
      console.log(event.data);
      if (event.data?.type === "INCOMING_CALL") {
        const data = {
          status: 200,
          room: JSON.parse(event.data.payload.room),
          meetingID: event.data.payload.meetingID,
          roomID: event.data.payload.roomID,
          type: "audio",
          caller: JSON.parse(event.data.payload.caller),
          callee: JSON.parse(event.data.payload.callee),
        };
        const caller = JSON.parse(event.data.payload.caller);
        store.dispatch(incomingCall(data));
        await answerCall({ userID: caller._id });
      }
    });
  }, []);

  useEffect(() => {
    requestPermission();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    if (
      typeof window !== "undefined" &&
      window.flutter_inappwebview &&
      window.flutter_inappwebview.callHandler
    ) {
      window.flutter_inappwebview.callHandler("userAuth", {
        userId: user._id,
        token: localStorage.getItem('token')
      });
    }
  }, [user]);

  return children;
};

export default FirebaseProvider;
