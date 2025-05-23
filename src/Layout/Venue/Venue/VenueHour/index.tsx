import { Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./venueHour.scss";
import TableWrap from "../../../../Components/TableWrap";

const weekDays = [
  { day: "Thứ 2", key: "monday" },
  { day: "Thứ 3", key: "tuesday" },
  { day: "Thứ 4", key: "wednesday" },
  { day: "Thứ 5", key: "thursday" },
  { day: "Thứ 6", key: "friday" },
  { day: "Thứ 7", key: "saturday" },
  { day: "Chủ nhật", key: "sunday" },
];

const tableHeader = {
  columns: [
    {
      title: "Ngày",
      dataIndex: "day",
      key: "day",
      width: "10%",
      render: (text: string) => text,
    },
  ],
};

export const VenueHour = () => {
  return (
    <div className="venue_hour">
      <FormWrap className="venue_hour-form">
        <Row className="venue_hour-section-1">
          <h1 className="venue_hour-section-1-title">
            Thời gian thuê
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/pastel-glyph/64/information--v1.png"
              alt="information--v1"
              style={{ marginInlineStart: 8 }}
            />
          </h1>
          <p>
            Thiết lập thời gian thuê để bạn có thể chấp nhận thời đặt chỗ của
            khách.
          </p>
        </Row>
        <Row className="venue_hour-section-2">
          <h1 className="venue_hour-section-2-title">Ngày thuê theo tuần</h1>
          <p>
            Những ngày này phải phản ánh thời điểm bạn có nhân viên tại chỗ để
            chào đón khách mới.
          </p>
          <TableWrap
            setSize={() => {}}
            isScroll={true}
            isHidePagination={true}
            tableProps={{
              dataSource: weekDays,
              columns: tableHeader.columns,
              scroll: {
                y: 300,
              },
            }}
          />
        </Row>
      </FormWrap>
    </div>
  );
};
