import React, { Fragment } from "react";
import UserComponent from "../../components/UserComponent";
import PageTitleArea from "../../components/PageTitleArea";

function UserPage() {
  let title = "Tờ khai báo y tế tự nguyện công ty GSOFT và GOBRANDING";
  let des =
    "Bằng cách khai báo y tế trên ứng dụng NCOVI, mỗi chúng ta đã đóng góp phần công sức vào công cuộc phòng và chống đại dịch cúm Corona, giúp các cơ quan nhà nước, Bộ Y Tế có thể thống kê, kiểm soát tình hình và thực hiện các biện pháp cách ly chính xác và nhanh chóng, trách lây lan. Trước tình hình đại dịch cúm Corona hay Covid-19 đang lây lan ngày một nhanh hơn, chiều 9/3, Bộ Y Tế kết hợp Bộ Thông tin và Truyền thông đã tiến hành mở dịch vụ khai báo y tế trên ứng dụng NCOVI(hay nCoV) và Vietnam Health Declaration hỗ trợ khai báo y tế, nâng cao công tác phòng chống dịch. Các bạn có thể tải app tại 2 địa chỉ:";

  return (
    <Fragment>
      <PageTitleArea title={title} des={des} />
      <UserComponent />
    </Fragment>
  );
}

export default UserPage;
