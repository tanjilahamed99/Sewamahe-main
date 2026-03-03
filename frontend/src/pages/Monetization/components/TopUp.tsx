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
  const amount = rechargeAmount * 100;
  const currency = import.meta.env.VITE_CURRENCY;
  const user = useAppSelector((state) => state.auth.user);
  const receiptId = `${user?._id}${Date.now()}`;
  const [key, setKey] = useState("");

  // const paymentWithRazor = async (e) => {
  //   const intentData = { amount, currency, receipt: receiptId };
  //   const { data } = await API.post(
  //     `${configuration.url}/api/payment/create-payment-intent`,
  //     intentData
  //   );
  //   const options = {
  //     key, // Enter the Key ID generated from the Dashboard
  //     amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency,
  //     name: "Sawamahe", // your business name
  //     description:
  //       "Sewamahe is a messaging app that enables real-time messaging, audio and video calls, groups and conferencing.",
  //     image: "https://i.ibb.co/QFqzpp1Q/logo.png",
  //     order_id: data.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     async handler(res) {
  //       const body = {
  //         ...res,
  //       };
  //       const { data: response } = await API.post(
  //         `${configuration.url}/api/payment/validate-payment`,
  //         body
  //       );
  //       if (response.msg === "success") {
  //         const history = {
  //           amount: rechargeAmount,
  //           paymentMethod: "Razorpay",
  //           razorpay: body,
  //           author: {
  //             name: `${user.firstName}${" "}${user.lastName}`,
  //             email: user.email,
  //             id: user._id,
  //           },
  //         };
  //         const { data: ress } = await API.post(
  //           `${configuration.url}/api/payment/balance/top-up/${user._id}`,
  //           history
  //         );
  //         if (ress.success) {
  //           setRefetch(!refetch);
  //           toast.success("Money Added Successful");
  //         }
  //       }
  //     },
  //     prefill: {
  //       // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
  //       name:
  //         `${user?.firstName ?? ""} ${" "} ${user?.lastName ?? ""}`.trim() ||
  //         "Sawamahe Pro User", // your customer's name
  //       email: user?.email || "sawamahe@example.com",
  //       contact: "00000000000", // Provide the customer's phone number for better conversion rates
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };
  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.on("payment.failed", (response) => {
  //     alert(response.error.code);
  //     alert(response.error.description);
  //     alert(response.error.source);
  //     alert(response.error.step);
  //     alert(response.error.reason);
  //     alert(response.error.metadata.order_id);
  //     alert(response.error.metadata.payment_id);
  //   });
  //   rzp1.open();
  //   e.preventDefault();
  // };

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
        }
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
      {/* {paymentMethod?.razorPay && (
        <Button
          className="bg-[#2706e0ff] hover:bg-[#2706e0bb]  text-white cursor-pointer rounded-md "
          onClick={paymentWithRazor}>
          Top up with RazorPay
        </Button>
      )} */}
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
