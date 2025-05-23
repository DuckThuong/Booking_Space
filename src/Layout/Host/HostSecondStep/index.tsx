import { FC, useEffect, useState } from "react";
import { Button, Upload, Form } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/es/upload";
import { FormInput } from "../../../Components/Form/FormInput";
import ColWrap from "../../../Components/ColWrap";
import { CreateVenueEnum } from "../../../api/itemApi";
import { useUser } from "../../../api/useHook";
import { faPray } from "@fortawesome/free-solid-svg-icons";
import { convertImagesToBase64 } from "../../../api/authApi";

interface SecondStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

export const HostSecondStep: FC<SecondStepProps> = ({ onNext, data }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const user = useUser();

  useEffect(() => {
    if (user) {
      form.setFieldValue("fullName", user.fullName);
      form.setFieldValue("phone", user.phoneNumber);
    }
  }, [user]);

  const handleFinish = async (formData: any) => {
    if (!image) return;
    const base64Image = await convertImagesToBase64([image]);
    onNext({
      ...data,
      UserAvatar: base64Image[0],
      PhoneNumber: form.getFieldValue("phone"),
    });
  };

  const handleUpload: UploadProps["beforeUpload"] = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    return false;
  };
  return (
    <div className="step_second">
      <FormWrap
        form={form}
        className="step_second__content"
        onFinish={handleFinish}
      >
        <RowWrap className="step_second__content-text">
          <h1 className="step_second__content-title">
            Thông tin cá nhân cơ bản
          </h1>
          <p className="step_second__content-desc">
            Hãy điền các thông tin cơ bản của bạn
          </p>
        </RowWrap>

        <RowWrap className="step_second__form-row">
          <ColWrap colProps={{ span: 8 }} className="step_second__form-col">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              maxCount={1}
              beforeUpload={handleUpload}
            >
              {preview ? (
                <img src={preview} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh đại diện</div>
                </div>
              )}
            </Upload>
          </ColWrap>
          <ColWrap colProps={{ span: 12 }} className="step_second__form-col">
            <div>
              <p className="register_label">Họ và tên</p>
              <FormInput
                name="fullName"
                formItemProps={{
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên!",
                    },
                  ],
                }}
                inputProps={{
                  placeholder: "Họ tên",
                  maxLength: 255,
                }}
              />
            </div>
            <div>
              <p className="register_label">Số điện thoại</p>
              <FormInput
                name="phone"
                formItemProps={{
                  rules: [
                    {
                      required: true,
                      message: "Nhập số điện thoại của bạn",
                    },
                  ],
                }}
                inputProps={{
                  placeholder: "Số điện thoại",
                  maxLength: 255,
                }}
              />
            </div>
          </ColWrap>
        </RowWrap>

        <RowWrap className="step_second__actions">
          <Button htmlType="submit">Xác nhận</Button>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
