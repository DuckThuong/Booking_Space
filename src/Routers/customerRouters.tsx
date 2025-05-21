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
import Venue from "../Layout/Venue";
import { SpaceDetail } from "../Layout/Venue/Space/SpaceDetail";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Register */}
    <Route path={CUSTOMER_ROUTER_PATH.REGISTER} element={<Register />}></Route>
    {/* Forgot_Password */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT}
        element={<ForgotEmailInput />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_CODE_INPUT}
        element={<ForgotCodeInput />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_EDIT_PASSWORD}
        element={<ForgotEditPassword />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS}
        element={<ForgotSuccess />}
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
    {/* Venue */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.VENUE}
        element={<SuspenseWrapper component={<Venue />} />}
      />
      <Route
        path={CUSTOMER_ROUTER_PATH.VENUE_SPACE_DETAIL}
        element={<SuspenseWrapper component={<SpaceDetail />} />}
      />
    </Route>
  </Routes>
);
