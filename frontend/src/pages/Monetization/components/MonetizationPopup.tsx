import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/useDispatch";
import configuration from "@/config/configuration";
import API from "@/lib/axios";
import { toast } from "sonner";

interface MonetizationPopupProps {
  open: boolean;
  onClose: () => void;
  refetch: boolean;
  info: {
    balance: {
      amount: number;
    };
  };
  setShowModal: (boolean) => void;
  setRefetch: (boolean) => void;
  websiteInfo: {
    withdrawalCharge: number;
  };
}

export function MonetizationPopup({
  open,
  onClose,
  refetch,
  info,
  setShowModal,
  setRefetch,
  websiteInfo,
}: MonetizationPopupProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const amount = Number(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod") as string;

    if (!amount || amount <= 0)
      return setErrors({ type: "amount", message: "Enter valid amount" });

    if (amount > info.balance.amount)
      return setErrors({ type: "amount", message: "Insufficient balance" });
    
    if (!paymentMethod)
      return setErrors({ type: "paymentMethod", message: "Choose a method" });

    setErrors(null);
    setWithdrawalLoading(true);

    const sendingData =
      paymentMethod === "upi"
        ? {
            withdrawalAmount: amount,
            paymentMethod,
            account: form.accountInfo.value,
            holderName: form.holderName.value,
            author: {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              id: user._id,
            },
          }
        : {
            withdrawalAmount: amount,
            paymentMethod,
            account: form.accountNumber.value,
            ifsc: form.ifsc.value,
            holderName: form.holderName.value,
            author: {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              id: user._id,
            },
          };

    try {
      const { data } = await API.put(
        `${configuration.url}/api/user/balance/withdrawal-request/${user._id}`,
        sendingData
      );
      if (data?.success) {
          setShowModal(false);
          setRefetch(!refetch);
          toast.success("Withdrawal successful");
      }
    } catch {
      setErrors({ type: "api", message: "Withdrawal failed" });
    } finally {
      setWithdrawalLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1e87f0] text-xl">
            Withdraw Balance
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleWithdrawSubmit} className="space-y-4">
          <div>
            <label className="">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors?.type === "amount" && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              required
              name="paymentMethod"
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Select Method</option>
              <option value="upi">UPI</option>
              <option value="bank">Bank Transfer</option>
            </select>
            {errors?.type === "paymentMethod" && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {selectedMethod === "upi" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  UPI ID
                </label>
                <input
                  name="accountInfo"
                  type="text"
                  placeholder="example@upi"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors?.type === "accountInfo" && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Account Holder Name
                </label>
                <input
                  name="holderName"
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {selectedMethod === "bank" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  IFSC Code
                </label>
                <input
                  name="ifsc"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Account Holder Name
                </label>
                <input
                  name="holderName"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border">
              Cancel
            </button>

            <button
              type="submit"
              disabled={withdrawalLoading}
              className="px-4 py-2 bg-[#1e87f0] text-white disabled:opacity-50">
              {withdrawalLoading ? "Processing..." : "Submit Request"}
            </button>
          </div>
        </form>

        <p className="mt-3 text-gray-500">
          {websiteInfo?.withdrawalCharge || 0}% commission applies
        </p>
      </DialogContent>
    </Dialog>
  );
}
