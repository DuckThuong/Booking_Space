import { FooterWeb } from "../../LayoutOption/FooterWeb";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./style.scss";
import ScrollSpyLayout from "../../LayoutOption/ScrollSpyLayout";
import { Space } from "./Space";
export const Venue = () => {
  const menuItems = [
    {
      key: "section1",
      icon: (
        <img src="https://img.icons8.com/windows/32/company.png" alt="space" />
      ),
      label: "Không gian",
    },
    {
      key: "section2",
      icon: (
        <img src="https://img.icons8.com/small/32/company.png" alt="venue" />
      ),
      label: "Địa điểm",
      isParent: true,
      children: [
        { key: "section2-1", label: "Thông tin chi tiết" },
        { key: "section2-2", label: "Thông tin khách" },
      ],
    },
  ];

  const contentSections = {
    section1: <Space />,
    "section2-1": <Space />,
    "section2-2": <Space />,
  };
  return (
    <div className="venue">
      <HeaderNavBar isLogin={true} />
      <ScrollSpyLayout items={menuItems} contentSections={contentSections} />
      <FooterWeb />
    </div>
  );
};
