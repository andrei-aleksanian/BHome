import React, {Component} from 'react';
import Form from "../FormFactory/Form";
import {connect} from 'react-redux';
import actions from "../../redux/actions/actions";
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";

class SignUp extends Component{
    state = {
        inputFields: {
            name: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    required: true,
                    placeholder: "Name"
                },
                value: "",
                validity: {
                    regex: /^.{6,30}$/
                },
                valid: false,
                touched: false
            },
            postcode:{
                inputType:"input",
                elementConfig: {
                    type: "text",
                    name: "postcode",
                    required: true,
                    placeholder: "Postcode"
                },
                value:"",
                validity:{
                    regex: /gir[ ]?0aa|((ab|al|b|ba|bb|bd|bh|bl|bn|br|bs|bt|ca|cb|cf|ch|cm|co|cr|ct|cv|cw|da|dd|de|dg|dh|dl|dn|dt|dy|e|ec|eh|en|ex|fk|fy|g|gl|gy|gu|ha|hd|hg|hp|hr|hs|hu|hx|ig|im|ip|iv|je|ka|kt|kw|ky|l|la|ld|le|ll|ln|ls|lu|m|me|mk|ml|n|ne|ng|nn|np|nr|nw|ol|ox|pa|pe|ph|pl|po|pr|rg|rh|rm|s|sa|se|sg|sk|sl|sm|sn|so|sp|sr|ss|st|sw|sy|ta|td|tf|tn|tq|tr|ts|tw|ub|w|wa|wc|wd|wf|wn|wr|ws|wv|yo|ze)(\d[\da-z]?[ ]?\d[abd-hjln-uw-z]{2}))|bfpo[ ]?\d{1,4}/
                },
                valid:false,
                touched: false
            },
            street:{
                inputType:"input",
                elementConfig: {
                    type: "text",
                    name: "street",
                    required: true,
                    placeholder: "Street"
                },
                value:"",
                validity:{
                    regex: 0
                },
                valid:false,
                touched: false
            },
            house:{
                inputType:"input",
                elementConfig: {
                    type: "text",
                    name: "house",
                    required: true,
                    placeholder: "House number"
                },
                value:"",
                validity:{
                    regex: 0
                },
                valid:false,
                touched: false
            },
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

    signUpHandler = (e, isFormValid) => {
        const userData = {
            name: this.state.inputFields.name.value,
            address: {
                house: this.state.inputFields.house.value,
                postCode: this.state.inputFields.postcode.value,
                street: this.state.inputFields.street.value
            }
        };

        const email = this.state.inputFields.email.value;
        const password = this.state.inputFields.password.value;

        if (isFormValid) {
            this.props.sendSignUp(email, password, userData);
        }
    };


    render(){
        let out;
        if (this.props.error) {
            out = <Form onSubmit={this.signUpHandler} inputFields={this.state.inputFields} title="Sign Up" logInFailed={this.props.error}/>;
        } else if (this.props.loading && !this.props.logInSuccess) {
            out = <LoadingSpinner />
        } else if (!this.props.loading && this.props.logInSuccess){
            out = <h2>redirecting...</h2>;
        } else {
            out = <Form onSubmit={this.signUpHandler} inputFields={this.state.inputFields} title="Sign Up"/>;
        }

        return (
            out
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sendSignUp: (email, password, userData) => dispatch(actions.AuthActions.SignUp(email, password, userData)),
    };
};

const mapStateToProps = state => {
    return {
        error: state.AuthReducer.error,
        loading: state.AuthReducer.loading,
        logInSuccess: state.AuthReducer.logInSuccess,
        token: state.AuthReducer.token,
        userId: state.AuthReducer.userId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);