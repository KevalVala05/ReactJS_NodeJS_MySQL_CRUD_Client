import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
