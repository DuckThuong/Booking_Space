import { Button, Form, FormItemProps, Input, InputRef, Modal } from "antd";
import { NamePath } from "antd/es/form/interface";
import { PasswordProps } from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import { InputProps } from "rc-input";
import { ReactNode, useState } from "react";
import { SvgSearch } from "../../@svg/SvgSearch";
import "./formLinkInput.scss";

type Props = {
  name: NamePath;
  label?: string | ReactNode;
  formItemProps?: FormItemProps;
  inputProps?:
    | (InputProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | (PasswordProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | undefined;
  isShowIcon?: boolean;
};

export const FormLinkInput: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, inputProps, isShowIcon } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkValue, setLinkValue] = useState("");

  const showModal = () => {
    setLinkText("");
    setLinkValue("");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLinkValue(linkText);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setLinkText("");
    setIsModalOpen(false);
  };

  const handleGetFromInput = () => {
    setLinkText("");
    setLinkValue("");
  };

  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`form__input-search ${formItemProps?.className ?? ""} ${
        inputProps?.disabled ? "form__input-search-read-only" : ""
      }`}
    >
      <Input
        ref={inputProps?.ref}
        autoComplete="off"
        value={linkValue}
        maxLength={255}
        {...inputProps}
        prefix={isShowIcon ? <SvgSearch /> : undefined}
      />
      <Button
        onClick={showModal}
        icon={
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/link--v1.png"
            alt="link--v1"
          />
        }
      />
      <Button
        onClick={handleGetFromInput}
        icon={
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/wired/64/link--v1.png"
            alt="link--v1"
          />
        }
      />
      <Modal
        title="Nhập thông tin."
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          placeholder="Nhập thông tin bạn muốn."
          onChange={(e) => setLinkText(e.target.value)}
        />
      </Modal>
    </Form.Item>
  );
};
