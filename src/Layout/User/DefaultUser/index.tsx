import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import ColWrap from "../../../Components/ColWrap";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import { FormDatePicker } from "../../../Components/Form/FormDatePicker";
import { FormInput } from "../../../Components/Form/FormInput";
import { FormSelect } from "../../../Components/Form/FormSelect";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import "./defaultUser.scss";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";

export const DefaultUser = () => {
  const [form] = useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const url = info.file.response?.url;
      if (url) {
        setImageUrl(url);
      }
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = async (file: RcFile) => {
    try {
      const preview = await getBase64(file);
      setImageUrl(preview);
    } catch (error) {
      console.error("Error creating preview:", error);
    }
    return true;
  };

  const onFinish = () => {
    navigate(CUSTOMER_ROUTER_PATH.DEFAULT_USER);
  };

  const genderOptions = [
    {
      label: "Nam",
      value: "0",
    },
    {
      label: "Nữ",
      value: "1",
    },
    {
      label: "Khác",
      value: "3",
    },
  ];
  return (
    <div className="user_default">
      <FormWrap
        form={form}
        name="forgot"
        layout="vertical"
        className="user_default-form"
        onFinish={onFinish}
      >
        <div className="register_underline">
          <h1 className="user_default-title">Thông tin cá nhân</h1>
        </div>
        <RowWrap
          gutter={[16, 16]}
          className="user_default-row register_underline"
        >
          <ColWrap colProps={{ span: 12 }} className="user_default-col">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              maxCount={1}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh đại diện</div>
                </div>
              )}
            </Upload>
          </ColWrap>
          <ColWrap colProps={{ span: 12 }} className="user_default-col">
            <RowWrap className="user_default-row">
              <p className="register_label">Họ và tên</p>
              <FormInput
                name="name"
                formItemProps={{
                  className: "user_default-input-confirm",
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ],
                }}
                inputProps={{
                  placeholder: "Họ và tên",
                  maxLength: 255,
                }}
              />
            </RowWrap>

            <RowWrap gutter={[16, 16]} className="user_default-row-three">
              <ColWrap colProps={{ span: 7 }}>
                <p className="register_label">Giới tính</p>
                <FormSelect
                  name={"gender"}
                  selectProps={{
                    options: genderOptions,
                    placeholder: "Giới tính",
                  }}
                  formItemProps={{
                    className: "user_default-input-confirm",
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn giới tính!",
                      },
                    ],
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 7 }}>
                <p className="register_label">Ngày sinh</p>
                <FormDatePicker
                  name="birthday"
                  datePickerProps={{
                    format: "DD/MM/YYYY",
                    placeholder: "Ngày sinh",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 7 }}>
                <p className="register_label">Số điện thoại</p>
                <FormInput
                  name="phone"
                  formItemProps={{
                    className: "user_default-input-confirm",
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ],
                  }}
                  inputProps={{
                    placeholder: "Số điện thoại",
                    maxLength: 255,
                  }}
                />
              </ColWrap>
            </RowWrap>

            <RowWrap className="user_default-row">
              <p className="register_label">Công ty</p>
              <FormInput
                name="company"
                formItemProps={{
                  className: "user_default-input-confirm",
                }}
                inputProps={{
                  placeholder: "Công ty",
                  maxLength: 255,
                }}
              />
            </RowWrap>

            <RowWrap className="user_default-row">
              <p className="register_label">Địa chỉ công ty</p>
              <FormInput
                name="address"
                formItemProps={{
                  className: "user_default-input-confirm",
                }}
                inputProps={{
                  placeholder: "Địa chỉ công ty",
                  maxLength: 255,
                }}
              />
            </RowWrap>
          </ColWrap>
        </RowWrap>
        <RowWrap gutter={[16, 16]} className="user_default-lastRow">
          <div className="user_default-button">
            <CustomButton
              content={"Hủy bỏ"}
              buttonProps={{
                className: "user_default-button-cancel",
                onClick: () => navigate(CUSTOMER_ROUTER_PATH.LOG_IN),
                type: "default",
                htmlType: "button",
              }}
            ></CustomButton>
          </div>
          <div className="user_default-button">
            <FormButtonSubmit
              content="Xác nhận"
              buttonProps={{
                className: "user_default-button-submit",
                type: "primary",
                htmlType: "submit",
              }}
            />
          </div>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
