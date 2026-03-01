import { outgoingCall } from "@/features/call/callSlice";
import API from "@/lib/axios";

export const getMeetingRoom = async (data) => {
  const res = await API.post("/api/meeting/get", data);
  return res.data;
};
export const postCall = async ({ roomID, meetingID, type }) => {
  const res = await API.post("/api/meeting/call", { roomID, meetingID, type });
  return res.data;
};
export const answerCall = async ({ userID }) => {
  const res = await API.post("/api/meeting/answer", { userID });
  return res.data;
};
export const closeCall = async ({ userID }) => {
  const res = await API.post("/api/meeting/close", { userID });
  return res.data;
};
export const Calling = async ({
  isVideo,
  user,
  toast,
  other,
  onlineUsers,
  dispatch,
  room,
  navigate,
}) => {

  if (user?.balance.amount <= 4 && user.type === "user")
    return toast.warning(
      "You have less then 5 rupe to make calls. Please top up your account.",
    );
  if (
    user?.type === "user" &&
    other.consultantStatus === "Pending" &&
    other.type === "Consultant"
  )
    return toast.warning(
      "Consultant is unverified. You can't make call to unverified consultant.",
    );

  if (user?.consultantStatus === "Pending" && user.type === "Consultant")
    return toast.warning("You are unverified consultant");

  // if user online then call other wise offline message show
  if (onlineUsers.filter((u) => u.id === other._id).length === 0)
    return toast.warning("User is offline!");

  const type = isVideo ? "video" : "audio";
  dispatch(
    outgoingCall({
      roomId: room._id,
      type,
      callee: other,
      caller: user,
    }),
  );
  try {
    const res = await getMeetingRoom({
      caller: user._id,
      callee: other._id,
      type,
    });
    navigate(`/meeting/${res._id}`, { replace: true });
    await postCall({ roomID: room._id, meetingID: res._id, type });
  } catch (e) {
    toast.error("Server error. Unable to initiate call.");
  }
};
