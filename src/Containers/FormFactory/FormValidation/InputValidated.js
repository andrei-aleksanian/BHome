import React, {Component} from 'react';
import classes from "./InputValidated.module.css";

class InputValidated extends Component{

    render(){
        let inputElement;

        switch (this.props.inputType) {
            case("input"):
                inputElement = <input {...this.props.elementConfig} onChange={this.props.changed} className={this.props.touched ? this.props.valid ? null : classes.invalid : null}/>;
                break;
            case("textarea"):
                inputElement = <textarea {...this.props}/>;
                break;
            default:
                inputElement = <input {...this.props}/>;
        }

        return inputElement;
    }
}

export default InputValidated;