import { SolutionOutlined } from "@ant-design/icons";
import { faListUl, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, Image, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../../@svg/Logo/SvgLogo";
import ColWrap from "../../Components/ColWrap";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./headerNavBar.scss";

interface HeaderNavBarProps {
  isLogin: boolean;
  onTabChange?: (key: string) => void;
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({
  onTabChange,
  isLogin,
}) => {
  const [tabKey, setTabKey] = useState<string>("1");
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const navigate = useNavigate();
  const tabItems = [
    { key: "1", label: "Doanh nghiệp" },
    { key: "2", label: "Giá cả" },
    { key: "3", label: "Tài nguyên" },
  ];

  useEffect(() => {
    if (window.location.href !== CUSTOMER_ROUTER_PATH.HOME) {
      setTabKey("0");
    }
  }, [window.location.href]);

  const onTabChangeHandler = (key: string) => {
    setTabKey(key);
    navigate(CUSTOMER_ROUTER_PATH.HOME);
    if (onTabChange) {
      onTabChange(key);
    }
    console.log(tabKey);
  };

  return (
    <div className="header">
      <FormWrap layout="horizontal" className="header__form">
        <RowWrap gutter={[16, 16]} className="header__row-first ">
          <ColWrap className="row-first-left" colProps={{ span: 18 }}>
            <div
              className="header__row-logo"
              onClick={() => navigate(CUSTOMER_ROUTER_PATH.HOME)}
            >
              <SvgLogo />
            </div>
            {isLogin ? (
              <div className="header__tab">
                <Tabs activeKey={tabKey} onChange={onTabChangeHandler}>
                  {tabItems.map((tab) => (
                    <Tabs.TabPane key={tab.key} tab={tab.label} />
                  ))}
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
                <Button
                  className="header__row-account"
                  onClick={() => {
                    setShowAccount(!showAccount);
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <FontAwesomeIcon icon={faListUl} />
                </Button>
                {showAccount && (
                  <Row className="header_account">
                    <Col span={12} className="header_account-venue">
                      <p className="header_account-title">Địa điểm của tôi</p>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                          navigate(CUSTOMER_ROUTER_PATH.VENUE);
                        }}
                      >
                        360, Giải Phóng
                      </div>
                    </Col>
                    <Col span={12} className="header_account-profile">
                      <div className="header_profile">
                        <Image
                          preview={false}
                          src="https://static-cse.canva.com/blob/2008403/1600w-vkBvE1d_xYA.jpg"
                        />
                        <div className="header_profile-info">
                          <p>Tên người dùng</p>
                          <p>Email người dùng</p>
                        </div>
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Địa điểm của tôi
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Booking
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Tin nhắn
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Cài đặt
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Trợ giúp
                      </div>
                      <div
                        className="header_account-option"
                        onClick={() => {
                          setShowAccount(false);
                        }}
                      >
                        Đăng xuất
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            )}
          </ColWrap>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
