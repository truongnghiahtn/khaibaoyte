
import React, { Component, Fragment } from 'react';
import Axios from "axios";
import PageTextBox from "../../components/pageTextBox";
import PageRadio from "../../components/pageRadio";
import PageCheckout from "../../components/pageCheckout";
import { map } from 'jquery';
export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cauHoiText: [],
      cauHoiRadio: [],
      cauHoiCheck: [],
      indexPage: 1,
      noiDungText: [],
      noiDungRadio: [],
      values: {
        HoTen: "",
        MSNV: "",
        Email: "",
        IDChuDe: "",
        IDTemplate: "",
        CauTraLoi_ChiTiet: []
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
          }, () => { console.log(this.state) })
        })
        .catch((err) => {
          console.log(err);
        });
    }


  }

  indexPage = (data) => {
    this.setState({
      indexPage: data
    }, () => { console.log(this.state.indexPage) })
  }
  renderHtmlText = () => {
    return (
      <div className={this.state.indexPage === 1 ? "vi" : "d-none"}>
        <PageTextBox cauHoi={this.state.cauHoiText} page={this.indexPage} submitText={this.dataText} />
      </div>
    )

  }
  dataText = (data) => {
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
      }, () => { console.log(this.state.values) })
    }
  }
  renderHtmlRadio = () => {
    return (
      <div className={this.state.indexPage === 2 ? "vi" : "d-none"}>
        <PageRadio cauHoi={this.state.cauHoiRadio} page={this.indexPage} submitRadio={this.dataRadio} />
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
    }, () => { console.log(this.state.values) })
  }
  renderHtmlCheck = () => {
    return (
      <div className={this.state.indexPage === 3 ? "vi" : "d-none"}>
        <PageCheckout cauHoi={this.state.cauHoiCheck} page={this.indexPage} submitCheck={this.dataCheck} />
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
    }, () => { this.postData(this.state.values) })
  }

  postData = (data) => {
    Axios({
      method: "POST",
      url: "http://localhost:50663/api/ApiCauTraLoi",
      data

    })
      .then((result) => {
        console.log(result)
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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



  render() {
    return (
      <Fragment>
        {this.renderPageTitle()}

        {this.renderHtmlText()}
        {this.renderHtmlRadio()}
        {this.renderHtmlCheck()}
      </Fragment>
    );
  }
}

