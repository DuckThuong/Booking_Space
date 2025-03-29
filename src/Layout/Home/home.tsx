import { Button, Tabs } from "antd";
import ColWrap from "../../Components/ColWrap";
import { FormSelect } from "../../Components/Form/FormSelect";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import { AboutSvg } from "../../Svg/AboutSvg";
import "./home.scss";
import { TabsProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";

export const Home = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/");
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="home">
      <FormWrap form={form} onFinish={onFinish} className="home_form">
        <div className="home__header">
          <HeaderNavBar />
        </div>
      </FormWrap>
    </div>
  );
};
