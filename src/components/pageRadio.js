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
        })

    }

    submit = () => {
        this.props.submitRadio(this.state.noiDungCauHoi)
        this.props.next(4);
    }

    render() {
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { this.props.prve(2) }}
                    className="mr-2"
                >
                    Quay lại
          </Button>

                {this.props.endpage === 3 ? <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.valid}
                    onClick={this.submit}
                >
                    Submit
          </Button> : <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.valid}
                        onClick={this.submit}
                    >
                        Tiếp
          </Button>}

            </div>
        );
    }
}
