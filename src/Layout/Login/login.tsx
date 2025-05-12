import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SvgDone } from "../../@svg/Icon/Done/SvgDone";
import { SvgGoogle } from "../../@svg/Icon/Google/SvgGoogle";
import { SvgRegister } from "../../@svg/Icon/SvgRegister";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import "./login.scss";
import { login } from "./../../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/api";
import { LoginPayload } from "../../api/itemApi";
import { notification } from "antd";
const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onFinish();
    }
  };

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => userApi.doUserSubmitLogin(payload),
    onSuccess: (data) => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng nhập thành công.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
      localStorage.setItem("accessToken", data.accessToken);
      navigate(CUSTOMER_ROUTER_PATH.HOME);
    },
    onError: (error) => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng nhập thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });

  const doLoginGoogle = useMutation({
    mutationFn: () => userApi.doGoogleLogin(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng nhập thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });

  const handleLoginGoogle = () => {
    // doLoginGoogle.mutate();
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
  };

  const onFinish = () => {
    const payload: LoginPayload = {
      userName: form.getFieldValue("userName"),
      password: form.getFieldValue("password"),
    };
    loginMutation.mutate(payload);
  };

  const onClickRegister = () => {
    navigate(CUSTOMER_ROUTER_PATH.REGISTER);
  };

  return (
    <div className="login">
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
              name={"userName"}
              formItemProps={{
                className: "login_form-input",
                rules: ValidateLibrary().required,
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Tên người dùng",
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
                onClick: handleLoginGoogle,
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
