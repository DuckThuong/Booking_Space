import { useMutation } from "@tanstack/react-query";
import { Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../api/api";
import { RegisterPayload } from "../../api/itemApi";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import "./register.scss";

export const Register = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onFinish = () => {
    if (!form.getFieldValue("submit")) {
      notification.open({
        message: "Thông báo!",
        description: "Vui lòng xác nhận điều khoản.",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    } else {
      setOpenModal(true);
    }
  };
  const regiterMutation = useMutation({
    mutationFn: (payload: RegisterPayload) =>
      userApi.doCreateUserByUserNameAndPassword(payload),
    onSuccess: () => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng ký tài khoản thành công.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
      navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
    },
    onError: (error: any) => {
      console.log(error);

      notification.open({
        message: "Thông báo!",
        description: error?.response?.data?.description || "Đăng ký thất bại.",
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
  const onModalConfirm = () => {
    const payload: RegisterPayload = {
      userName: form.getFieldValue("userName"),
      fullName: form.getFieldValue("fullName"),
      password: form.getFieldValue("password"),
      email: form.getFieldValue("email"),
    };
    regiterMutation.mutate(payload);
  };

  return (
    <div className="register">
      <FormWrap
        form={form}
        name="forgot"
        layout="vertical"
        className="register_form"
        onFinish={onFinish}
      >
        <h1 className="register_title">Đăng ký</h1>
        <p className="register_sub">Nhập thông tin tài khoản của bạn</p>
        <div className="register_email-input">
          <p className="register_label">Họ và tên</p>
          <FormInput
            name="fullName"
            formItemProps={{
              className: "register_email-input-confirm",
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập họ tên!",
                },
              ],
            }}
            inputProps={{
              placeholder: "Họ tên",
            }}
          />
        </div>
        <div className="register_email-input">
          <p className="register_label">Tên tài khoản</p>
          <FormInput
            name="userName"
            formItemProps={{
              className: "register_email-input-confirm",
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên tài khoản!",
                },
                {
                  min: 6,
                  message: "Tên tài khoản phải có ít nhất 6 ký tự!",
                },
              ],
            }}
            inputProps={{
              placeholder: "Tên tài khoản",
            }}
          />
        </div>

        <div className="register_email-input">
          <p className="register_label">Email</p>
          <FormInput
            name="email"
            formItemProps={{
              className: "register_email-input-confirm",
              rules: ValidateLibrary().email,
            }}
            inputProps={{
              placeholder: "Email@gmail.com",
            }}
          />
        </div>

        <div className="register_email-input">
          <p className="register_label">Mật khẩu</p>
          <FormInput
            name="password"
            formItemProps={{
              className: "register_email-input-confirm",
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              ],
            }}
            isPassword
            inputProps={{
              placeholder: "Mật khẩu",
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
        <div className="register_email-button">
          <FormButtonSubmit
            content="Xác nhận"
            buttonProps={{
              className: "register_email-button-submit",
              type: "primary",
              htmlType: "submit",
            }}
          />
        </div>
        <div className="register_email-link">
          <Link to="/">Quay lại màn đăng nhập</Link>
        </div>
        <Modal
          open={openModal}
          okText="Xác nhận"
          cancelText="Không"
          onCancel={() => {
            setOpenModal(false);
          }}
          onOk={() => {
            onModalConfirm();
            setOpenModal(false);
          }}
          okButtonProps={{ className: "register_modal-ok" }}
          cancelButtonProps={{ className: "register_modal-cancel" }}
        >
          <div className="register_underline">
            <h1 className="register_modal-title">Xác nhận thông tin</h1>
            <p className="register_modal-content">
              Đăng ký tài khoản với {form.getFieldValue("email")}
            </p>
          </div>
        </Modal>
      </FormWrap>
    </div>
  );
};
