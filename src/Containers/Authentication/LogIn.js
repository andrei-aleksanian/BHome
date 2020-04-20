import React, {Component, Fragment} from 'react';
import Form from "../FormFactory/Form";
import {connect} from 'react-redux';
import actions from "../../redux/actions/actions";
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';

class LogIn extends Component {
    state = {
        inputFields: {
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
        },
    };

    loginHandler = (e, isFormValid) => {

        if (isFormValid){
            this.props.sendLogIn(this.state.inputFields.email.value, this.state.inputFields.password.value);
        }

    };

    componentDidMount() {
        this.props.resetAuth();
    }

    render(){
        let out;
        if (this.props.error) {
            out =
            <Fragment>
                <Form onSubmit={this.loginHandler} inputFields={this.state.inputFields} title="Log In" logInFailed={this.props.error}/>
            </Fragment>;
        } else if (this.props.loading && !this.props.logInSuccess) {
            out = <LoadingSpinner />
        } else if (!this.props.loading && this.props.logInSuccess){
            out = <h2>redirecting...</h2>;
        } else {
            out = <Form onSubmit={this.loginHandler} inputFields={this.state.inputFields} title="Log In"/>;
        }

        return (
            out
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendLogIn: (email, password) => dispatch(actions.AuthActions.logIn(email, password)),
        resetAuth: () => dispatch(actions.AuthActions.resetAuth())
    };
};

const mapStateToProps = state => {
    return {
        error: state.AuthReducer.error,
        loading: state.AuthReducer.loading,
        logInSuccess: state.AuthReducer.logInSuccess,
        data: state.AuthReducer.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);