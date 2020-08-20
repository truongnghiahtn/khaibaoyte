import React, { Component } from 'react';
import InputText from "../components/InputText";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noiDungCauHoi: [],
            valid: false,
            loaiCauHoi: [{ name: "HoTen", idName: 0, cauHoi: "Họ và tên" }, { name: "MSNV", idName: 1, cauHoi: "Mã số nhân viên" }, { name: "Email", idName: 2, cauHoi: "Địa chỉ Email" }]


        }
    }

    renderUser = () => {
        return this.state.loaiCauHoi.map((item, index) => (
            <InputText key={index} datatext={this.text} data={item} />
        ));
    };



    text = (data) => {

        let noiDungCauHoiUpdate = this.state.noiDungCauHoi;

        // 
        let index = this.state.noiDungCauHoi.findIndex((item) => {
            return item.IDCauHoi == data.IDCauHoi
        })
        if (index != -1) {
            noiDungCauHoiUpdate[index] = data
        }
        else {
            // post
            noiDungCauHoiUpdate = [...this.state.noiDungCauHoi, data]
        }
        this.setState({
            noiDungCauHoi: noiDungCauHoiUpdate,
        }, () => { this.checktext() })
    }
    checktext = () => {
        let valid
        let index = this.state.noiDungCauHoi.findIndex(item => {
            return item.CauTraLoi === "";
        })



        if (this.props.cauHoi.length === this.state.noiDungCauHoi.length && index === -1) {
            valid = true
        }
        else {
            valid = false
        }
        this.setState({
            valid
        })

    }


    submit = () => {
        this.props.submitText(this.state.noiDungCauHoi)
        this.props.page(2);
    }
    render() {
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.valid}
                    onClick={this.submit}
                >
                    Tiếp
          </Button>
            </div>

        );
    }
}
