import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useDispatch";
import { getRazorpayInfo } from "@/actions/payment";
import API from "@/lib/axios";
import configuration from "@/config/configuration";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TopUp({
  setRefetch,
  refetch,
  rechargeAmount,
  paymentMethod,
}) {
  const user = useAppSelector((state) => state.auth.user);
  const [key, setKey] = useState("");

  const [loading, setLoading] = useState(false);

  const paymentWithRazor = async () => {
    if (!rechargeAmount || rechargeAmount <= 0) {
      return toast.warning("Please enter a valid amount.");
    }

    try {
      if (!key) {
        toast.error("key not found");
        setLoading(false);
        return;
      }

      setLoading(true);

      const receiptId = `receipt_Sewamahe_${Date.now()}`;
      const intentData = {
        amount: rechargeAmount * 100,
        currency: "INR",
        receipt: receiptId,
        notes: {
          userId: user._id,
          amount: rechargeAmount,
        },
      };
      const { data } = await API.post(
        `${configuration.url}/api/payment/create-payment-intent`,
        intentData,
      );

      localStorage.setItem(
        "pendingRazorpayOrder",
        JSON.stringify({ orderId: data.id, ts: Date.now() }),
      );

      const options = {
        key: key,
        amount: rechargeAmount * 100,
        name: "Sewamahe",
        description: "Recharge your Sewamahe account with",
        image: "https://i.ibb.co/QFqzpp1Q/logo.png",
        order_id: data.id,
        handler(res) {
          localStorage.removeItem("pendingRazorpayOrder");
          window.location.href = `/monetization/razorpay?orderId=${res.razorpay_order_id}`;
        },
        modal: {
          // Fires when user closes the checkout, whether or not payment happened
          ondismiss: () => {
            // Don't remove localStorage here — we still want to verify on next check
            window.location.href = `/monetization/razorpay?orderId=${data.id}`;
          },
        },
        prefill: {
          name: "Sewamahe User",
          email: "sewamahe@gmail.com",
          contact: "00000000000",
        },
        notes: { address: "Sewamahe Corporate Office" },
        theme: { color: "#dc2626" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        console.log("payment failed message :", response);
      });
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getRazorpayInfo({
          email: user.email,
          userId: user?._id,
        });
        if (data.success) {
          setKey(data.data.key);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetch();
    }
  }, [user]);

  const paymentWithPayzic = async () => {
    try {
      // Redirect user to payment page
      const { data } = await API.post(
        `${configuration.url}/api/payment/top-up/paygic`,
        {
          amount: rechargeAmount,
          userId: user._id,
        },
      );
      if (data.success) {
        window.location.href = data.payPageUrl;
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row  gap-3 justify-center items-center">
      {paymentMethod?.razorPay && (
        <Button
          className="bg-[#2706e0ff] hover:bg-[#2706e0bb] text-white cursor-pointer rounded-md"
          onClick={paymentWithRazor}
          disabled={loading}>
          {loading ? "Processing..." : "Top up with RazorPay"}
        </Button>
      )}

      {paymentMethod?.paygic && (
        <Button
          className="bg-[#2706e0ff] hover:bg-[#2706e0bb]  text-white cursor-pointer rounded-md "
          onClick={paymentWithPayzic}>
          Top up with Paygic
        </Button>
      )}
    </div>
  );
}
