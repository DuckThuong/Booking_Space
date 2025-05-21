import { FC } from "react";
import Login from "../Login/login";
import { Register } from "../Register";
import { ForgotCodeInput } from "../ForgotPassword/ForgotCodeInput";
import { SpaceRound } from "./SpaceRound";

interface ContentRouterProps {
  tabKey: string;
}

export const ContentRouter: FC<ContentRouterProps> = ({ tabKey }) => {
  switch (tabKey) {
    case "1":
      return <SpaceRound />;
    case "2":
      return <ForgotCodeInput />;
    case "3":
      return <Register />;
    default:
      return null;
  }
};
