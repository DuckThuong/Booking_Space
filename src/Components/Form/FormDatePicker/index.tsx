import { DatePicker, DatePickerProps, Form, FormItemProps } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import { SvgDatePicker } from "../../@svg/SvgDatePicker";
import "./datePickerCustom.scss";
import { NamePath } from "antd/es/form/interface";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import localeVi from "antd/es/date-picker/locale/vi_VN";
import localeEn from "antd/es/date-picker/locale/en_US";

type Props = {
  name: NamePath;
  label?: ReactNode;
  datePickerProps?: DatePickerProps;
  datePickerIcon?: ReactNode;
  formItemProps?: FormItemProps;
  locale?: "vi" | "en"; // Hỗ trợ 'vi' (tiếng Việt) và 'en' (tiếng Anh)
};

export const FormDatePicker: React.FC<Props> = ({
  datePickerProps,
  datePickerIcon,
  name,
  label,
  formItemProps,
  locale = "vi",
}) => {
  const [datePickerLocale, setDatePickerLocale] = useState(localeVi);

  useEffect(() => {
    setDatePickerLocale(locale === "en" ? localeEn : localeVi);
  }, [locale]);

  return (
    <div className="form-date-picker__container">
      {label && (
        <label
          htmlFor={String(name)}
          className="p-b-8 form-date-picker__label-container"
        >
          {label}
          {formItemProps?.required ? (
            <span className="form-date-picker__label">*</span>
          ) : (
            ""
          )}
        </label>
      )}
      <Form.Item
        name={name}
        {...formItemProps}
        className={`form-date-picker__item ${formItemProps?.className ?? ""}`}
      >
        <DatePicker
          {...datePickerProps}
          suffixIcon={datePickerIcon ?? <SvgDatePicker />}
          allowClear={false}
          locale={datePickerLocale}
        />
      </Form.Item>
    </div>
  );
};
