import { FC, useState } from "react";
import { Button, Upload, Form } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/es/upload";
import { FormInput } from "../../../Components/Form/FormInput";
import ColWrap from "../../../Components/ColWrap";
import { CreateVenueEnum } from "../../../api/constants";

interface SecondStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

export const HostSecondStep: FC<SecondStepProps> = ({ onNext, data }) => {
  const [infoState, setInfoState] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>();
  const [form] = Form.useForm();

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

  const handleFinish = (formData: any) => {
    onNext({
      ...data,
      userAvatar: imageUrl,
      fullName: formData.fullName,
      phoneNumber: form.getFieldValue("phone"),
    });
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

        <RowWrap className="step_second__form">
          {infoState > 0 ? (
            <RowWrap className="step_second__form-row">
              <ColWrap colProps={{ span: 8 }} className="step_second__form-col">
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
              <ColWrap
                colProps={{ span: 12 }}
                className="step_second__form-col"
              >
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
          ) : (
            <>
              <Button
                onClick={() => {
                  setInfoState(1);
                }}
              >
                Sử dụng thông tin của bạn
              </Button>
              <Button
                onClick={() => {
                  setInfoState(2);
                }}
              >
                Thêm thông tin mới
              </Button>
            </>
          )}
        </RowWrap>

        <RowWrap className="step_second__actions">
          <Button disabled={infoState === 0} htmlType="submit">
            Xác nhận
          </Button>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
