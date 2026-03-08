import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import Picture from "@/components/Picture";
import { FiPhone, FiPhoneOff, FiVideo } from "react-icons/fi";
import { answerCall, closeCall } from "@/actions/call";
import { callEnded, incomingCall } from "@/features/call/callSlice";
import { store } from "@/store";

const IncomingCallPage = () => {
  const call = useAppSelector((s) => s.call);
  const incoming = call.status === "ringing";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  if (!incoming) {
    return (
      <div className="flex justify-center items-center h-[100vh] text-xl font-bold">
       Call Connection Started
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full pt-12 md:pt-0 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Pulsing Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border-2 border-red-500/20"
              style={{
                width: `${300 + ring * 100}px`,
                height: `${300 + ring * 100}px`,
                animation: `pulse ${
                  2 + ring * 0.5
                }s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                animationDelay: `${ring * 0.2}s`,
                opacity: 0.1 + ring * 0.05,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-8">
        {/* Incoming Call Badge */}
        <div className="mb-12 animate-bounce-slow">
          <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-700/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="text-red-400 font-semibold text-lg tracking-wider">
                {incoming ? "INCOMING CALL" : "OUTGOING CALL..."}
              </span>
              <div
                className="w-3 h-3 bg-red-500 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>

        {/* Profile Image with Animated Ring */}
        <div className="relative mb-10">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-2xl opacity-30 animate-pulse" />

          {/* Animated Ring */}
          <div className="absolute -inset-8 border-4 border-red-500/30 rounded-full animate-spin-slow" />

          {/* Profile Image Container */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
            <div className="w-full h-full flex items-center justify-center bg-black">
              <Picture size={180} user={incoming ? call.caller : call.callee} />
            </div>
          </div>

          {/* Live Status Dot */}
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default IncomingCallPage;
