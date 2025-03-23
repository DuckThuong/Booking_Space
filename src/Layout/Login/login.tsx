import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../../LayoutOption/Notification";
import "./login.scss";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { SvgGoogle } from "../../@svg/Icon/Google/SvgGoogle";
import { SvgDone } from "../../@svg/Icon/Done/SvgDone";
import { SvgRegister } from "../../@svg/Icon/SvgRegister";
const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleForgotPassword = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onFinish();
    }
  };

  const onFinish = () => {
    navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
  };

  const onClickRegister = () => {
    navigate(CUSTOMER_ROUTER_PATH.REGISTER);
  };

  return (
    <div className="login">
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div>
        <LogoForm />
      </div>
      <div className="login_form">
        <FormWrap onFinish={onFinish} form={form} className="login_form-wrap">
          <div className="login_form-header">
            <p className="login_form-header-content">ĐĂNG NHẬP</p>
          </div>
          <div className="login_form-email">
            <p className="login_form-label">Email</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "login_form-input",
                rules: ValidateLibrary().email,
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Email@gmail.com",
              }}
            />
          </div>
          <div className="login_form-password">
            <div className="login_form-password-title">
              <span className="login_form-label">Mật khẩu</span>
              <span
                onClick={handleForgotPassword}
                className="login_form-password-title-forgot"
              >
                Quên mật khẩu
              </span>
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "login_form-input",
              }}
              isPassword
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Mật khẩu",
              }}
            />
          </div>

          <div className="login_form-login">
            <FormButtonSubmit
              content="Đăng nhập"
              buttonProps={{
                className: "login_form-login-button",
                onClick: onFinish,
                type: "default",
                icon: <SvgDone />,
              }}
            />
            <span className="login_form-login-or">Hoặc</span>
            <CustomButton
              content=""
              buttonProps={{
                className: "login_form-login-google",
                onClick: onFinish,
                type: "default",
                icon: <SvgGoogle />,
              }}
            />
          </div>
          <div className="login_form-signIn">
            <CustomButton
              content="Đăng ký"
              buttonProps={{
                className: "login_form-signIn-button",
                onClick: onClickRegister,
                icon: <SvgRegister />,
              }}
            />
          </div>
          <div className="login_form-privacy">
            <FormCheckbox
              name={"submit"}
              content={"Đồng ý với các điều khoản dịch vụ"}
              formItemProps={{
                className: "login_form-checkbox-sumit",
              }}
            />
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default Login;
