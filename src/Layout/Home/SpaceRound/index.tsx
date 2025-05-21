import { Button, Col, Image, Row } from "antd";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import FormWrap from "../../../Components/Form/FormWrap";
import "./spaceRound.scss";
import ImageOverlayLayout from "../HomeComponent/ImageLayout";
import ReactPlayer from "react-player";

export const SpaceRound = () => {
  return (
    <div className="space">
      <FormWrap className="space_form">
        <Row className="space_form-row">
          <Col span={12} className="space_form-col">
            <div className="space_col-left">
              <h3 className="space_col-left-title">
                Khám phá không gian làm việc hiện đại, tiện nghi phù hợp với nhu
                cầu của bạn.
              </h3>
              <p className="space_col-left-description">
                Lựa chọn từ hàng trăm địa điểm làm việc chuyên nghiệp với đầy đủ
                tiện nghi — từ văn phòng riêng, không gian làm việc linh hoạt
                đến phòng họp theo giờ.
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

        <Row className="section-1">
          <h3 className="section-1-left-title">
            Quản lý không gian làm việc thông minh và hiệu quả.
          </h3>
          <p className="section-1-left-description">
            Với Booking Space, bạn sẽ được cung cấp những thông tin chi tiết
            giúp tối ưu hóa không gian làm việc, điều chỉnh linh hoạt theo thời
            gian thực để đáp ứng nhu cầu và quy mô của nhóm.
          </p>
          <div className="section-1_video">
            <ReactPlayer
              url="https://youtu.be/vOWIJHOTw3I"
              width="100%"
              height="550px"
              controls
              muted
              loop
              playsinline
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 1,
                  },
                },
              }}
            />
          </div>
        </Row>

        <Row className="section-2">
          <Col span={12} className="section-1-col">
            <div className="section-2-left">
              <span>KHÔNG GIAN LÀM VIỆC CHUYÊN NGHIỆP</span>
              <h3 className="section-2-left-title">
                Đa dạng giải pháp không gian làm việc hiện đại.
              </h3>
              <p className="section-2-left-description">
                Tùy chỉnh linh hoạt diện tích văn phòng theo nhu cầu kinh doanh.
                Booking Space mang đến cho bạn mạng lưới rộng lớn các không gian
                làm việc chuyên nghiệp — cho phép quản lý và đặt chỗ ngay lập
                tức cho trụ sở chính, trung tâm chuyên dụng và chi nhánh từ một
                nền tảng thống nhất.
              </p>
              <div className="section-2-button">
                <Col span={12}>
                  <Button className="section-2-button-find">
                    Tìm không gian
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className="section-2-button-detail">
                    Tìm hiểu thêm
                  </Button>
                </Col>
              </div>
            </div>
          </Col>
          <Col span={12} className="section-2-col">
            <Image
              className="main-image"
              preview={false}
              src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/column-chart-example.svg"
            />
          </Col>
        </Row>

        <Row className="section-3">
          <Col span={12} className="section-3-col">
            <Image
              className="main-image"
              preview={false}
              src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/column-chart-example.svg"
            />
          </Col>
          <Col span={12} className="section-3-col">
            <div className="section-3-left">
              <span>QUẢN LÝ TÀI SẢN THÔNG MINH</span>
              <h3 className="section-3-left-title">
                Tối ưu hóa không gian làm việc với công nghệ AI.
              </h3>
              <p className="section-3-left-description">
                Hệ thống quản lý thông minh của chúng tôi tích hợp AI và phân
                tích dữ liệu thời gian thực, giúp các nhà quản lý đánh giá hiệu
                quả các mô hình văn phòng linh hoạt, đảm bảo tối ưu hiệu suất và
                chi phí. Tối ưu hóa từng mét vuông không gian — với độ chính xác
                và khách quan tuyệt đối.
              </p>
              <div className="section-2-button">
                <Col span={12}>
                  <Button className="section-2-button-find">
                    Quản lý không gian của tôi
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className="section-2-button-detail">
                    Tìm hiểu thêm
                  </Button>
                </Col>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="section-4">
          <Col span={12} className="section-4-col">
            <div className="section-4-left">
              <span>GIẢI PHÁP CỘNG TÁC TOÀN DIỆN</span>
              <h3 className="section-4-left-title">
                Kết nối nhóm làm việc. Tối ưu hóa quy trình.
              </h3>
              <p className="section-4-left-description">
                Nâng cao hiệu quả cộng tác trực tiếp. Team Connect giúp bạn dễ
                dàng theo dõi vị trí làm việc của đồng nghiệp và đặt chỗ không
                gian phù hợp — tích hợp trực tiếp với Slack và Microsoft Teams.
                Giải pháp đơn giản, liền mạch được thiết kế cho phương thức làm
                việc hiện đại của các nhóm.
              </p>
            </div>
          </Col>

          <Col span={12} className="section-4-col">
            <Image
              className="main-image"
              preview={false}
              src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/column-chart-example.svg"
            />
          </Col>
        </Row>
      </FormWrap>
    </div>
  );
};
