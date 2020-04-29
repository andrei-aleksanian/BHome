import React, {useState} from 'react';
import Form from "../FormFactory/Form";
import {useDispatch, useSelector} from 'react-redux';
import actions from "../../redux/actions/actions";
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";

const SignUp = props => {
    const [inputFields, setInputFields] = useState({
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
    });

    // Redux state to props
    const dispatch = useDispatch();
    const sendSignUp = (email, password, userData) => dispatch(actions.AuthActions.SignUp(email, password, userData));

    const error = useSelector(state => state.AuthReducer.error);
    const loading = useSelector(state => state.AuthReducer.loading);
    const logInSuccess = useSelector(state => state.AuthReducer.logInSuccess);

    const signUpHandler = (e, isFormValid) => {
        const userData = {
            name: inputFields.name.value,
            address: {
                house: inputFields.house.value,
                postCode: inputFields.postcode.value,
                street: inputFields.street.value
            }
        };

        const email = inputFields.email.value;
        const password = inputFields.password.value;

        if (isFormValid) {
            sendSignUp(email, password, userData);
        }
    };


    let out;
    if (error) {
        out = <Form onSubmit={signUpHandler} inputFields={inputFields} title="Sign Up" logInFailed={error}/>;
    } else if (loading && !logInSuccess) {
        out = <LoadingSpinner />
    } else if (!loading && logInSuccess){
        out = <h2>redirecting...</h2>;
    } else {
        out = <Form onSubmit={signUpHandler} inputFields={inputFields} title="Sign Up"/>;
    }

    return (
        out
    );
};

export default SignUp;