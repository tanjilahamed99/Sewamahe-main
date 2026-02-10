import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import configuration from "@/config/configuration";
import { useAppSelector } from "@/hooks/useDispatch";

export default function PaymentSuccess() {
  const [showModal, setShowModal] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [refId, setRefId] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleBack = () => {
    navigate("/monetization");
    setShowModal(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refIdFromUrl = queryParams.get("refId");
    if (refIdFromUrl) {
      setRefId(refIdFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (refId) {
      setErrorMsg("");
      const validatePayment = async () => {
        try {
          const { data } = await axios.post(
            `${configuration.url}/api/payment/paygic/validate-payment`,
            {
              userId: user._id, // Get from your auth state
              merchantReferenceId: refId,
            }
          );
          if (data.success) {
            setStatus("success");
            setTransactionId(data.data?.transactionId || `TXN_${Date.now()}`);
          } else {
            setStatus("failed");
            setErrorMsg(data.message || "Payment validation failed");
          }
        } catch (err) {
          console.error(err);
          setStatus("failed");
          setErrorMsg(
            err.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        }
      };

      validatePayment();
    }
  }, [refId]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${
          showModal ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleBack}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ${
            showModal
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}>
          {/* Content based on status */}
          <div className="p-8 text-center">
            {status === "loading" && (
              <div className="space-y-6">
                {/* Spinner Animation */}
                <div className="relative mx-auto">
                  <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-black animate-pulse" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 animate-pulse">
                  Processing Payment...
                </h2>
                <p className="text-gray-600">
                  Please wait while we confirm your payment
                </p>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-6">
                {/* Success Icon with Animation */}
                <div className="relative mx-auto">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600 animate-scale-up" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 animate-fade-in">
                  Payment Successful! 🎉
                </h2>
                <p className="text-gray-600">
                  Your payment has been processed successfully
                </p>

                {/* Success Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-slide-up">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Reference ID</span>
                    <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {refId}
                    </code>
                  </div>
                  {transactionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Transaction ID</span>
                      <span className="font-medium text-gray-900">
                        {transactionId}
                      </span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-green-600 font-medium">
                      ✅ Payment confirmed
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleBack}
                    className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg">
                    <CreditCard className="h-5 w-5" />
                    Go to Monetization
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}

            {status === "failed" && (
              <div className="space-y-6">
                {/* Failed Icon with Animation */}
                <div className="relative mx-auto">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-red-600 animate-shake" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Payment Failed
                </h2>
                <p className="text-gray-600">
                  We couldn't confirm your payment
                </p>

                {/* Error Details */}
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-up">
                    <p className="text-red-700 text-sm">{errorMsg}</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Reference ID</span>
                    <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {refId}
                    </code>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleBack}
                    className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg">
                    <CreditCard className="h-5 w-5" />
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Animated Bottom Border */}
          <div
            className={`h-1 w-full transition-all duration-1000 ${
              status === "loading"
                ? "bg-gray-300"
                : status === "success"
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-red-400 to-red-500"
            }`}>
            {status === "loading" && (
              <div className="h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-full animate-slide" />
            )}
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scale-up {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }
        
        .animate-scale-up {
          animation: scale-up 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
}
