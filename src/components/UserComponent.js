import React, { Fragment, PureComponent } from "react";
import InputText from "./InputText";
import { Button } from "@material-ui/core";

export default class UserComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoTen: "",
      maNV: "",
      email: "",
      valid: false,
    };
  }
  renderUser = () => {
    return [
      {
        id: 0,
        tieuDe: "Họ và tên",
        loaiCauHoi: "text",
        required: true,
      },
      {
        id: 1,
        tieuDe: "Mã số nhân viên",
        loaiCauHoi: "text",
        required: true,
      },
      {
        id: 2,
        tieuDe: "Địa chỉ email",
        loaiCauHoi: "text",
        required: true,
      },
    ].map((item, index) => (
      <InputText key={index} datatext={this.text} data={item} />
    ));
  };
  text = (data) => {
    switch (data.id) {
      case 0:
        this.setState(() => ({
          hoTen: data.text,
          valid: !!data.text && !!this.state.maNV && !!this.state.email,
        }));
        break;
      case 1:
        this.setState(() => ({
          maNV: data.text,
          valid: !!this.state.hoTen && !!data.text && !!this.state.email,
        }));
        break;
      case 2:
        this.setState(() => ({
          email: data.text,
          valid: !!this.state.hoTen && !!this.state.maNV && !!data.text,
        }));
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <Fragment>
        <div className="img-qr">
          <img
            src="https://lh5.googleusercontent.com/y_2GPk5lNwN82mpPX460dOWdhn7cpFSt7ARAoDILStMeQaAz4N0qf8duVEOz1hQ-foXCQztxGT3o553t7wDtVp55s9CGkTuNoqx3ltW1OQc-sacBs7BvF4kERAyw=w1311"
            alt=""
          />
        </div>
        {this.renderUser()}
        <Button
          variant="contained"
          color="primary"
          disabled={!this.state.valid}
        >
          Tiếp
        </Button>
      </Fragment>
    );
  }
}
