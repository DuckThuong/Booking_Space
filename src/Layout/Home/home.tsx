import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./home.scss";
import { ContentRouter } from "./contentRoter";

export const Home = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("1");

  const onFinish = () => {
    navigate("/");
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };
  console.log(currentTab);
  return (
    <div className="home">
      <FormWrap form={form} onFinish={onFinish} className="home_form">
        <div className="home__header">
          <HeaderNavBar onTabChange={handleTabChange} isLogin={true} />
        </div>
        <div className="content">
          <ContentRouter tabKey={currentTab} />
        </div>
      </FormWrap>
    </div>
  );
};
