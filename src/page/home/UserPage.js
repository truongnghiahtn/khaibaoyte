
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
        endpage: null
      }
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
          console.log(result.data)
          // let mangtext = result.data.filter((item) => { return item.DangCauHoi === "TextBox" });
          // console.log(mangtext)
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
        <UserComponent next={this.nextpage} submitUser={this.dataUser} endpage={this.state.endpage} />
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
      }, () => { this.postData(this.state.values, 1) })
    }
  }
  renderHtmlText = () => {
    return (
      <div className={this.state.indexPage === 2 ? "vi" : "d-none"}>
        <PageTextBox cauHoi={this.state.cauHoiText} next={this.nextpage} prve={this.prevpage} submitText={this.dataText} endpage={this.state.endpage} />
      </div>
    )

  }
  dataText = (data) => {
    console.log(data)
    const CauTraLoi_ChiTietUpdate = this.state.values.CauTraLoi_ChiTiet.concat(data);
    this.setState({
      values: {
        ...this.state.values,
        CauTraLoi_ChiTiet: CauTraLoi_ChiTietUpdate
      }
    }, () => { this.postData(this.state.values, 2) })
  }
  renderHtmlRadio = () => {
    return (
      <div className={this.state.indexPage === 3 ? "vi" : "d-none"}>
        <PageRadio cauHoi={this.state.cauHoiRadio} next={this.nextpage} prve={this.prevpage} submitRadio={this.dataRadio} endpage={this.state.endpage} />
      </div>
    )

  }
  dataRadio = (data) => {
    console.log(data)
    const CauTraLoi_ChiTietUpdate = this.state.values.CauTraLoi_ChiTiet.concat(data);
    this.setState({
      values: {
        ...this.state.values,
        CauTraLoi_ChiTiet: CauTraLoi_ChiTietUpdate
      }
    }, () => { this.postData(this.state.values, 3) })
  }
  renderHtmlCheck = () => {
    return (
      <div className={this.state.indexPage === 4 ? "vi" : "d-none"}>
        <PageCheckout cauHoi={this.state.cauHoiCheck} next={this.nextpage} prve={this.prevpage} submitCheck={this.dataCheck} endpage={this.state.endpage} />
      </div>
    )
  }
  dataCheck = (data) => {
    console.log(data)
    const CauTraLoi_ChiTietUpdate = this.state.values.CauTraLoi_ChiTiet.concat(data);
    this.setState({
      values: {
        ...this.state.values,
        CauTraLoi_ChiTiet: CauTraLoi_ChiTietUpdate
      }
    }, () => { this.postData(this.state.values, 4) })
  }

  postData = (data, index) => {
    if (index === this.state.endpage) {
      Axios({
        method: "POST",
        url: "http://localhost:50663/api/ApiCauTraLoi",
        data

      })
        .then((result) => {
          console.log(result)
          // window.location.reload();
          this.props.history.push("Submit")
        })
        .catch((err) => {
          console.log(err);
        });
    }

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

  // indexPage = (data) => {

  //   this.setState({
  //     indexPage: data
  //   }, () => { console.log(this.state.indexPage) })
  // }

  checkCauHoi = () => {
    let mang = this.state.soLoaiCauHoi
    if (this.state.cauHoiText.length != 0) {
      mang.push(2)
    }
    if (this.state.cauHoiRadio.length != 0) {
      mang.push(3)
    }
    if (this.state.cauHoiCheck.length != 0) {
      mang.push(4)
    }
    console.log(mang)
    this.setState({
      soLoaiCauHoi: mang
    }, () => { this.endPage() })
  }
  nextpage = (data) => {
    let flag = 0
    this.state.soLoaiCauHoi.map(item => {
      for (let i = data; i < 5; i++) {
        if (i == item) {
          flag = 1
          this.setState({
            indexPage: i
          })
        }
        if (flag == 1) {
          break;
        }
      }
    })

  }

  prevpage = (data) => {
    let flag = 0
    this.state.soLoaiCauHoi.map(item => {
      for (let i = data; i > 0; i--) {
        if (i == item) {
          flag = 1
          this.setState({
            indexPage: i
          })
        }

      }
    })

  }
  endPage = () => {
    let max = this.state.soLoaiCauHoi.length;
    console.log(this.state.soLoaiCauHoi[max - 1])
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

