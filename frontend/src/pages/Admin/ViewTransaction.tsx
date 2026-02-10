import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  getSingleWithdrawals,
} from "@/actions/admin";

// Define types for the transaction data
interface User {
  name: string;
  id: string;
  email: string;
}

interface Transaction {
  _id: string;
  author: User;
  amount: number;
  account: string;
  status: "pending" | "approved" | "processing" | "reject" | "completed";
  createdAt: string;
  paymentMethod: string;
  ifsc: string;
  holderName: string;
  historyType: string;
}

function ViewAdminTransaction(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch transaction
  useEffect(() => {
    setLoading(true);

    const fetchTransaction = async () => {
      try {
        if (!id) return;
        const { data } = await getSingleWithdrawals(id);
        if (data.success) {
          setTransaction(data.withdrawal);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      reject: "bg-red-100 text-red-800 border-red-200",
      completed: "bg-purple-100 text-purple-800 border-purple-200",
    };

    const icons = {
      pending: <FiClock className="w-4 h-4 mr-1" />,
      approved: <FiCheckCircle className="w-4 h-4 mr-1" />,
      processing: <FiInfo className="w-4 h-4 mr-1" />,
      reject: <FiInfo className="w-4 h-4 mr-1" />,
      completed: <FiCheckCircle className="w-4 h-4 mr-1" />,
    };

    const statusText =
      status === "reject"
        ? "Rejected"
        : status === "pending"
        ? "Pending"
        : status?.charAt(0).toUpperCase() + status?.slice(1);

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
          colors[status as keyof typeof colors] || colors.pending
        }`}>
        {icons[status as keyof typeof icons] || icons.pending}
        {statusText}
      </span>
    );
  };

  // Info card component
  const InfoCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );


  return (
    <div
         className="h-full overflow-y-auto bg-gray-50"
         style={{
           maxHeight: "calc(100vh - 64px)",
           scrollBehavior: "smooth",
         }}>
         <div className="p-4 md:p-6">
           {/* Header */}
           <button
             onClick={handleBack}
             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mr-4">
             <FiArrowLeft className="w-5 h-5" />
             <span className="hidden md:inline">Back</span>
           </button>
           <div className="flex items-center mb-6 md:mb-8">
             <div>
               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                 Transaction Details
               </h1>
               <p className="text-gray-600 mt-2">
                 View and manage withdrawal request details
               </p>
             </div>
           </div>
   
           {loading ? (
             <div className="flex items-center justify-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
             </div>
           ) : !transaction ? (
             <div className="text-center py-8">
               <p className="text-gray-500">No transaction data found.</p>
             </div>
           ) : (
             <>
               {/* Transaction ID and Status */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                 <div>
                   <div className="text-sm text-gray-500">Transaction ID</div>
                   <div className="text-lg font-bold text-gray-900 font-mono">
                     {transaction._id.toString().slice(-8)}
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="text-sm text-gray-500">Status</div>
                   <StatusBadge status={transaction.status} />
                 </div>
               </div>
   
               {/* Quick Stats */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                 <InfoCard
                   icon={FiDollarSign}
                   title="Requested Amount"
                   value={`₹${transaction.amount.toLocaleString("en-IN", {
                     minimumFractionDigits: 2,
                   })}`}
                 />
                 <InfoCard
                   icon={FiCalendar}
                   title="Request Date"
                   value={new Date(transaction.createdAt).toLocaleDateString(
                     "en-IN",
                     {
                       day: "2-digit",
                       month: "short",
                       year: "numeric",
                     }
                   )}
                   subtitle={new Date(transaction.createdAt).toLocaleTimeString(
                     "en-IN",
                     {
                       hour: "2-digit",
                       minute: "2-digit",
                     }
                   )}
                 />
               </div>
   
               {/* Main Content Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                 {/* User Information */}
                 <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                   <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                     <FiUser className="inline-block w-5 h-5 mr-2 text-blue-600" />
                     User Information
                   </h2>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                         Full Name
                       </label>
                       <div className="text-gray-900 font-medium">
                         {transaction.author.name}
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                         Email Address
                       </label>
                       <div className="text-gray-900">
                         {transaction.author.email}
                       </div>
                     </div>
                   </div>
                 </div>
   
                 {/* Payment Details */}
                 <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                   <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                     <FiCreditCard className="inline-block w-5 h-5 mr-2 text-blue-600" />
                     Payment Details
                   </h2>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                         Payment Method
                       </label>
                       <div className="text-gray-900 font-medium">
                         {transaction.paymentMethod}
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                         Account Information
                       </label>
                       <div className="text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg font-mono text-sm">
                         {transaction.account}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
   
               {/* Transaction Timeline */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
                 <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                   Transaction Timeline
                 </h2>
                 <div className="space-y-4">
                   <div className="flex items-start">
                     <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                     <div>
                       <div className="font-medium text-gray-900">
                         Request Created
                       </div>
                       <div className="text-sm text-gray-500">
                         {new Date(transaction.createdAt).toLocaleString("en-IN", {
                           dateStyle: "medium",
                           timeStyle: "short",
                         })}
                       </div>
                     </div>
                   </div>
                   <div className="flex items-start">
                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                     <div>
                       <div className="font-medium text-gray-900">
                         Status Updated
                       </div>
                       <div className="text-sm text-gray-500">
                         {new Date().toLocaleString("en-IN", {
                           dateStyle: "medium",
                           timeStyle: "short",
                         })}{" "}
                         - Currently {transaction.status}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               
             </>
           )}
   
           {/* Bottom padding for better scrolling */}
           <div className="h-6 md:h-8"></div>
         </div>
       </div>
  );
}

export default ViewAdminTransaction;
