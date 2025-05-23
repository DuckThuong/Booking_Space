import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./home.scss";
import { ContentRouter } from "./contentRoter";
import { FooterWeb } from "../../LayoutOption/FooterWeb";

export const Home = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromURL = queryParams.get("token");

  useEffect(() => {
    if (!token && !tokenFromURL) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [token, tokenFromURL]);

  useEffect(() => {
    if (tokenFromURL && !localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", tokenFromURL);
    }
  }, [tokenFromURL]);

  const onFinish = () => {
    navigate("/");
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };
  return (
    <div className="home">
      <FormWrap form={form} onFinish={onFinish} className="home_form">
        <div className="home__header">
          <HeaderNavBar onTabChange={handleTabChange} isLogin={isLogin} />
        </div>
        <div className="content">
          <ContentRouter tabKey={currentTab} />
        </div>
      </FormWrap>
      <FooterWeb />
    </div>
  );
};
