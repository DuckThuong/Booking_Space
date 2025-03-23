import { Route, Routes } from "react-router-dom";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";
import Login from "../Layout/Login/login";
import { SuspenseWrapper } from "../SuspenseWrapper";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import { Home } from "../Layout/Home/home";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Forgot_Password */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT}
        element={<SuspenseWrapper component={<ForgotEmailInput />} />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_CODE_INPUT}
        element={<SuspenseWrapper component={<ForgotCodeInput />} />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_EDIT_PASSWORD}
        element={<SuspenseWrapper component={<ForgotEditPassword />} />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS}
        element={<SuspenseWrapper component={<ForgotSuccess />} />}
      ></Route>
    </Route>

    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.TRANG_CHU}
        element={<SuspenseWrapper component={<Home />} />}
      />
    </Route>
  </Routes>
);
