
import React, { Component, Fragment } from 'react';
import Axios from "axios";
import PageTextBox from "../../components/pageTextBox";
import PageRadio from "../../components/pageRadio";
import PageCheckout from "../../components/pageCheckout";
export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cauHoiText: [],
      cauHoiRadio: [],
      cauHoiCheck: [],
      indexPage: 1,
      noiDungText: [],
      noiDungRadio: []
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
        <PageTextBox cauHoi={this.state.cauHoiText} page={this.indexPage} submitText={this.TextBox} noidung={this.state.noiDungText} />
      </div>
    )

  }
  TextBox = (data) => {
    this.setState({
      noiDungText: data
    })
  }
  renderHtmlRadio = () => {
    return (
      <div className={this.state.indexPage === 2 ? "vi" : "d-none"}>
        <PageRadio cauHoi={this.state.cauHoiRadio} page={this.indexPage} />
      </div>
    )

  }
  renderHtmlCheck = () => {
    return (
      <div className={this.state.indexPage === 3 ? "vi" : "d-none"}>
        <PageCheckout cauHoi={this.state.cauHoiCheck} page={this.indexPage} />
      </div>
    )
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

