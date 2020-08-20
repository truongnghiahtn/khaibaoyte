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



        }
    }

    renderUser = () => {
        return this.props.cauHoi.map((item, index) => (
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


    next = () => {
        this.props.submitText(this.state.noiDungCauHoi)
        this.props.next(3);
    }
    submit = () => {
        this.props.postdata(this.state.noiDungCauHoi)
    }
    render() {
        console.log(this.props.endpage, "haha")
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { this.props.prve(1) }}
                    className="mr-2"
                >
                    Quay lại
          </Button>

                {this.props.endpage === 2 ?
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.valid}
                        onClick={this.submit}
                    >

                        Submit
          </Button> :
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.valid}
                        onClick={this.next}
                    >
                        Tiếp
          </Button>}
            </div>

        );
    }
}
