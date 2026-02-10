import { onMessage } from "firebase/messaging";
import { messaging } from "@/config/firebase";
import { toast } from "sonner";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { answerCall } from "@/actions/call";
import { incomingCall } from "@/features/call/callSlice";
import { store } from "@/store";

const FirebaseProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const pathname = location.pathname;

      const isRoomPage = pathname.startsWith("/room/");
      const isDashboardPage = pathname === "/dashboard";
      if (!isRoomPage && !isDashboardPage) {
        if (payload.data.type === "message") {
          toast.message(payload.data?.body || "New message", {
            action: {
              label: "Open",
              onClick: () => {
                navigate(`/room/${payload.data?.roomId}`);
              },
            },
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.addEventListener("message", async (event) => {
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

  return children;
};

export default FirebaseProvider;
