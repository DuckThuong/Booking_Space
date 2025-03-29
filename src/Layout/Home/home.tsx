import { useForm } from "antd/es/form/Form";
import { TabsProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./home.scss";

export const Home = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/");
  };

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
