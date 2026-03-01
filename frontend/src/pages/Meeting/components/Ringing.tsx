import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import ringSound from "../../../assets/ring.mp3";
import Picture from "@/components/Picture";
import { FiPhone, FiPhoneOff, FiVideo } from "react-icons/fi";
import { answerCall, closeCall } from "@/actions/call";
import { callEnded } from "@/features/call/callSlice";

export default function Ringing() {
  const call = useAppSelector((s) => s.call);
  const incoming = call.status === "ringing";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const audio = new Audio(ringSound);
    audio.loop = true;
    audio.play();

    return () => audio.pause();
  }, []);

  const joinCall = async () => {
    await answerCall({ userID: incoming ? call.caller._id : call.callee._id });
  };

  const endCall = async () => {
    await closeCall({ userID: incoming ? call.caller._id : call.callee._id });
    dispatch(callEnded());
    navigate(`/dashboard`);
  };

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

        {/* Caller Name */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            {incoming ? call.caller.fullName : call.callee.fullName}
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in-delay">
            {incoming ? "is calling you..." : "Ringing..."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-12 animate-slide-up">
          {/* Reject Button - RED */}
          <button
            onClick={endCall}
            className="group flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 hover:scale-110 active:scale-95">
              <FiPhoneOff className="text-white text-4xl transform group-hover:rotate-12 transition-transform" />
            </div>
            <span className="mt-4 text-white font-semibold text-lg">
              Reject
            </span>
            <span className="text-gray-400 text-sm">Press or swipe down</span>
          </button>

          {/* Accept Button - GREEN */}
          {incoming && (
            <button
              onClick={joinCall}
              className="group flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all duration-300 hover:scale-110 active:scale-95">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <FiPhone className="text-white text-5xl transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="mt-4 text-white font-semibold text-lg">
                Accept
              </span>
              <span className="text-gray-400 text-sm">Press or swipe up</span>
            </button>
          )}
        </div>

        {/* Volume Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
            <div
              className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.3;
      }
    }

    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      33% {
        transform: translateY(-10px) translateX(10px);
      }
      66% {
        transform: translateY(10px) translateX(-10px);
      }
    }

    @keyframes bounce-slow {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-bounce-slow {
      animation: bounce-slow 2s ease-in-out infinite;
    }

    .animate-fade-in {
      animation: fade-in 0.8s ease-out forwards;
    }

    .animate-fade-in-delay {
      animation: fade-in 0.8s ease-out 0.3s forwards;
      opacity: 0;
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out 0.5s forwards;
      opacity: 0;
    }
  `}</style>
    </div>
  );
}
