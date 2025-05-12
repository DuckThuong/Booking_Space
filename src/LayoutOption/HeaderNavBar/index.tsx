import { SolutionOutlined } from "@ant-design/icons";
import { faListUl, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Menu, Tabs } from "antd";
import { useState } from "react";
import { SvgLogo } from "../../@svg/Logo/SvgLogo";
import ColWrap from "../../Components/ColWrap";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import "./headerNavBar.scss";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";

interface HeaderNavBarProps {
  isLogin: boolean;
  onTabChange?: (key: string) => void;
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({
  onTabChange,
  isLogin,
}) => {
  const [tabKey, setTabKey] = useState<string>("1");
  const [dropdownKey, setDropdownKey] = useState<string>("");
  const navigate = useNavigate();
  const tabItems = [
    { key: "1", label: "Trang chủ" },
    { key: "2", label: "Tài khoản", hasDropdown: true },
    { key: "3", label: "Nhóm của bạn", hasDropdown: true },
    { key: "4", label: "Truy cập nhanh" },
    { key: "5", label: "Trợ giúp" },
  ];

  const dropdownMenus: Record<string, JSX.Element> = {
    "2": (
      <Menu
        onClick={(e) => {
          setDropdownKey(e.key);
          onTabChange?.(e.key);
        }}
        selectedKeys={[dropdownKey]}
        items={[
          { key: "2.1", label: "Lập hóa đơn thanh toán" },
          { key: "2.2", label: "Tài liệu" },
          { key: "2.3", label: "Thiết bị mạng" },
          { key: "2.4", label: "Hãy giới thiệu" },
        ]}
      />
    ),
    "3": (
      <Menu
        onClick={(e) => {
          setDropdownKey(e.key);
          onTabChange?.(e.key);
        }}
        selectedKeys={[dropdownKey]}
        items={[
          { key: "3.1", label: "Nhóm của bạn" },
          { key: "3.2", label: "Người liên hệ chính" },
          { key: "3.3", label: "Yêu cầu quyền truy cập" },
        ]}
      />
    ),
  };

  const onTabChangeHandler = (key: string) => {
    setTabKey(key);
    if (!tabItems.find((tab) => tab.key === key)?.hasDropdown) {
      onTabChange?.(key);
    }
  };

  return (
    <div className="header">
      <FormWrap layout="horizontal" className="header__form">
        <RowWrap gutter={[16, 16]} className="header__row-first ">
          <ColWrap className="row-first-left" colProps={{ span: 18 }}>
            <div className="header__row-logo">
              <SvgLogo />
            </div>
            {isLogin ? (
              <div className="header__tab">
                <Tabs activeKey={tabKey} onChange={onTabChangeHandler}>
                  {tabItems.map((tab) => {
                    const tabContent = tab.hasDropdown ? (
                      <Dropdown
                        overlay={dropdownMenus[tab.key]}
                        trigger={["hover"]}
                        overlayClassName="header__dropdown"
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "block",
                            cursor: "pointer",
                          }}
                          onClick={(e) => e.preventDefault()}
                        >
                          {tab.label}
                        </div>
                      </Dropdown>
                    ) : (
                      tab.label
                    );

                    return <Tabs.TabPane key={tab.key} tab={tabContent} />;
                  })}
                </Tabs>
              </div>
            ) : (
              <div className="header__tab"></div>
            )}
          </ColWrap>
          <ColWrap className="row-first-right" colProps={{ span: 6 }}>
            {!isLogin ? (
              <div>
                <RowWrap className="header__row-item">
                  <ColWrap>
                    <Button className="header__row-item-login">
                      Đăng Nhập
                    </Button>
                  </ColWrap>
                  <ColWrap>
                    <Button className="header__row-item-register">
                      Đăng kí
                    </Button>
                  </ColWrap>
                </RowWrap>
              </div>
            ) : (
              <div className="right_content">
                <Button
                  className="header__row-contact"
                  onClick={() => {
                    navigate(CUSTOMER_ROUTER_PATH.HOST);
                  }}
                >
                  <span>
                    <SolutionOutlined />
                  </span>
                  <span>Become a Host</span>
                </Button>
                <Button className="header__row-account">
                  <FontAwesomeIcon icon={faUser} />
                  <FontAwesomeIcon icon={faListUl} />
                </Button>
              </div>
            )}
          </ColWrap>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
