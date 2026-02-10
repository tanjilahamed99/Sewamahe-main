import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useDispatch";
import { DashBoard } from "@/pages/DashBoard";
import Sidebar from "@/pages/DashboardSidebar/Sidebar";
import DetailsPanel from "@/pages/DashboardSidebar/DetailsPanel";
import NotFound from "@/pages/NotFound";
import Conversation from "@/pages/Conversation/Conversation";
import Meeting from "@/pages/Meeting/Meeting";
import Monetization from "@/pages/Monetization/Monetization";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AllUsers from "@/pages/Admin/AllUsers";
import Settings from "@/pages/Admin/Setting";
import AdminConsultant from "@/pages/Admin/Consultant";
import WithdrawalRequest from "@/pages/Admin/WithdrawalRequest";
import ViewWithdrawalRequest from "@/pages/Admin/ViewWithdrawalRequest";
import AdminTransaction from "@/pages/Admin/AllTransaction";
import ViewAdminTransaction from "@/pages/Admin/ViewTransaction";
import AdminAbout from "@/pages/Admin/AdminAbout";
import AdminContact from "@/pages/Admin/AdminContact";
import AdminTerms from "@/pages/Admin/AdminTerms";
import AdminPrivacy from "@/pages/Admin/AdminPrivacy";
import Failed from "@/pages/Monetization/Failed";
import PaymentSuccess from "@/pages/Monetization/Success";

function PrivetRoutes() {
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(false);
  const location = window.location.pathname;
  const user = useAppSelector((state) => state.auth.user);
  const call = useAppSelector((state) => state.call);

  useEffect(() => {
    if (!call.incoming) return;
    navigate(`/meeting/${call.roomId}`, { replace: true });
  }, [call, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex overflow-hidden h-screen">
      {call.status !== "in-call" && (
        <Sidebar
          setIsHome={setIsHome}
          className={` w-full border-r md:max-w-[360px] ${
            isHome
              ? " hidden md:flex"
              : location == "/dashboard"
              ? "flex w-full"
              : "hidden md:flex"
          }`}
        />
      )}

      <div className="flex-1 border-r">
        <Routes>
          <Route
            path="/dashboard"
            element={<DashBoard isHome={isHome} setisHome={setIsHome} />}
          />
          <Route path="/monetization" element={<Monetization />} />
          <Route path="/monetization/success" element={<PaymentSuccess />} />
          <Route path="/monetization/failed" element={<Failed />} />
          <Route path="/room/:id" element={<Conversation />} />
          <Route path="/room/:id/info" element={<DetailsPanel />} />
          <Route path="/meeting/:roomId" element={<Meeting />} />
          <Route path="/*" element={<NotFound />} />
          
          {/* admin*/}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/consultant" element={<AdminConsultant />} />
          <Route
            path="/admin/withdrawal-request"
            element={<WithdrawalRequest />}
          />
          <Route
            path="/admin/withdrawal-request/view/:id"
            element={<ViewWithdrawalRequest />}
          />
          <Route path="/admin/transaction" element={<AdminTransaction />} />
          <Route
            path="/admin/transaction/view/:id"
            element={<ViewAdminTransaction />}
          />
          <Route path="/admin/aboutAs" element={<AdminAbout />} />
          <Route path="/admin/contactAs" element={<AdminContact />} />
          <Route path="/admin/terms" element={<AdminTerms />} />
          <Route path="/admin/privacy" element={<AdminPrivacy />} />
        </Routes>
      </div>
      {location.includes("/info") || location.includes("/meeting") || (
        <DetailsPanel className="hidden xl:flex max-w-72 w-full" />
      )}
    </div>
  );
}

export default PrivetRoutes;
