import { myData } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MonetizationPopup } from "./components/MonetizationPopup";
import getWebsiteInfo from "@/actions/getWebsiteInfo";
import { useNavigate } from "react-router-dom";
import TopUp from "./components/TopUp";
import { toast } from "sonner";

export default function Monetization() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const topup = import.meta.env.VITE_TOP_UP;

  // Helper function
  const formatCallDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const openModal = () => {
    if (user.balance.amount < 100) {
      return toast.success("Minimum withdrawal amount: ₹100");
    }
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await myData();
      if (result?.data) {
        setInfo(result.data);
        dispatch(setCredentials(result.data));
      }
    };
    fetchData();
  }, [user._id, refetch]);

  useEffect(() => {
    getWebsiteInfo().then(({ data }) => {
      setWebsiteInfo(data.data);
    });
  }, [refetch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Fixed Top Navbar */}
      <div className="bg-white  h-14 md:hidden flex items-center px-4 shadow-sm fixed top-0 left-0 right-0 z-10">
        <button
          className="text-xl md:hidden"
          onClick={() => {
            navigate("/dashboard", { replace: true });
          }}>
          <FiArrowLeft />
        </button>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="space-y-3 h-[100vh] overflow-y-auto mt-12 md:mt-0">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* All content in a single column */}
          <div className="space-y-6">
            {/* Call & Video Call Rate Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-[#1e87f0] text-2xl md:text-3xl font-bold text-center">
                  Call & Video Call Rate
                </h1>
                <p className="text-[#666666] text-center text-sm md:text-base max-w-md">
                  Enjoy secure and clear communication at a flat rate.
                </p>
                <h3 className="text-[#1e87f0] font-semibold text-2xl md:text-3xl mt-2">
                  <span>₹</span>
                  <span>{websiteInfo?.rechargeAmount || topup}</span>
                </h3>
              </div>
            </div>

            {/* Balance Card - NOT sticky in single column layout */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-center">
                  <h4 className="text-gray-600 font-medium text-lg mb-2">
                    Your Current Balance
                  </h4>
                  <h3 className="text-[#27ae60] font-bold text-3xl md:text-4xl">
                    <span>₹</span>
                    <span>
                      {(parseFloat(`${user?.balance?.amount}`) || 0).toFixed(2)}
                    </span>
                  </h3>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <TopUp
                      rechargeAmount={
                        websiteInfo?.rechargeAmount || parseFloat(topup)
                      }
                      refetch={refetch}
                      setRefetch={setRefetch}
                      paymentMethod={websiteInfo?.paymentMethod}
                    />
                    <Button
                      className="bg-[#086e05ff] hover:bg-[#086e05d5] text-white cursor-pointer rounded-md py-3 px-6 flex-1 text-center font-medium transition-colors"
                      onClick={() => openModal()}>
                      Withdraw
                    </Button>
                  </div>

                  {/* Additional info or stats can go here */}
                  <div className="bg-blue-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-800 text-center">
                      Minimum withdrawal amount: ₹100
                    </p>
                    <p className="text-xs text-blue-600 text-center mt-1">
                      Processing time: 24-48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History Card - Scrollable within card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
                Transaction History
              </h3>

              {info?.history?.length ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {info?.history?.map((tx, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-base">
                            {tx.historyType} via {tx.paymentMethod}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              tx.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : tx.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}>
                            {tx.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {tx.account}
                        </p>
                        {tx.historyType === "Call Charge" && (
                          <p className="text-sm text-gray-600 font-semibold">
                            {formatCallDuration(tx.callDuration)}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {new Date(tx.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="mt-2 sm:mt-0 text-right">
                        <p
                          className={`font-bold text-lg ${
                            tx.historyType === "top-up" ||
                            (tx.historyType === "Call Charge" &&
                              tx.paymentMethod === "Increased") ||
                            tx.historyType === "Admin Credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                          {tx.historyType === "top-up" ||
                          (tx.historyType === "Call Charge" &&
                            tx.paymentMethod === "Increased") ||
                          tx.historyType === "Admin Credit"
                            ? "+"
                            : "-"}
                          ₹{parseFloat(tx.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📊</div>
                  <p className="text-gray-500">
                    No transaction history available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <MonetizationPopup
          open={showModal}
          onClose={() => setShowModal(false)}
          info={info}
          refetch={refetch}
          setRefetch={setRefetch}
          websiteInfo={websiteInfo}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
