import { FC, useState } from "react";
import { Button, Form, Upload } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import { CreateVenueEnum } from "../../../api/itemApi";
import RowWrap from "../../../Components/RowWrap";
import ColWrap from "../../../Components/ColWrap";
import { PlusOutlined } from "@ant-design/icons";
import { FormInput } from "../../../Components/Form/FormInput";
import { UploadProps } from "antd/lib";
import { RcFile } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import { convertImagesToBase64 } from "../../../api/authApi";

interface ThirdStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

export const HostThirdStep: FC<ThirdStepProps> = ({ onNext, data }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const handleFinish = async (formData: any) => {
    if (!image) return;
    const base64Image = await convertImagesToBase64([image]);
    onNext({
      ...data,
      Logo: base64Image[0],
      Name: formData.companyName,
      Description: formData.companyDescription,
    });
  };

  const handleUpload: UploadProps["beforeUpload"] = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    return false;
  };

  return (
    <FormWrap form={form} className="step_third" onFinish={handleFinish}>
      <RowWrap className="step_third__header">
        <h1 className="step_third__content-title">Thông tin công ty</h1>
        <p className="step_third__content-text">
          Vui lòng cung cấp thông tin về công ty của bạn.
        </p>
      </RowWrap>
      <RowWrap className="step_third__body">
        <ColWrap colProps={{ span: 8 }} className="step_third__body-col">
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
        <ColWrap colProps={{ span: 12 }} className="step_third__body-col">
          <div>
            <p className="register_label">Mô tả</p>
            <FormInput
              name="companyName"
              formItemProps={{
                className: "user_default-input-confirm",
                rules: [
                  {
                    required: true,
                    message: "Tên công ty không được để trống",
                  },
                ],
              }}
              inputProps={{
                placeholder: "Tên công ty",
                maxLength: 255,
              }}
            />
          </div>
          <div>
            <p className="register_label">Mô tả</p>
            <Form.Item name="companyDescription">
              <TextArea placeholder="Mô tả về công ty của bạn" />
            </Form.Item>
          </div>
        </ColWrap>
      </RowWrap>
      <RowWrap className="step_third__actions">
        <Button htmlType="submit">Xác nhận</Button>
      </RowWrap>
    </FormWrap>
  );
};
