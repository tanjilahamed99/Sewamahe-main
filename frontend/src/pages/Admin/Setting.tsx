import {
  creditUser,
  getAllUsers,
  getLiveKit,
  getLiveKitUser,
  getPayGicInfo,
  getRazorpayInfo,
  getWebData,
  updateLiveKit,
  updatePaygic,
  updateRazorpay,
  updateWebData,
} from "@/actions/admin";
import { useState, useEffect } from "react";
import { FiSearch, FiSave, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Settings() {
  const [settings, setSettings] = useState({
    withdrawalCharge: "",
    rechargeAmount: "",
    paymentMethod: {
      paygic: true,
      razorPay: true,
    },
  });
  const [paymentCredentials, setPaymentCredentials] = useState({
    razorpay: {
      key: "",
      secret: "",
      razorpayId: "",
    },
    paygic: {
      mid: "",
      password: "",
    },
  });

  const [liveKitCredentials, setLiveKitCredentials] = useState({
    url: "",
    key: "",
    secret: "",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data: users } = await getAllUsers();
      setUsers(users);
      setFilteredUsers(users);
      setLoading(false);
    };
    fetch();
  }, []);

  // Handle commission update
  const handleCommissionUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commission = formData.get("commission");
    try {
      const { data } = await updateWebData({
        withdrawalCharge: parseFloat(String(commission)),
      });
      if (data.success) {
        toast.success(
          `Withdrawal commission updated to ${commission}% successfully`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle recharge amount update
  const handleRechargeUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rechargeAmount = formData.get("rechargeAmount");
    try {
      const { data } = await updateWebData({
        rechargeAmount: parseFloat(String(rechargeAmount)),
      });
      if (data.success) {
        toast.success(
          `Recharge amount updated to ₹${rechargeAmount} successfully`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle payment methods toggle
  const handlePaymentToggle = async (method) => {
    const updatedMethods = {
      ...settings.paymentMethod,
      [method]: !settings.paymentMethod[method],
    };
    try {
      const { data } = await updateWebData({
        paymentMethod: updatedMethods,
      });
      setSettings((prev) => ({
        ...prev,
        paymentMethod: updatedMethods,
      }));
      if (data.success) {
        toast.success(
          `${method === "paygic" ? "PayGic" : "Razorpay"} payment method ${
            updatedMethods[method] ? "enabled" : "disabled"
          } successfully`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Razorpay credentials update
  const handleRazorpayUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = {
      key: String(formData.get("razorpayKey") ?? ""),
      secret: String(formData.get("razorpaySecret") ?? ""),
      razorpayId: String(formData.get("razorpayId") ?? ""),
    };

    try {
      const { data } = await updateRazorpay(credentials);
      if (data.success) {
        toast.success("Razorpay credentials updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle PayGic credentials update
  const handlePayGicUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const credentials = {
        mid: String(formData.get("paygicMid") ?? ""),
        password: String(formData.get("paygicPassword") ?? ""),
      };
      const { data } = await updatePaygic(credentials);
      if (data.success) {
        toast.success("PayGic credentials updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle PayGic credentials update
  const handleLiveKitUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const credentials = {
        url: String(formData.get("liveKitUrl") ?? ""),
        key: String(formData.get("liveKitKey") ?? ""),
        secret: String(formData.get("liveKitSecret") ?? ""),
      };
      const { data } = await updateLiveKit(credentials);
      if (data.success) {
        toast.success("LiveKit credentials updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle user credit
  const handleCreditUser = (user) => {
    setSelectedUser(user);
    setShowCreditModal(true);
  };

  const handleCreditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    const { data } = await creditUser({
      userId: selectedUser._id,
      userEmail: selectedUser.email,
      credit: creditAmount,
    });
    if (data.success) {
      toast.success(
        `Credited ₹${creditAmount} to ${selectedUser.firstName} ${selectedUser.lastName} successfully`,
      );
      setShowCreditModal(false);
      setSelectedUser(null);
      setCreditAmount(0);
      // Refresh user list to reflect updated balance
      const { data: users } = await getAllUsers();
      setUsers(users);
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getWebData();
      if (data.success) {
        setSettings({
          withdrawalCharge: data.data.withdrawalCharge,
          rechargeAmount: data.data.rechargeAmount,
          paymentMethod: {
            paygic: data.data.paymentMethod.paygic,
            razorPay: data.data.paymentMethod.razorPay,
          }, // Retain the existing paymentMethod
        });
        // setPaymentCredentials({
        //   razorpay: {
        //     key: data.data.razorpayKey || "",
        //     secret: data.data.razorpaySecret || "",
        //     razorpayId: data.data.razorpayId || "",
        //   },
        //   paygic: {
        //     mid: data.data.paygicMid || "",
        //     password: data.data.paygicPassword || "",
        //   },
        // });
      }
      const paygicRes = await getPayGicInfo();
      if (paygicRes.data.success) {
        setPaymentCredentials((prev) => ({
          ...prev,
          paygic: {
            mid: paygicRes.data.data.mid,
            password: paygicRes.data.data.password,
          },
        }));
      }
      const razorpayRes = await getRazorpayInfo();
      if (razorpayRes.data.success) {
        setPaymentCredentials((prev) => ({
          ...prev,
          razorpay: {
            key: razorpayRes.data.data.key,
            secret: razorpayRes.data.data.secret,
            razorpayId: razorpayRes.data.data.razorpayId,
          },
        }));
      }
      const liveKit = await getLiveKit();
      if (liveKit.data.success) {
        setLiveKitCredentials({
          url: liveKit.data.data.url,
          key: liveKit.data.data.key,
          secret: liveKit.data.data.secret,
        });
      }
    };
    fetch();
  }, []);

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)", // Adjust based on your header height
        scrollBehavior: "smooth",
      }}>
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center px-4 py-3">
          <Link to="/dashboard" className="mr-4">
            <button className="text-xl text-gray-700 hover:text-black">
              <FiArrowLeft />
            </button>
          </Link>
        </div>
      </div>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage system configuration and user settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Commission Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Withdrawal Commission
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Set commission percentage for withdrawals
            </p>

            <form onSubmit={handleCommissionUpdate}>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <input
                  type="number"
                  name="commission"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={settings.withdrawalCharge}
                  placeholder="Enter commission %"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update
                </button>
              </div>
            </form>
          </div>

          {/* Recharge Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Recharge Amount
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Set default recharge amount
            </p>

            <form onSubmit={handleRechargeUpdate}>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <input
                  type="number"
                  name="rechargeAmount"
                  step="0.01"
                  min="0"
                  defaultValue={settings.rechargeAmount}
                  placeholder="Enter recharge amount"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Payment Methods Toggle */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Methods
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enable or disable payment gateways
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    PayGic
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    Enable PayGic payment gateway
                  </p>
                </div>
                <button
                  onClick={() => handlePaymentToggle("paygic")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paymentMethod.paygic
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paymentMethod.paygic
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Razorpay
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    Enable Razorpay payment gateway
                  </p>
                </div>
                <button
                  onClick={() => handlePaymentToggle("razorPay")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paymentMethod.razorPay
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paymentMethod.razorPay
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Razorpay Credentials */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Razorpay Credentials
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Update Razorpay API credentials
            </p>

            <form onSubmit={handleRazorpayUpdate}>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    name="razorpayKey"
                    defaultValue={paymentCredentials.razorpay.key}
                    placeholder="Enter API key"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    API Secret
                  </label>
                  <input
                    type="password"
                    name="razorpaySecret"
                    defaultValue={paymentCredentials.razorpay.secret}
                    placeholder="Enter API secret"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Razorpay ID
                  </label>
                  <input
                    type="text"
                    name="razorpayId"
                    defaultValue={paymentCredentials.razorpay.razorpayId}
                    placeholder="Enter Razorpay ID"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update Credentials
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* PayGic Credentials */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm mb-6 md:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            PayGic Credentials
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Update PayGic API credentials
          </p>

          <form onSubmit={handlePayGicUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Merchant ID (MID)
                </label>
                <input
                  type="text"
                  name="paygicMid"
                  defaultValue={paymentCredentials.paygic.mid}
                  placeholder="Enter Merchant ID"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="paygicPassword"
                  defaultValue={paymentCredentials.paygic.password}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base">
                <FiSave className="w-4 h-4" />
                Update Credentials
              </button>
            </div>
          </form>
        </div>

        {/* livekit URL */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm mb-6 md:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            LiveKit Credentials
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Update LiveKit API credentials
          </p>

          <form onSubmit={handleLiveKitUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  LiveKit URL
                </label>
                <input
                  type="text"
                  name="liveKitUrl"
                  defaultValue={liveKitCredentials.url}
                  placeholder="Enter URL"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Api Key
                </label>
                <input
                  type="text"
                  name="liveKitKey"
                  defaultValue={liveKitCredentials.key}
                  placeholder="Enter Key"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Api Secret
                </label>
                <input
                  type="text"
                  name="liveKitSecret"
                  defaultValue={liveKitCredentials.secret}
                  placeholder="Enter secret"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base">
                <FiSave className="w-4 h-4" />
                Update Credentials
              </button>
            </div>
          </form>
        </div>

        {/* Users Table/Cards Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden sm:block p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              User Management
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Manage and monitor all user accounts
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 md:p-12 text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-2 md:border-4 border-black border-t-transparent"></div>
              </div>
              <div className="text-gray-500 mt-4 text-sm md:text-base">
                Loading users...
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredUsers.length === 0 && (
            <div className="p-8 md:p-12 text-center">
              <div className="text-gray-500 text-base md:text-lg mb-2">
                No users found
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Try adjusting your search or filters
              </div>
            </div>
          )}

          {/* Desktop Table (hidden on mobile) */}
          {!loading && filteredUsers.length > 0 && (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        #
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Balance
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id || index}
                        className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          {user.balance.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => handleCreditUser(user)}
                            className="text-gray-600 hover:text-black mx-auto">
                            Credit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Desktop Pagination */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      results
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Cards (shown on mobile) */}
              <div className="sm:hidden">
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id || index}
                    className="border-b border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium `}>
                            @{user.username}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {user.email}
                        </p>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {user.balance.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleCreditUser(user)}
                          className="text-sm text-gray-600 hover:text-black">
                          Credit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>

      {/* Credit Modal */}
      {showCreditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Credit User: {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <p className="text-gray-600 text-sm mb-4 md:mb-6">
              Current Balance: ₹{" "}
              {(selectedUser.balance?.amount || 0).toFixed(2)}
            </p>

            <form onSubmit={handleCreditSubmit}>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
                  placeholder="Enter amount to credit"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                  onClick={() => {
                    setShowCreditModal(false);
                    setSelectedUser(null);
                    setCreditAmount(0);
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                  Credit User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
