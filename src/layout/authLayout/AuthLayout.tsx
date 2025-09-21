
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;