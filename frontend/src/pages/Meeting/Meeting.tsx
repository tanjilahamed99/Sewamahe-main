import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { callEnded, setCallToken } from "@/features/call/callSlice";
import API from "@/lib/axios";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import Ringing from "./components/Ringing";
import { closeCall } from "@/actions/call";
import { updateMyBalance } from "@/actions/history";
import { updateUser } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { getLiveKitUser } from "@/actions/admin";

const Meeting = () => {
  const {
    roomId,
    token,
    type,
    status,
    callee,
    caller,
    callStartTime,
    incoming,
  } = useAppSelector((s) => s.call);
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const adminDefaultPerMinPrice = import.meta.env
    .VITE_ADMIN_DEFAULT_PER_MINUTE_CHARGE;
  const intervalRef = useRef(null);
  const [liveKitUrl, setLiveKitUrl] = useState(
    import.meta.env.VITE_LIVEKIT_URL || "",
  );

  useEffect(() => {
    async function join() {
      if (token) return;
      const { data } = await API.post("/api/livekit/token", {
        roomName: roomId,
        userId: user._id,
        calleeId: callee._id,
      });
      dispatch(setCallToken(data.token));

      const { data: res } = await getLiveKitUser();
      if (res.success) {
        setLiveKitUrl(res.data.url);
      }
    }
    join();
  }, []);

  useEffect(() => {
    if (callStartTime) {
      intervalRef.current = setInterval(() => {
        const totalSeconds = Math.floor((Date.now() - callStartTime) / 1000);
        if (!incoming && user.type === "user" && callee.type === "Consultant") {
          const price = callee.price || adminDefaultPerMinPrice;
          const myPerSecPrice = parseFloat(price) / 60;
          const myTotalCost = totalSeconds * myPerSecPrice;
          const iHave = user.balance.amount - myTotalCost;
          if (iHave < 2) {
            handleDisconnect();
            toast.success(
              "Call ended due to insufficient balance. Please top up to continue calling.",
            );
            return totalSeconds; // stop increasing after ending
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [callStartTime]);

  const handleCallEnd = async () => {
    await closeCall({
      userID: caller._id === user._id ? callee._id : caller._id,
    });
    dispatch(callEnded());
    navigate("/dashboard", { replace: true });
    return;
  };

  const handleDisconnect = async () => {
    const totalSeconds = Math.floor((Date.now() - callStartTime) / 1000);

    // charge system
    if (
      user.type === "root" ||
      user.type === "admin" ||
      callee.type === "root" ||
      callee.type === "admin" ||
      caller.type === "admin" ||
      caller.type === "root"
    ) {
      // admin or root no charge
      return handleCallEnd();
    }
    if (user.type === "Consultant" && caller.type === "Consultant") {
      // consultant to consultant call no charge
      return handleCallEnd();
    }
    if (user.type === "Consultant" && !incoming) {
      console.log("hello");
      // consultant call has no charge
      return handleCallEnd();
    }
    if (user.type === "Consultant" && incoming && caller.type === "user") {
      const price = user.price || adminDefaultPerMinPrice;
      const myPerSecPrice = parseFloat(price) / 60;
      const myTotalCost = totalSeconds * myPerSecPrice;
      const myRoundedCost = parseFloat(myTotalCost.toFixed(2));
      console.log(totalSeconds, myPerSecPrice, myRoundedCost);
      const myHistory = {
        historyType: "Call Charge",
        amount: myRoundedCost,
        paymentMethod: "Increased",
        callDuration: totalSeconds,
      };
      const clientHistory = {
        historyType: "Call Charge",
        amount: myRoundedCost,
        paymentMethod: "decrease",
        callDuration: totalSeconds,
      };
      if (myRoundedCost > 0) {
        try {
          const data = {
            myId: user._id,
            myHistory,
            myBalance: user.balance.amount + myRoundedCost,
            clientId: caller._id,
            clientHistory,
            clientBalance: caller.balance.amount - myRoundedCost,
          };
          handleCallEnd();
          dispatch(
            updateUser({
              balance: { amount: user.balance.amount + myRoundedCost },
            }),
          );
          await updateMyBalance(data);
        } catch (err) {
          console.error("Failed to update balances:", err);
        }
      }
    }
    // users related charge
    if (user.type === "user" && incoming) {
      // close the call without charge because user is receiver
      return handleCallEnd();
    }
    if (user.type === "user" && !incoming && callee.type === "Consultant") {
      const price = callee.price || adminDefaultPerMinPrice;
      const myPerSecPrice = parseFloat(price) / 60;
      const myTotalCost = totalSeconds * myPerSecPrice;
      const myRoundedCost = parseFloat(myTotalCost.toFixed(2));
      const myHistory = {
        historyType: "Call Charge",
        amount: myRoundedCost,
        paymentMethod: "Decrease",
        callDuration: totalSeconds,
      };
      const clientHistory = {
        historyType: "Call Charge",
        amount: myRoundedCost,
        paymentMethod: "Increased",
        callDuration: totalSeconds,
      };
      if (myRoundedCost > 0) {
        try {
          const data = {
            myId: user._id,
            myHistory,
            myBalance: user.balance.amount - myRoundedCost,
            clientId: callee._id,
            clientHistory,
            clientBalance: callee.balance.amount + myRoundedCost,
          };
          handleCallEnd();
          dispatch(
            updateUser({
              balance: { amount: user.balance.amount - myRoundedCost },
            }),
          );
          await updateMyBalance(data);
        } catch (err) {
          console.error("Failed to update balances:", err);
        }
      }
    }
  };


  // 🔔 Incoming Call Screen
  if (status === "ringing" || status === "calling") return <Ringing />;
  if (status === "idle") {
    dispatch(callEnded());
    navigate("/dashboard", { replace: true });
    return null;
  }

  // 🔌 Connecting Screen
  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-center animate-pulse">
          <h1 className="text-black text-2xl font-semibold">Joining room…</h1>
          <p className="text-black mt-2">Setting up your audio and video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-white bg-black">
      <LiveKitRoom
        token={token}
        serverUrl={liveKitUrl}
        connect
        audio
        video={type === "video"}
        onDisconnected={handleDisconnect}
        data-lk-theme="default"
        style={{ height: "100%" }}>
        <VideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </LiveKitRoom>
    </div>
  );
};

export default Meeting;
