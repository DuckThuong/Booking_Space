import { Route, Routes } from "react-router-dom";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";
import { Home } from "../Layout/Home/home";
import { Host } from "../Layout/Host";
import Login from "../Layout/Login/login";
import { Register } from "../Layout/Register";
import { DefaultUser } from "../Layout/User/DefaultUser";
import { SuspenseWrapper } from "../SuspenseWrapper";
import { CUSTOMER_ROUTER_PATH } from "./Routers";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Register */}
    <Route
      path={CUSTOMER_ROUTER_PATH.REGISTER}
      element={<SuspenseWrapper component={<Register />} />}
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
    {/* TrangChu */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.HOME}
        element={<SuspenseWrapper component={<Home />} />}
      />
      <Route
        path={CUSTOMER_ROUTER_PATH.HOME_CONTAINER}
        element={<SuspenseWrapper component={<Home />} />}
      />
    </Route>
    {/* Host */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.HOST}
        element={<SuspenseWrapper component={<Host />} />}
      />
    </Route>
    {/* User */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.DEFAULT_USER}
        element={<SuspenseWrapper component={<DefaultUser />} />}
      />
    </Route>
  </Routes>
);
