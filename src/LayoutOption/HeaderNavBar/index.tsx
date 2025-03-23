import { Form } from "react-router-dom";
import ColWrap from "../../Components/ColWrap";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import "./headerNavBar.scss";
import { SvgLogo } from "../../@svg/Logo/SvgLogo";
import { useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faPhoneVolume,
  faSquareCaretRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const HeaderNavBar = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className="header">
      <FormWrap layout="horizontal" className="header__form">
        <RowWrap gutter={[16, 16]} className="header__row-first ">
          <ColWrap className="row-first-left" colProps={{ span: 12 }}>
            <div className="header__row-logo">
              <SvgLogo />
            </div>
            <div className={`header__options ${hidden}`}></div>
          </ColWrap>
          <ColWrap className="row-first-right" colProps={{ span: 12 }}>
            {isLogin ? (
              <div>
                <RowWrap className="header__row-login">
                  <ColWrap className="header__row-login-item">
                    <Button className="header__row-button login">
                      Đăng Nhập
                    </Button>
                  </ColWrap>
                  <ColWrap className="header__row-login-item">
                    <Button className="header__row-button register">
                      Đăng kí
                    </Button>
                  </ColWrap>
                </RowWrap>
              </div>
            ) : (
              <div className="right_content">
                <Button className="header__row-contact">
                  <span>
                    <FontAwesomeIcon icon={faPhoneVolume} />
                  </span>
                  <span> +84 0868 472 032 </span>
                </Button>
                <Button className="header__row-contact">
                  <span> Liên hệ với chúng tôi </span>
                  <span>
                    <FontAwesomeIcon icon={faSquareCaretRight} />
                  </span>
                </Button>
                <Button className="header__row-account">
                  <FontAwesomeIcon icon={faUser} />
                  <FontAwesomeIcon icon={faListUl} />
                </Button>
              </div>
            )}
          </ColWrap>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
