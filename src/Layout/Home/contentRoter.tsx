import { FC } from "react";
import Login from "../Login/login";
import { Register } from "../Register";
import { ForgotCodeInput } from "../ForgotPassword/ForgotCodeInput";

interface ContentRouterProps {
  tabKey: string;
}

export const ContentRouter: FC<ContentRouterProps> = ({ tabKey }) => {
  switch (tabKey) {
    case "1":
      return <Login />;
    case "4":
      return <ForgotCodeInput />;
    case "5":
      return <Register />;
    case "2.1":
      return <Login />;
    case "2.2":
      return <Register />;
    case "2.3":
      return <ForgotCodeInput />;
    case "2.4":
      return <Login />;
    case "3.1":
      return <ForgotCodeInput />;
    case "3.2":
      return <Login />;
    case "3.3":
      return <Login />;
    default:
      return null;
  }
};
