import { getAllUsers } from "@/actions/admin";
import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const [stats, setStats] = useState({
    totalUsers: 0,
    todayWithdrawal: 0,
    todayTopup: 0,
    allWithdrawal: 0,
    allTopup: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data: users } = await getAllUsers();
        const today = new Date().toISOString().slice(0, 10);

        const totalUsers = users.length;
        let todayWithdrawal = 0;
        let todayTopup = 0;
        let allWithdrawal = 0;
        let allTopup = 0;

        users.forEach((user) => {
          if (Array.isArray(user.history)) {
            user.history.forEach((entry) => {
              const entryDate = new Date(entry.createdAt)
                .toISOString()
                .slice(0, 10);

              if (entry.historyType === "withdrawal") {
                allWithdrawal++;
                if (entryDate === today) todayWithdrawal++;
              }

              if (entry.historyType === "top-up") {
                allTopup++;
                if (entryDate === today) todayTopup++;
              }
            });
          }
        });

        setStats({
          totalUsers,
          todayWithdrawal,
          todayTopup,
          allWithdrawal,
          allTopup,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const statCards = [
    {
      title: "Today's Top-ups",
      value: stats.todayTopup,
      subtitle: "Recent transactions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      iconBg: "bg-white",
    },
    {
      title: "Today's Withdrawals",
      value: stats.todayWithdrawal,
      subtitle: "Recent transactions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v4h12V6z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4 14a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H4zm12 2H4v4h12v-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      iconBg: "bg-white",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      subtitle: "Registered accounts",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org2000/svg">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      iconBg: "bg-white",
    },
    {
      title: "All Top-ups",
      value: stats.allTopup,
      subtitle: "Total transactions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600",
      iconBg: "bg-white",
    },
    {
      title: "All Withdrawals",
      value: stats.allWithdrawal,
      subtitle: "Total transactions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-cyan-50 to-sky-50",
      borderColor: "border-cyan-200",
      iconColor: "text-cyan-600",
      iconBg: "bg-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto h-full">
      <div className="bg-white h-14 flex items-center px-4">
        <Link to="/dashboard">
          <button className="text-xl md:hidden">
            <FiArrowLeft />
          </button>
        </Link>
      </div>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Here's what's happening with your platform.
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 inline-block">
                Last updated:{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className={`${card.bgColor} border ${card.borderColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {card.title}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {card.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">{card.subtitle}</p>
                    </div>
                    <div
                      className={`${card.iconBg} ${card.iconColor} rounded-lg p-2 ml-2`}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Updated just now</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
