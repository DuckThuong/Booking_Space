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
      <FormWrap form={form} onFinish={onFinish} className="home_header">
        <div className="home_header">
          <div className="home_header-top">
            <RowWrap className="home_header-top-head" gutter={[16, 16]}>
              <ColWrap colProps={{ span: 12 }}>
                <a href="/">Booking.com</a>
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <RowWrap gutter={[16, 16]}>
                  <ColWrap colProps={{ span: 4 }}>
                    <FormSelect name={"money_type"}></FormSelect>
                  </ColWrap>
                  <ColWrap colProps={{ span: 4 }}>
                    <div className="top-header-icon">Icon</div>
                  </ColWrap>
                  <ColWrap colProps={{ span: 4 }}>
                    <div className="top-header-icon">
                      <AboutSvg />
                    </div>
                  </ColWrap>
                  <ColWrap colProps={{ span: 4 }}>
                    <Button>Đăng chỗ nghỉ của quý vị</Button>
                  </ColWrap>
                  <ColWrap colProps={{ span: 4 }}>
                    <Button>Đăng ký</Button>
                  </ColWrap>
                  <ColWrap colProps={{ span: 4 }}>
                    <Button>Đăng nhập</Button>
                  </ColWrap>
                </RowWrap>
              </ColWrap>
            </RowWrap>
            <RowWrap className="home_header-top-body">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </RowWrap>
          </div>
        </div>
      </FormWrap>
    </div>
  );
};
