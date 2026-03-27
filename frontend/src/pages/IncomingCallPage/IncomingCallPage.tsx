import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useDispatch";
import { FiPhone, FiPhoneOff, FiVideo } from "react-icons/fi";
import { answerCall, closeCall, getCustomCallData } from "@/actions/call";
import { callEnded, incomingCall } from "@/features/call/callSlice";
import { store } from "@/store";

type LoadingStage = "idle" | "fetching" | "connecting" | "redirecting" | "error";

const IncomingCallPage = () => {
  const call = useAppSelector((s) => s.call);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [stage, setStage] = useState<LoadingStage>("idle");
  const [callerData, setCallerData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dots, setDots] = useState(0);

  const meetingID = searchParams.get("meetingID");
  const action = searchParams.get("action");

  // Animated dots
  useEffect(() => {
    if (stage === "fetching" || stage === "connecting" || stage === "redirecting") {
      const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (user && meetingID) {
      const fetchData = async () => {
        try {
          setStage("fetching");
          const data = await getCustomCallData(meetingID);

          if (data.status === 200) {
            setCallerData(data.caller);
            store.dispatch(incomingCall(data));

            setStage("connecting");
            await answerCall({ userID: data.caller._id });

            setStage("redirecting");
            setTimeout(() => {
              navigate(`/meeting/${meetingID}`, { replace: true });
            }, 800);
          }
        } catch (error: any) {
          setStage("error");
          setErrorMsg(error?.message || "Failed to connect to the call.");
        }
      };
      fetchData();
    }
  }, [user, meetingID]);

  const stageLabel: Record<LoadingStage, string> = {
    idle: "Preparing",
    fetching: "Fetching call info",
    connecting: "Connecting to call",
    redirecting: "Joining meeting",
    error: "Something went wrong",
  };

  const stageProgress: Record<LoadingStage, number> = {
    idle: 0,
    fetching: 33,
    connecting: 66,
    redirecting: 95,
    error: 0,
  };

  const dotsStr = ".".repeat(dots);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse 5s ease-in-out infinite 1.5s",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Main card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          padding: "0 20px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "40px 36px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
            animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Status badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                background:
                  stage === "error"
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(59,130,246,0.12)",
                border:
                  stage === "error"
                    ? "1px solid rgba(239,68,68,0.25)"
                    : "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: stage === "error" ? "#ef4444" : "#3b82f6",
                  display: "inline-block",
                  animation: stage !== "error" ? "blink 1.2s ease-in-out infinite" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: stage === "error" ? "#f87171" : "#93c5fd",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {action === "accept" ? "Incoming Call" : "Call Status"}
              </span>
            </div>
          </div>

          {/* Avatar */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ position: "relative" }}>
              {/* Ripple rings */}
              {(stage === "fetching" || stage === "connecting") && (
                <>
                  <div style={{ ...rippleStyle, animationDelay: "0s" }} />
                  <div style={{ ...rippleStyle, animationDelay: "0.6s" }} />
                  <div style={{ ...rippleStyle, animationDelay: "1.2s" }} />
                </>
              )}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: callerData?.picture
                    ? `url(${callerData.picture}) center/cover`
                    : "linear-gradient(135deg, #1e3a5f, #1e1b4b)",
                  border: "2px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: "rgba(255,255,255,0.6)",
                  position: "relative",
                  zIndex: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {!callerData?.picture && (
                  <span>
                    {callerData
                      ? callerData.firstName?.[0]?.toUpperCase()
                      : "?"}
                  </span>
                )}
              </div>

              {/* Call type badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  border: "2px solid #0d1117",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                }}
              >
                <FiVideo size={13} color="#fff" />
              </div>
            </div>
          </div>

          {/* Caller info */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#f1f5f9",
                marginBottom: 4,
                letterSpacing: "-0.02em",
                minHeight: 28,
                transition: "all 0.3s",
              }}
            >
              {callerData
                ? `${callerData.firstName} ${callerData.lastName}`
                : stage === "error"
                ? "Unknown Caller"
                : "\u00A0"}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "rgba(148,163,184,0.7)",
                letterSpacing: "0.01em",
              }}
            >
              {callerData?.type || (stage !== "error" ? "\u00A0" : "")}
            </p>
          </div>

          {/* Progress section */}
          {stage !== "error" ? (
            <div style={{ marginBottom: 32 }}>
              {/* Progress bar */}
              <div
                style={{
                  height: 3,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 100,
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${stageProgress[stage]}%`,
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    borderRadius: 100,
                    transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: "0 0 8px rgba(139,92,246,0.6)",
                  }}
                />
              </div>

              {/* Stage steps */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {(["fetching", "connecting", "redirecting"] as LoadingStage[]).map(
                  (s, i) => {
                    const isActive = stage === s;
                    const isDone =
                      stageProgress[stage] > stageProgress[s];
                    return (
                      <div
                        key={s}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isDone
                              ? "#3b82f6"
                              : isActive
                              ? "#8b5cf6"
                              : "rgba(255,255,255,0.12)",
                            transition: "background 0.4s",
                            boxShadow: isActive
                              ? "0 0 8px rgba(139,92,246,0.8)"
                              : "none",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            color: isDone
                              ? "#60a5fa"
                              : isActive
                              ? "#c4b5fd"
                              : "rgba(148,163,184,0.35)",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            transition: "color 0.4s",
                          }}
                        >
                          {s === "fetching"
                            ? "Fetch"
                            : s === "connecting"
                            ? "Connect"
                            : "Join"}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Status text */}
              <p
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  fontSize: 13,
                  color: "rgba(148,163,184,0.6)",
                  letterSpacing: "0.01em",
                  minHeight: 20,
                }}
              >
                {stageLabel[stage]}
                {(stage === "fetching" ||
                  stage === "connecting" ||
                  stage === "redirecting") &&
                  dotsStr}
              </p>
            </div>
          ) : (
            /* Error state */
            <div
              style={{
                marginBottom: 32,
                padding: "16px 20px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 13, color: "#f87171", lineHeight: 1.5 }}>
                {errorMsg}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button
              onClick={() => {
                store.dispatch(callEnded());
                navigate("/", { replace: true });
              }}
              style={{
                ...btnBase,
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(239,68,68,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(239,68,68,0.12)";
              }}
            >
              <FiPhoneOff size={18} />
              <span>Decline</span>
            </button>

            <button
              disabled={stage !== "idle" && stage !== "error"}
              style={{
                ...btnBase,
                background:
                  stage === "error"
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(148,163,184,0.4)",
                cursor: "default",
                opacity: stage === "redirecting" ? 1 : 0.5,
              }}
            >
              <FiPhone size={18} />
              <span>
                {stage === "redirecting" ? "Joining..." : "Accept"}
              </span>
            </button>
          </div>
        </div>

        {/* Meeting ID */}
        {meetingID && (
          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 11,
              color: "rgba(148,163,184,0.25)",
              letterSpacing: "0.06em",
              fontFamily: "monospace",
            }}
          >
            MTG · {meetingID.slice(-10).toUpperCase()}
          </p>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const rippleStyle: React.CSSProperties = {
  position: "absolute",
  inset: -16,
  borderRadius: "50%",
  border: "1.5px solid rgba(59,130,246,0.3)",
  animation: "ripple 2s ease-out infinite",
  zIndex: 1,
};

const btnBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 22px",
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s",
  outline: "none",
  letterSpacing: "0.01em",
};

export default IncomingCallPage;