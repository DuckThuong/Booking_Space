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
import { set } from "lodash";

export const HeaderNavBar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [tabKey, setTabKey] = useState<string>("1");

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
        onClick={(e) => setTabKey(e.key)}
        selectedKeys={[tabKey]}
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
        onClick={(e) => setTabKey(e.key)}
        selectedKeys={[tabKey]}
        items={[
          { key: "3.1", label: "Nhóm của bạn" },
          { key: "3.2", label: "Người liên hệ chính" },
          { key: "3.3", label: "Yêu cầu quyền truy cập" },
        ]}
      />
    ),
  };

  const onTabChange = (key: string) => {
    setTabKey(key);
  };

  console.log(tabKey, "tabKey");
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
                <Tabs activeKey={tabKey} onChange={onTabChange}>
                  {tabItems.map((tab) => {
                    const tabContent = tab.hasDropdown ? (
                      <Dropdown
                        overlay={dropdownMenus[tab.key]}
                        trigger={["hover"]}
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
                <Button className="header__row-contact">
                  <span>
                    <SolutionOutlined />
                  </span>
                  <span> Cập nhật thông tin </span>
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
