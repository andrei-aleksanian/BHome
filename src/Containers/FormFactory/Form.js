import React, {Component} from 'react';
import classes from "./Form.module.css";
import Input from "./FormValidation/InputValidated";
import {Link} from "react-router-dom";
import {logInFailed} from "../../redux/actions/AuthActions";

class Form extends Component {
    state = {
        inputFields: null,
        formIsValid: true,
        formSubmitted: false
    };

    componentDidMount() {
        this.setState({
            inputFields: this.props.inputFields
        });
    }

    validateInputHandler = (inputName, value) => {
        const regex = this.state.inputFields[inputName].validity.regex;

        if (regex){
            return regex.test(value.toLowerCase());
        }else{
            return value.length !== 0;
        }
    };

    isFormValid = (currentInputName= "", thatCurrentValid = false) => {
        let inputFields = Object.keys(this.state.inputFields);
        let formIsValid = true;
        let validityArray = [];
        inputFields.forEach(inputField => {
            // check real time valid if we are updating the form after it has already been submitted
            if (currentInputName === inputField){
                validityArray.push(thatCurrentValid);
            } else {
                validityArray.push(this.state.inputFields[inputField].valid);
            }
        });

        validityArray.forEach(i => {
            if (!i) {
                formIsValid = false;
            }
        });
        return formIsValid;
    };

    onChangeHandler = (e, inputName) => {
        let formIsValid = true;

        let inputFields = {...this.state.inputFields};
        inputFields[inputName].value = e.target.value.trim();
        let valid = this.validateInputHandler(inputName, e.target.value.trim());
        inputFields[inputName].valid = valid;
        inputFields[inputName].touched = true;

        if (this.state.formSubmitted){
            formIsValid = this.isFormValid(inputName, valid);
        }

        this.setState({
            inputFields: {...inputFields},
            formIsValid: formIsValid
        });
    };

    submit = (e) => {
        e.preventDefault();
        const formIsValid = this.isFormValid();
        this.props.onSubmit(e, formIsValid);
        this.setState({
            formSubmitted: true,
            formIsValid: formIsValid
        });
    };

    render(){
        let swappingButton;
        let wrapper_classes = [];
        let logInFailed;
        wrapper_classes.push(classes.Wrapper);

        if(this.props.layout === "in-div"){
            wrapper_classes.push(classes.fullWidth)
        }

        if(this.props.title === "Sign Up"){
            swappingButton = <Link to={"/log-in"}>Already have an account?</Link>
        } else if(this.props.title === "Log In"){
            swappingButton = <Link to={"/sign-up"}>Here first time? Register!</Link>
        } else {
            swappingButton = null;
        }

        let formInvalidMessage;

        if (!this.state.formIsValid){
            formInvalidMessage = <p className={classes.invalidForm}>Please fill in all the fields correctly</p>;
        } else {
            formInvalidMessage = null;
        }

        if (this.props.logInFailed){
            logInFailed = <p className={classes.error}>Login failed, please try again.</p>;
        }else{
            logInFailed = null;
        }

        let formElements = [];
        for (let key in this.state.inputFields){
            formElements.push({
                id: key,
                config: this.state.inputFields[key]
            })
        }

        return (
            <div className={wrapper_classes.join(" ")}>
                <h1>{this.props.title}</h1>
                <form className={classes.form} onSubmit={this.submit}>
                    {formElements.map(el => {
                        return <Input key={el.config.elementConfig.name}
                                      inputType={el.config.inputType}
                                      elementConfig={el.config.elementConfig}
                                      changed={(e)=>{this.onChangeHandler(e, el.id)}}
                                      valid={el.config.valid}
                                      touched={el.config.touched}
                                      value={el.config.value}
                        />;
                    })}
                    <div><button>Submit</button> {formInvalidMessage}</div>
                    {swappingButton} {logInFailed}
                </form>
            </div>
        );
    }
}

export default Form;