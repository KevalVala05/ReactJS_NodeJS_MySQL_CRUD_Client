import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "../../api";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);

      // Optional: decode token
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Logged in user info:", payload);

      navigate("/dashboard", { replace: true });
    } else {
      navigate("/auth", { replace: true }); // fallback
    }
  }, [navigate, location.search]);

  return <div>Signing you in...</div>;
};

export default AuthSuccess;
