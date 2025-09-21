import { LayoutDashboard, Users, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { useAppDispatch } from "@/store/store";
import { logoutUser } from "@/redux/authSlice";
import { showSuccessToast } from "@/utils/toastUtils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, to: "/dashboard" },
    { label: "Users", icon: <Users size={18} />, to: "/users" },
  ];

 const handleUserLogout = () => {
    dispatch(logoutUser(navigate));
    showSuccessToast("User Logged out successfully.");
  };

  return (
    <div
      className={clsx(
        "h-screen border-r bg-white shadow-sm flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-semibold text-lg">Admin Dashboard</span>}
        <button
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button onClick={handleUserLogout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
