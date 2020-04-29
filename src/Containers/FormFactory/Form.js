import React, {useState, useEffect} from 'react';
import classes from "./Form.module.css";
import Input from "./FormValidation/InputValidated";
import {Link} from "react-router-dom";

const Form = props => {
    const [inputFields, setInputFields] = useState(null);
    const [formIsValid, setFormIsValid] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        setInputFields(props.inputFields);
    }, [props.inputFields]);

    const validateInputHandler = (inputName, value) => {
        const regex = inputFields[inputName].validity.regex;

        if (regex){
            return regex.test(value.toLowerCase());
        }else{
            return value.length !== 0;
        }
    };

    const isFormValid = (currentInputName= "", thatCurrentValid = false) => {
        let localInputFields = Object.keys(inputFields);
        let formIsValid = true;
        let validityArray = [];
        localInputFields.forEach(inputField => {
            // check real time valid if we are updating the form after it has already been submitted
            if (currentInputName === inputField){
                validityArray.push(thatCurrentValid);
            } else {
                validityArray.push(inputFields[inputField].valid);
            }
        });

        validityArray.forEach(i => {
            if (!i) {
                formIsValid = false;
            }
        });
        return formIsValid;
    };

    const onChangeHandler = (e, inputName) => {
        let formIsValid = true;

        let localInputFields = {...inputFields};
        localInputFields[inputName].value = e.target.value.trim();
        let valid = validateInputHandler(inputName, e.target.value.trim());
        localInputFields[inputName].valid = valid;
        localInputFields[inputName].touched = true;

        if (formSubmitted){
            formIsValid = isFormValid(inputName, valid);
        }

        setInputFields({...localInputFields});
        setFormIsValid(formIsValid);
    };

    const submit = (e) => {
        e.preventDefault();
        const formIsValid = isFormValid();
        props.onSubmit(e, formIsValid);

        setFormIsValid(formIsValid);
        setFormSubmitted(true);
    };

    let swappingButton;
    let wrapper_classes = [];
    let logInFailed;
    wrapper_classes.push(classes.Wrapper);

    if(props.layout === "in-div"){
        wrapper_classes.push(classes.fullWidth)
    }

    if(props.title === "Sign Up"){
        swappingButton = <Link to={"/log-in"}>Already have an account?</Link>
    } else if(props.title === "Log In"){
        swappingButton = <Link to={"/sign-up"}>Here first time? Register!</Link>
    } else {
        swappingButton = null;
    }

    let formInvalidMessage;

    if (!formIsValid){
        formInvalidMessage = <p className={classes.invalidForm}>Please fill in all the fields correctly</p>;
    } else {
        formInvalidMessage = null;
    }

    if (props.logInFailed){
        logInFailed = <p className={classes.error}>Login failed, please try again.</p>;
    }else{
        logInFailed = null;
    }

    let formElements = [];
    for (let key in inputFields){
        formElements.push({
            id: key,
            config: inputFields[key]
        })
    }

    return (
        <div className={wrapper_classes.join(" ")}>
            <h1>{props.title}</h1>
            <form className={classes.form} onSubmit={submit}>
                {formElements.map(el => {
                    return <Input key={el.config.elementConfig.name}
                                  inputType={el.config.inputType}
                                  elementConfig={el.config.elementConfig}
                                  changed={(e)=>{onChangeHandler(e, el.id)}}
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
};

export default Form;