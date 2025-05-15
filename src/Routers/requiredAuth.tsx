import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  if (!token) {
    navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
  }

  return children;
};

export default RequireAuth;
