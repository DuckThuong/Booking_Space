import ScrollSpyLayout from "../../../LayoutOption/ScrollSpyLayout";

export const Space = () => {
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
  ];

  const contentSections = {
    "1-1": <Space />,
    "1-2": <Space />,
  };
  return (
    <ScrollSpyLayout items={menuItems} contentSections={contentSections} />
  );
};
