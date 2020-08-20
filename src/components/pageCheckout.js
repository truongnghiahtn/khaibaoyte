import React, { Component } from 'react';
import Checkbox from "./CheckBox"
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
            <Checkbox key={index} datacheck={this.checkbox} data={item} />
        ));
    };
    checkbox = (data) => {
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
        }, () => { this.checkValid() })
    };

    checkValid = () => {
        let valid
        let index = this.state.noiDungCauHoi.findIndex(item => {
            return item.CauTraLoi === "";
        })
        console.log(this.state.noiDungCauHoi)


        if (index === -1) {
            valid = true
        }
        else {
            valid = false
        }
        this.setState({
            valid
        }, () => console.log(this.state.valid))

    }

    submit = () => {
        this.props.submitCheck(this.state.noiDungCauHoi)
    }
    render() {
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { this.props.prve(3) }}
                    className="mr-2"
                >
                    Quay lại
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.valid}
                    onClick={this.submit}
                >
                    submit
          </Button>
            </div>
        );
    }
}
