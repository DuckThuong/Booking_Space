import { Col, Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import { useParams } from "react-router-dom";

export const SpaceDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="space_detail">
      <FormWrap className="space_detail-form">
        <Row className="space_detail-section-1">
          <Col span={12} className="space_detail-section-col"></Col>
          <Col span={12} className="space_detail-section-col"></Col>
        </Row>
        <Row className="space_detail-section-2"></Row>
      </FormWrap>
    </div>
  );
};
