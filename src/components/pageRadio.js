import React, { Component } from 'react';
import RadioButton from "./RadioButton";
import { Button } from "@material-ui/core";

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
            <RadioButton key={index} dataradio={this.Radio} data={item} />
        ));
    };
    Radio = (data) => {
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
    };

    checktext = () => {
        let valid

        if (this.props.cauHoi.length === this.state.noiDungCauHoi.length) {
            valid = true
        }
        else {
            valid = false
        }
        this.setState({
            valid
        }, () => console.log(this.state))

    }

    render() {
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { this.props.page(1) }}
                    className="mr-2"
                >
                    Quay lại
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.valid}
                    onClick={() => { this.props.page(3) }}
                >
                    Tiếp
          </Button>

            </div>
        );
    }
}
