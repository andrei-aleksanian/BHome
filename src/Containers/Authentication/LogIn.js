import React, {useState, useEffect, Fragment} from 'react';
import Form from "../FormFactory/Form";
import {useDispatch, useSelector} from 'react-redux';
import actions from "../../redux/actions/actions";
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';

const LogIn = props => {
    // State
    const [inputFields, setInputFields] = useState({
        email: {
            inputType: "input",
            elementConfig: {
                type: "text",
                name: "email",
                required: true,
                placeholder: "Email"
            },
            value: "",
            validity: {
                regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            valid: false,
            touched: false
        },
        password: {
            inputType: "input",
            elementConfig: {
                type: "password",
                name: "password",
                required: true,
                placeholder: "Password"
            },
            value: "",
            validity: {
                regex: /^.{6,20}$/
            },
            valid: false,
            touched: false
        }
    });

    // Redux state to props
    const dispatch = useDispatch();
    const sendLogIn = (email, password) => dispatch(actions.AuthActions.logIn(email, password));
    const resetAuth = () => dispatch(actions.AuthActions.resetAuth());

    const error = useSelector(state => state.AuthReducer.error);
    const loading = useSelector(state => state.AuthReducer.loading);
    const logInSuccess = useSelector(state => state.AuthReducer.logInSuccess);

    useEffect(() => {
        resetAuth();
    }, []);

    const loginHandler = (e, isFormValid) => {
        if (isFormValid){
            sendLogIn(inputFields.email.value, inputFields.password.value);
        }
    };

    let out;
    if (error) {
        out =
        <Fragment>
            <Form onSubmit={loginHandler} inputFields={inputFields} title="Log In" logInFailed={error}/>
        </Fragment>;
    } else if (loading && !logInSuccess) {
        out = <LoadingSpinner />
    } else if (!loading && logInSuccess){
        out = <h2>redirecting...</h2>;
    } else {
        out = <Form onSubmit={loginHandler} inputFields={inputFields} title="Log In"/>;
    }

    return (
        out
    );
};

export default LogIn;