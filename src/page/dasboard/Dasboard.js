import React, { Component, Fragment } from 'react';
import { Select, Input, MenuItem, Button } from "@material-ui/core";
import PageTitleArea from "../../components/PageTitleArea";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Chude from "./chude";
import Template from "./template"
import Cauhoi from "./cauHoi"
import CauTraLoi from "./cauTraLoi"

export default class dasboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chuDe: [],
            template: [],
            chuDeSelected: -1,
            templateSelected: -1,
            CauHoi: [],
            CauTraLoi: []
        };
    }

    componentDidMount() {
        this.getChuDe()
    }
    getChuDe = () => {
        Axios({
            method: "GET",
            url: "http://localhost:50663/api/ApiChuDe",
        })
            .then((result) => {
                console.log(result.data)
                this.setState({
                    chuDe: result.data
                }, () => { console.log(this.state.chuDe) })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getTemplate = (id) => {
        Axios({
            method: "GET",
            url: `http://localhost:50663/api/Templates/${id}`,
        })
            .then((result) => {
                this.setState({
                    template: result.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getCauHoi = (id) => {
        Axios({
            method: "GET",
            url: `http://localhost:50663/api/CauHoi/${id}`,
        })
            .then((result) => {
                console.log(result.data)
                this.setState({
                    CauHoi: result.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getCauTraLoi = (id) => {
        Axios({
            method: "GET",
            url: `http://localhost:50663/api/ApiTemplate_4/${id}`,
        })
            .then((result) => {
                console.log(result.data)
                this.setState({
                    CauTraLoi: result.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }


    renderChuDe = () => {
        return this.state.chuDe.map((item, index) => (
            <MenuItem key={index} value={item.IDChuDe}>
                <em>{item.TenChuDe}</em>
            </MenuItem>
        ));
    };
    renderTemplate = () => {
        return this.state.template
            .map((item, index) => (
                <MenuItem key={index} value={item.IDTemplate}>
                    <em>{item.TenTemplate}</em>
                </MenuItem>
            ));
    };
    onChangeChuDe = (e) => {
        this.setState({
            chuDeSelected: e.target.value,
            templateSelected: -1,
        }, () => {
            this.getTemplate(e.target.value);
            this.getCauTraLoi(e.target.value);
        });


    };
    onChangeTemplate = (e) => {
        this.setState({
            templateSelected: e.target.value,
        }, () => {
            this.getCauHoi(e.target.value)

        });

    };

    render() {
        return (
            <Fragment>
                <div className="tp-content">
                    <div className="tp-cotent__title">Lựa chọn form</div>
                    <div className="input-group chude-temp">
                        <div className="row ">
                            <div className="col-6">
                                <Select
                                    input={<Input />}
                                    value={this.state.chuDeSelected}
                                    onChange={this.onChangeChuDe}
                                >
                                    <MenuItem value={-1}>
                                        <em>Vui lòng chọn chủ đề</em>
                                    </MenuItem>
                                    {this.renderChuDe()}
                                </Select>
                            </div>
                            <div className="col-6">
                                <Select
                                    input={<Input />}
                                    value={this.state.templateSelected}
                                    onChange={this.onChangeTemplate}
                                    disabled={this.state.chuDeSelected === -1 ? true : false}
                                >
                                    <MenuItem disabled value={-1}>
                                        <em>Vui lòng chọn Template</em>
                                    </MenuItem>
                                    {this.renderTemplate()}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.templateSelected != -1 ? "vi" : "d-none"}>
                    <div className="Dasboard row">
                        <Chude data={this.state.chuDe} />
                        <Template data={this.state.template} />
                        <Cauhoi data={this.state.CauHoi} />
                        <CauTraLoi data={this.state.CauTraLoi} title="Hoten" />
                        <CauTraLoi data={this.state.CauTraLoi} title="MSNV" />
                        <CauTraLoi data={this.state.CauTraLoi} title="Email" />
                    </div>
                </div>

            </Fragment>
        );
    }
}
