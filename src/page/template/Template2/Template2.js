import React, { Component } from 'react';
import Input from "../../../components/InputText"

export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: "",
                msnv: "",
                email: "",
            }
        }
    }


    handleOnchange = () => {

    }

    render() {
        return (
            <div>
                <form>

                    <button type="submit" className="btn btn-info"> </button>
                </form>
            </div>
        );
    }
}
