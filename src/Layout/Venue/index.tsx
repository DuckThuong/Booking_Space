import { FooterWeb } from "../../LayoutOption/FooterWeb";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./style.scss";
import ScrollSpyLayout from "../../LayoutOption/ScrollSpyLayout";
import { Space } from "./Space";
export const Venue = () => {
  const menuItems = [
    {
      key: "1",
      icon: (
        <img src="https://img.icons8.com/windows/32/company.png" alt="space" />
      ),
      label: "Không gian",
      children: [
        { key: "1-1", label: "Thông tin chi tiết" },
        { key: "1-2", label: "Thông tin khách" },
      ],
    },
    {
      key: "2",
      icon: (
        <img src="https://img.icons8.com/small/32/company.png" alt="venue" />
      ),
      label: "Địa điểm",
      isParent: true,
      children: [
        { key: "2-1", label: "Thông tin chi tiết" },
        { key: "2-2", label: "Thông tin khách" },
      ],
    },
  ];

  const contentSections = {
    "1-1": <Space />,
    "1-2": <Space />,
    "2-1": <Space />,
    "2-2": <Space />,
  };
  return (
    <div className="venue">
      <HeaderNavBar isLogin={true} />
      <ScrollSpyLayout items={menuItems} contentSections={contentSections} />
      <FooterWeb />
    </div>
  );
};
