import { FC } from "react";
import { Space } from "./Space";

interface VenueRouterProps {
  tabKey: string;
}

export const VenueRouter: FC<VenueRouterProps> = ({ tabKey }) => {
  switch (tabKey) {
    case "1":
      return <Space />;
    default:
      return null;
  }
};
