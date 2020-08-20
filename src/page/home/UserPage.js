
import React, { Component, Fragment } from 'react';
import Axios from "axios";
import PageTextBox from "../../components/pageTextBox";
import PageRadio from "../../components/pageRadio";
import PageCheckout from "../../components/pageCheckout";
import UserComponent from "../../components/UserComponent";
import { map } from 'jquery';
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cauHoiText: [],
      cauHoiRadio: [],
      cauHoiCheck: [],
      soLoaiCauHoi: [1],
      indexPage: 1,
      values: {
        HoTen: "",
        MSNV: "",
        Email: "",
        IDChuDe: "",
        IDTemplate: "",
        CauTraLoi_ChiTiet: [],
      },
      endpage: null
    }
  }
  componentDidMount() {
    this.getCauHoi();
  }
  getCauHoi = () => {
    if (sessionStorage.getItem("template")) {
      var temPlateLocal = JSON.parse(sessionStorage.getItem("template"));
      Axios({
        method: "GET",
        url: `http://localhost:50663/api/CauHoi/${temPlateLocal.IDTemplate}`,
      })
        .then((result) => {
          this.setState({
            cauHoiText: result.data.filter((item) => { return item.DangCauHoi === "TextBox" }),
            cauHoiRadio: result.data.filter((item) => { return item.DangCauHoi === "RadioBox" }),
            cauHoiCheck: result.data.filter((item) => { return item.DangCauHoi === "CheckBox" }),
          }, () => { this.checkCauHoi() })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  renderHtmlUser = () => {
    return (
      <div className={this.state.indexPage === 1 ? "vi" : "d-none"}>
        <UserComponent next={this.nextpage} submitUser={this.dataUser} postdata={this.postData} endpage={this.state.endpage} />
      </div>
    )
  }
  dataUser = (data) => {
    var hoten, msnv, email;
    if (sessionStorage.getItem("template")) {
      var temPlateLocal = JSON.parse(sessionStorage.getItem("template"));
      var idChuDe = JSON.parse(sessionStorage.getItem("idChuDe"));
      data.map(item => {
        if (item.name === "HoTen") {
          hoten = item.CauTraLoi
        }
        else {
          if (item.name === "MSNV") {
            msnv = item.CauTraLoi
          }
          else {
            email = item.CauTraLoi
          }
        }
      })
      this.setState({
        values: {
          ...this.state.values,
          HoTen: hoten,
          MSNV: msnv,
          Email: email,
          IDTemplate: temPlateLocal.IDTemplate,
          IDChuDe: idChuDe
        }
      }, () => {
        console.log(this.state.endpage)
        if (this.state.endpage == 1) {
          Axios({
            method: "POST",
            url: "http://localhost:50663/api/ApiCauTraLoi",
            data: this.state.values
          })
            .then((result) => {
              console.log(result)
              this.props.history.push("Submit")
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    }
  }
  renderHtmlText = () => {
    return (
      <div className={this.state.indexPage === 2 ? "vi" : "d-none"}>
        <PageTextBox cauHoi={this.state.cauHoiText} next={this.nextpage} prve={this.prevpage} postdata={this.postData} submitText={this.dataValue} endpage={this.state.endpage} />
      </div>
    )
  }
  renderHtmlRadio = () => {
    return (
      <div className={this.state.indexPage === 3 ? "vi" : "d-none"}>
        <PageRadio cauHoi={this.state.cauHoiRadio} next={this.nextpage} prve={this.prevpage} postdata={this.postData} submitRadio={this.dataValue} endpage={this.state.endpage} />
      </div>
    )
  }
  renderHtmlCheck = () => {
    return (
      <div className={this.state.indexPage === 4 ? "vi" : "d-none"}>
        <PageCheckout cauHoi={this.state.cauHoiCheck} next={this.nextpage} prve={this.prevpage} postdata={this.postData} submitCheck={this.dataValue} endpage={this.state.endpage} />
      </div>
    )
  }
  dataValue = (data) => {
    const CauTraLoi_ChiTietUpdate = this.state.values.CauTraLoi_ChiTiet.concat(data);
    this.setState({
      values: {
        ...this.state.values,
        CauTraLoi_ChiTiet: CauTraLoi_ChiTietUpdate
      }
    })
  }
  postData = (data) => {
    const CauTraLoi_ChiTietUpdate = this.state.values.CauTraLoi_ChiTiet.concat(data);
    this.setState({
      values: {
        ...this.state.values,
        CauTraLoi_ChiTiet: CauTraLoi_ChiTietUpdate
      }
    }, () => {
      Axios({
        method: "POST",
        url: "http://localhost:50663/api/ApiCauTraLoi",
        data: this.state.values
      })
        .then((result) => {
          console.log(result)
          this.props.history.push("Submit")
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }
  renderPageTitle = () => {
    if (sessionStorage.getItem("template")) {
      var temPlateLocal = JSON.parse(sessionStorage.getItem("template"));
      return (
        <div

          dangerouslySetInnerHTML={{
            __html: temPlateLocal.Content,
          }}
        ></div>
      )
    }
  }
  checkCauHoi = () => {
    let { soLoaiCauHoi, cauHoiText, cauHoiRadio, cauHoiCheck } = this.state
    if (cauHoiText.length != 0) soLoaiCauHoi.push(2)
    if (cauHoiRadio.length != 0) soLoaiCauHoi.push(3)
    if (cauHoiCheck.length != 0) soLoaiCauHoi.push(4)
    this.setState({
      soLoaiCauHoi
    }, () => { this.endPage() })
  }
  nextpage = (data) => {
    this.setState({
      indexPage: this.state.soLoaiCauHoi
        .find((item) => item >= data),
    });
  }
  prevpage = (data) => {
    this.setState({
      indexPage: this.state.soLoaiCauHoi
        .reverse()
        // đổi chiều phần tử trong mảng
        .find((item) => item <= data),
    });
  }
  endPage = () => {
    let max = this.state.soLoaiCauHoi.length;
    this.setState({
      endpage: this.state.soLoaiCauHoi[max - 1]
    })
  }
  render() {
    return (
      <Fragment>
        {this.renderPageTitle()}
        {this.renderHtmlUser()}
        {this.renderHtmlText()}
        {this.renderHtmlRadio()}
        {this.renderHtmlCheck()}
      </Fragment>
    );
  }
}

