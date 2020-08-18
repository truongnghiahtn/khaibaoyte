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
        // if (data.length >= 1) {
        //     this.setState(
        //         {
        //             validCheckBox: true,
        //         },
        //         () => {
        //             this.formValid();
        //         }
        //     );
        // } else {
        //     this.setState(
        //         {
        //             validCheckBox: false,
        //         },
        //         () => {
        //             this.formValid();
        //         }
        //     );
        // }
        console.log(data)
    };


    render() {
        return (
            <div>
                {this.renderUser()}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { this.props.page(2) }}
                    className="mr-2"
                >
                    Quay lại
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                // disabled={!this.state.valid}
                >
                    submit
          </Button>
            </div>
        );
    }
}
