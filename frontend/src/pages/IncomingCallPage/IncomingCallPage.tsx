import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import Picture from "@/components/Picture";
import { FiPhone, FiPhoneOff, FiVideo } from "react-icons/fi";
import { answerCall, closeCall, getCustomCallData } from "@/actions/call";
import { callEnded, incomingCall } from "@/features/call/callSlice";
import { store } from "@/store";

const IncomingCallPage = () => {
  const call = useAppSelector((s) => s.call);
  const user = useAppSelector((state) => state.auth.user);
  const incoming = call.status === "ringing";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const meetingID = searchParams.get("meetingID");
  const action = searchParams.get("action");

  console.log(call); // "69c6bca45881b3c87acc5a10"

  useEffect(() => {
    if (user && meetingID) {
      const fetchData = async () => {
        try {
          const data = await getCustomCallData(meetingID);
          if (data.status === 200) {
            store.dispatch(incomingCall(data));
            await answerCall({
              userID: data.caller._id,
            });
            navigate(`/meeting/${meetingID}`, { replace: true });
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [user, meetingID]);

  return (
    <div className="relative min-h-screen w-full pt-12 md:pt-0 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"></div>
  );
};

export default IncomingCallPage;
