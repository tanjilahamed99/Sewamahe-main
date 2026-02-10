import { getAllWithdrawals } from "@/actions/admin";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiEye,
  FiArrowLeft,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function WithdrawalRequest() {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  // Calculate stats
  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter((w) => w.status === "pending").length,
    approved: withdrawals.filter((w) => w.status === "approved").length,
    processing: withdrawals.filter((w) => w.status === "processing").length,
    rejected: withdrawals.filter((w) => w.status === "reject").length,
    totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0),
  };

  // Fetch withdrawals (mock)
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const { data } = await getAllWithdrawals();
      if (data.success) {
        setWithdrawals(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = withdrawals;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (withdrawal) =>
          withdrawal.author?.name?.toLowerCase().includes(lowerSearch) ||
          withdrawal.author?.email?.toLowerCase().includes(lowerSearch) ||
          withdrawal.paymentMethod?.toLowerCase().includes(lowerSearch) ||
          withdrawal.amount?.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterStatus !== "All") {
      result = result.filter((withdrawal) =>
        filterStatus === "reject"
          ? withdrawal.status === "reject"
          : withdrawal.status === filterStatus.toLowerCase()
      );
    }

    // Sort by date (newest first)
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredWithdrawals(result);
  }, [searchTerm, filterStatus, withdrawals]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      reject: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      pending: <FiClock className="w-3 h-3 mr-1" />,
      approved: <FiCheckCircle className="w-3 h-3 mr-1" />,
      processing: <FiLoader className="w-3 h-3 mr-1" />,
      reject: <FiXCircle className="w-3 h-3 mr-1" />,
    };

    const statusText =
      status === "reject"
        ? "Rejected"
        : status === "pending"
        ? "Pending"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
          colors[status] || colors.pending
        }`}>
        {icons[status]}
        {statusText}
      </span>
    );
  };

  // Payment method badge
  const PaymentMethodBadge = ({ method }) => {
    const colors = {
      "Bank Transfer": "bg-purple-100 text-purple-800",
      UPI: "bg-indigo-100 text-indigo-800",
      PayPal: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          colors[method] || "bg-gray-100 text-gray-800"
        }`}>
        {method}
      </span>
    );
  };



  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)",
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
            Withdrawal Requests
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and process user withdrawal requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiClock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  ₹
                  {stats.totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Bulk Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search by user name, email, amount, or payment method..."
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter and Bulk Actions */}
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={handleStatusFilter}>
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="reject">Rejected</option>
              </select>
            </div>
          </div>
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
          {!loading && filteredWithdrawals.length === 0 && (
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
          {!loading && filteredWithdrawals.length > 0 && (
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
                        Method
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredWithdrawals.map((tx, index) => (
                      <tr
                        key={tx._id || index}
                        className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {tx.author.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {tx.paymentMethod}
                        </td>
                        <td className="py-3 px-4">₹{tx.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(tx.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={tx.status} />
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/admin/withdrawal-request/view/${tx._id}`}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards (shown on mobile) */}
              <div className="sm:hidden">
                {filteredWithdrawals.map((tx, index) => (
                  <div
                    key={tx._id || index}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-3 hover:shadow-md transition-shadow duration-200">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {tx.author.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {tx.author.email}
                        </p>
                      </div>
                      <StatusBadge status={tx.status} />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-3" />

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="font-semibold text-gray-900 text-base">
                          ₹{tx.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="text-sm text-gray-700">
                          {new Date(tx.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/admin/withdrawal-request/view/${tx._id}`}
                      className="block w-full bg-black text-white text-center py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default WithdrawalRequest;
