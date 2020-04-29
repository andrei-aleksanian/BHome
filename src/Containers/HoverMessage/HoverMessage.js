import React, {useState, useEffect, Fragment} from 'react';
import classes from './HoverMessage.module.css'
import CheckoutButton from "../../Components/UI/Buttons/CheckoutButton/CheckoutButton";
import Backdrop from "../../Components/UI/Backdrop/Backdrop";
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";
import axiosOrders from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {useSelector, useDispatch} from 'react-redux';
import actions from '../../redux/actions/actions';
import Form from "../FormFactory/Form";
import {withRouter} from "react-router";

const HoverMessage = props => {
    const [orderForm, setOrderForm] = useState({
        additionalInfo:{
            inputType:"input",
            elementConfig: {
                type: "text",
                name: "additionalInfo",
                required: false,
                placeholder: "Additional Info e.g. use back door..."
            },
            value:"",
            validity:{
                regex: 0
            },
            valid:true,
            touched: false
        }
    });
    const [checkoutStarted, setCheckoutStarted] = useState(false);

    const ingredients = useSelector(state => state.BurgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.BurgerBuilder.totalPrice);
    const loading = useSelector(state => state.FormProcessing.loading);
    const orderFinished = useSelector(state => state.FormProcessing.orderFinished);
    const token = useSelector(state => state.AuthReducer.token);
    const userId = useSelector(state => state.AuthReducer.userId);

    const dispatch = useDispatch();
    const push_order = (order, token) => dispatch(actions.FormProcessingActions.push_order(order, token));
    const started_pushing_order = () => dispatch(actions.FormProcessingActions.started_pushing_order());
    const error_pushing_order = () => dispatch(actions.FormProcessingActions.error_pushing_order());
    const reset_pushed_state = () => dispatch(actions.FormProcessingActions.reset_pushed_state());

    useEffect(() => {
        reset_pushed_state();
    }, []);

    let message = null;

    const processOrderHandler = (e, formIsValid) => {
        if (formIsValid){
            const order = {
                ingredients: ingredients,
                price: totalPrice,
                additionalInfo: orderForm.additionalInfo.value,
                userId: userId
            };

            setCheckoutStarted(false);

            started_pushing_order();
            push_order(order, token);
        } else {
            error_pushing_order();
        }
    };

    const proceedToFormHandler = () => {
        setCheckoutStarted(true);
    };

    const redirectToSignIn = () => {
        props.history.push("/log-in");
    };

    if (props.errorMessage ) {
        message =
            <Fragment>
                <p>{props.errorMessage}</p>
                <CheckoutButton clicked={props.clicked} text={"Ok :("}/>
            </Fragment>
    }else if(token === null){
        message =
            <Fragment>
                <p>Please sign in first</p>
                <CheckoutButton clicked={redirectToSignIn} text={"Sign In"}/>
            </Fragment>
    }else if (checkoutStarted){
        message = <Form onSubmit={processOrderHandler} layout="in-div" inputFields={orderForm} title="Anything special?" />;

    }else if (!loading && orderFinished){
        message =
            <Fragment>
                <p>Order Confirmed!</p>
                <CheckoutButton clicked={props.clicked} text={"Ok!"}/>
            </Fragment>

    } else if (loading){
        message = <LoadingSpinner/>;
    }else{
        const summaryList = Object.keys(ingredients).map(ing => {
            return <li key={ing}>{ing}: {ingredients[ing]}</li>
        });
        message =
            <Fragment>
                <div className={classes.summaryList}>
                    <h2>Order summary:</h2>
                    <ul>
                        {summaryList}
                    </ul>
                    <div className={classes.total}>Total: £{totalPrice.toFixed(2)}</div>
                </div>
                <CheckoutButton clicked={proceedToFormHandler} text={"Buy"}/>
            </Fragment>;
    }

    return (
        <Fragment>
            <Backdrop clicked={props.clicked}/>
            <div className={classes.HoverMessage}>
                {message}
            </div>
        </Fragment>
    );
};

export default withRouter(withErrorHandler(HoverMessage, axiosOrders));
