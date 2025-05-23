import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { SvgDone } from "../../@svg/Icon/Done/SvgDone";
import { SvgGoogle } from "../../@svg/Icon/Google/SvgGoogle";
import { SvgRegister } from "../../@svg/Icon/SvgRegister";
import { userApi } from "../../api/api";
import { LoginPayload } from "../../api/itemApi";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import "./login.scss";
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

  const doLoginGoogle = useMutation({
    mutationFn: () => userApi.doGoogleLogin(),
    onSuccess: (data) => {
      if (data && typeof data === "string") {
        window.location.href = data;
      } else {
        notification.open({
          message: "Thông báo!",
          description: "Đăng nhập không thành công.",
          placement: "topRight",
          showProgress: true,
          style: {
            backgroundColor: "#ffffff",
            borderLeft: "4px solid #007bff",
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
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

  const doLogin = useMutation({
    mutationFn: (payload: LoginPayload) => userApi.doLogin(payload),
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        notification.open({
          message: "Thông báo!",
          description: "Đăng nhập thành công.",
          placement: "topRight",
          showProgress: true,
          style: {
            backgroundColor: "#ffffff",
            borderLeft: "4px solid #007bff",
          },
        });
        navigate(CUSTOMER_ROUTER_PATH.HOME);
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      notification.open({
        message: "Thông báo!",
        description:
          error?.response?.data?.description || "Đăng nhập thất bại.",
        placement: "topRight",
        showProgress: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });

  const handleLoginGoogle = () => {
    doLoginGoogle.mutate();
  };

  const onFinish = async () => {
    const payload: LoginPayload = {
      userName: form.getFieldValue("userName"),
      password: form.getFieldValue("password"),
    };
    doLogin.mutate(payload);
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
                loading: doLogin.isPending,
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
                loading: doLoginGoogle.isPending,
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
