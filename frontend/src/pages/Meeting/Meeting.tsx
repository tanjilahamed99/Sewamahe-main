import { useEffect, useRef, useState, useCallback } from "react";
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

  const adminDefaultPerMinPrice =
    import.meta.env.VITE_ADMIN_DEFAULT_PER_MINUTE_CHARGE;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const joinRef = useRef(false);

  const [liveKitUrl, setLiveKitUrl] = useState(
    import.meta.env.VITE_LIVEKIT_URL || ""
  );

  /* ---------------- RESET JOIN WHEN ROOM CHANGES ---------------- */

  useEffect(() => {
    joinRef.current = false;
  }, [roomId]);

  /* ---------------- JOIN ROOM SAFELY ---------------- */

  useEffect(() => {
    if (!callee || !user || !roomId || token || joinRef.current) return;

    joinRef.current = true;

    const join = async () => {
      try {
        const { data } = await API.post("/api/livekit/token", {
          roomName: roomId,
          userId: user._id,
          calleeId: callee._id,
        });

        dispatch(setCallToken(data.token));

        const { data: res } = await getLiveKitUser();
        if (res?.success) {
          setLiveKitUrl(res.data.url);
        }
      } catch (err) {
        console.error("Join failed:", err);
      }
    };

    join();
  }, [callee, user, roomId, token, dispatch]);

  /* ---------------- NAVIGATION SIDE EFFECT ---------------- */

  useEffect(() => {
    if (status === "idle") {
      dispatch(callEnded());
      navigate("/dashboard", { replace: true });
    }
  }, [status, dispatch, navigate]);

  /* ---------------- HANDLE CALL END ---------------- */

  const handleCallEnd = useCallback(async () => {
    if (!caller || !callee || !user) return;

    try {
      await closeCall({
        userID: caller._id === user._id ? callee._id : caller._id,
      });
    } catch (err) {
      console.error("closeCall failed:", err);
    }

    dispatch(callEnded());
    navigate("/dashboard", { replace: true });
  }, [caller, callee, user, dispatch, navigate]);

  /* ---------------- HANDLE DISCONNECT + BILLING ---------------- */

  const handleDisconnect = useCallback(async () => {
    if (!callStartTime || !user || !caller || !callee) {
      return handleCallEnd();
    }

    const totalSeconds = Math.floor(
      (Date.now() - callStartTime) / 1000
    );

    const isAdminCall =
      ["root", "admin"].includes(user.type) ||
      ["root", "admin"].includes(callee.type) ||
      ["root", "admin"].includes(caller.type);

    if (isAdminCall) return handleCallEnd();

    if (user.type === "Consultant" && caller.type === "Consultant")
      return handleCallEnd();

    if (user.type === "Consultant" && !incoming)
      return handleCallEnd();

    const price =
      (user.type === "Consultant"
        ? user.price
        : callee.price) || adminDefaultPerMinPrice;

    const perSecond = parseFloat(price) / 60;
    const totalCost = parseFloat((totalSeconds * perSecond).toFixed(2));

    if (totalCost <= 0) return handleCallEnd();

    try {
      const isUserPaying =
        user.type === "user" && !incoming;

      const myNewBalance = isUserPaying
        ? user.balance.amount - totalCost
        : user.balance.amount + totalCost;

      dispatch(
        updateUser({
          balance: { amount: myNewBalance },
        })
      );

      await updateMyBalance({
        myId: user._id,
        myHistory: {
          historyType: "Call Charge",
          amount: totalCost,
          paymentMethod: isUserPaying ? "Decrease" : "Increase",
          callDuration: totalSeconds,
        },
        myBalance: myNewBalance,
      });

    } catch (err) {
      console.error("Balance update failed:", err);
    }

    handleCallEnd();
  }, [
    callStartTime,
    user,
    caller,
    callee,
    incoming,
    adminDefaultPerMinPrice,
    handleCallEnd,
  ]);

  /* ---------------- BALANCE AUTO CUT ---------------- */

  useEffect(() => {
    if (!callStartTime || !user || !callee) return;

    intervalRef.current = setInterval(() => {
      const totalSeconds = Math.floor(
        (Date.now() - callStartTime) / 1000
      );

      if (
        !incoming &&
        user.type === "user" &&
        callee.type === "Consultant"
      ) {
        const price =
          callee.price || adminDefaultPerMinPrice;

        const perSecond = parseFloat(price) / 60;
        const cost = totalSeconds * perSecond;

        if (user.balance.amount - cost < 2) {
          toast.success(
            "Call ended due to insufficient balance."
          );
          handleDisconnect();
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current);
    };
  }, [
    callStartTime,
    incoming,
    user,
    callee,
    adminDefaultPerMinPrice,
    handleDisconnect,
  ]);

  /* ---------------- RENDER STATES ---------------- */

  if (status === "ringing" || status === "calling") {
    return <Ringing />;
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center animate-pulse">
          <h1 className="text-2xl font-semibold">
            Joining room…
          </h1>
          <p className="mt-2">
            Setting up your audio and video
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- LIVEKIT ROOM ---------------- */

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
        style={{ height: "100%" }}
      >
        <VideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </LiveKitRoom>
    </div>
  );
};

export default Meeting;