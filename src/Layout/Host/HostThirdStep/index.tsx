import { FC, useState } from "react";
import { Button, Form, Upload } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import { CreateVenueEnum } from "../../../api/constants";
import RowWrap from "../../../Components/RowWrap";
import ColWrap from "../../../Components/ColWrap";
import { PlusOutlined } from "@ant-design/icons";
import { FormInput } from "../../../Components/Form/FormInput";
import { UploadProps } from "antd/lib";
import { RcFile } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";

interface ThirdStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

export const HostThirdStep: FC<ThirdStepProps> = ({ onNext, data }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>();

  const handleFinish = (formData: any) => {
    onNext({
      ...data,
      companyName: formData.companyName,
      companyDescription: formData.companyDescription,
    });
  };

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
