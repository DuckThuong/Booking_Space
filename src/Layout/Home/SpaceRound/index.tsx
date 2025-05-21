import { Col, Image, Row } from "antd";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import FormWrap from "../../../Components/Form/FormWrap";
import "./spaceRound.scss";
import ImageOverlayLayout from "../HomeComponent/ImageLayout";
export const SpaceRound = () => {
  return (
    <div className="space">
      <FormWrap className="space_form">
        <Row className="space_form-row">
          <Col span={12} className="space_form-col">
            <div className="space_col-left">
              <h3 className="space_col-left-title">
                Dễ dàng tiếp cận tới những không gian tiện nghi, lý tưởng dành
                cho công việc của bạn.
              </h3>
              <p className="space_col-left-description">
                Lựa chọn từ hàng trăm địa điểm làm việc chuyên nghiệp, đầy đủ
                tiện nghi — từ văn phòng riêng, chỗ ngồi linh hoạt đến phòng họp
                theo giờ.
              </p>
              <FormInputSearch
                name={"search"}
                isShowIcon
                formItemProps={{
                  className: "space_col-left-search",
                }}
                inputProps={{ placeholder: "Tìm không gian làm việc gần đây." }}
              />
            </div>
          </Col>
          <Col span={12} className="space_form-col-right">
            <ImageOverlayLayout />
          </Col>
        </Row>
      </FormWrap>
    </div>
  );
};
