import { SolutionOutlined } from "@ant-design/icons";
import { faListUl, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Image, notification, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../../@svg/Logo/SvgLogo";
import { userApi, venueApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { useUser } from "../../api/useHook";
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
  const user = useUser();

  const tabItems = [
    { key: "1", label: "Doanh nghiệp" },
    { key: "2", label: "Giá cả" },
    { key: "3", label: "Tài nguyên" },
  ];

  useEffect(() => {
    if (window.location.href !== CUSTOMER_ROUTER_PATH.HOME) {
      setTabKey("0");
    } else {
      setTabKey("1");
    }
  }, [window.location.href]);

  const onTabChangeHandler = (key: string) => {
    setTabKey(key);
    navigate(CUSTOMER_ROUTER_PATH.HOME);
    if (onTabChange) {
      onTabChange(key);
    }
  };

  const logOutMutation = useMutation({
    mutationFn: () => userApi.doLogOut(),
    onSuccess: (data) => {
      if (data) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        notification.open({
          message: "Thông báo!",
          description: "Đăng xuất thành công.",
          placement: "topRight",
          showProgress: true,
          pauseOnHover: true,
          style: {
            backgroundColor: "#ffffff",
            borderLeft: "4px solid #007bff",
          },
        });
        navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      notification.open({
        message: "Thông báo!",
        description:
          error?.response?.data?.description || "Đăng xuất thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid rgb(255, 0, 0)",
        },
      });
    },
  });

  const { data: venueData } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE, showAccount],
    queryFn: () => venueApi.getVenueByUser(),
  });

  const handleLogOut = async () => {
    logOutMutation.mutate();
    setShowAccount(false);
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
                  <span>Đăng kí địa điểm</span>
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
                      {Array.isArray(venueData) && venueData.length > 0 ? (
                        venueData.map((venue: any) => (
                          <div
                            key={venue.id}
                            className="header_account-option"
                            onClick={() => {
                              setShowAccount(false);
                              navigate(CUSTOMER_ROUTER_PATH.VENUE, {
                                state: venue?.venueId,
                              });
                            }}
                          >
                            {venue?.name || "Địa điểm chưa có địa chỉ"}
                          </div>
                        ))
                      ) : (
                        <div
                          className="header_account-option"
                          onClick={() => {
                            setShowAccount(false);
                            navigate(CUSTOMER_ROUTER_PATH.HOST);
                          }}
                        >
                          Thêm địa điểm mới
                        </div>
                      )}
                    </Col>
                    <Col span={12} className="header_account-profile">
                      <div className="header_profile">
                        <Image
                          preview={false}
                          src={
                            typeof user?.avatarUrl === "string" &&
                            user.avatarUrl
                              ? user.avatarUrl
                              : "https://static-cse.canva.com/blob/2008403/1600w-vkBvE1d_xYA.jpg"
                          }
                        />
                        <div className="header_profile-info">
                          <p>{user?.fullName}</p>
                          <p>{user?.email}</p>
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
                          handleLogOut();
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
