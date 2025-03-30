import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./home.scss";
import { ContentRouter } from "./contentRoter";

export const Home = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [token]);

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
    </div>
  );
};
