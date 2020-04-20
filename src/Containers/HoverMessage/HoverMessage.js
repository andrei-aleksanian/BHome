import React, {Component, Fragment} from 'react';
import classes from './HoverMessage.module.css'
import CheckoutButton from "../../Components/UI/Buttons/CheckoutButton/CheckoutButton";
import Backdrop from "../../Components/UI/Backdrop/Backdrop";
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";
import axiosOrders from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import actions from '../../redux/actions/actions';
import Form from "../FormFactory/Form";
import {withRouter} from "react-router";

class HoverMessage extends Component{
    // my humongous state, including the input forms data
    state={
        orderForm: {
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
        },
        checkoutStarted: false
    };

    message = null;

    componentDidMount() {
        this.props.reset_pushed_state();
    }

    processOrderHandler = (e, formIsValid) => {
        if (formIsValid){
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                additionalInfo: this.state.orderForm.additionalInfo.value,
                userId: this.props.userId
            };

            this.setState({
                checkoutStarted: false,
            });

            this.props.started_pushing_order();
            this.props.push_order(order, this.props.token, this.props.userId);
        } else {
            this.props.error_pushing_order();
        }

    };

    proceedToFormHandler = () => {
        this.setState({
            checkoutStarted: true
        });
    };

    redirectToSignIn = () => {
        this.props.history.push("/log-in");
    };

    render(){
        if (this.props.errorMessage ) {
            this.message =
                <Fragment>
                    <p>{this.props.errorMessage}</p>
                    <CheckoutButton clicked={this.props.clicked} text={"Ok :("}/>
                </Fragment>

        }else if(this.props.token === null){
            this.message =
                <Fragment>
                    <p>Please sign in first</p>
                    <CheckoutButton clicked={this.redirectToSignIn} text={"Sign In"}/>
                </Fragment>
        }else if (this.state.checkoutStarted){
            this.message = <Form onSubmit={this.processOrderHandler} layout="in-div" inputFields={this.state.orderForm} title="Anything special?" />;

        }else if (!this.props.loading && this.props.orderFinished){
            this.message =
                <Fragment>
                    <p>Order Confirmed!</p>
                    <CheckoutButton clicked={this.props.clicked} text={"Ok!"}/>
                </Fragment>

        } else if (this.props.loading){
            this.message = <LoadingSpinner/>;
        }else{
            const summaryList = Object.keys(this.props.ingredients).map(ing => {
                return <li key={ing}>{ing}: {this.props.ingredients[ing]}</li>
            });
            this.message =
                <Fragment>
                    <div className={classes.summaryList}>
                        <h2>Order summary:</h2>
                        <ul>
                            {summaryList}
                        </ul>
                        <div className={classes.total}>Total: £{this.props.totalPrice.toFixed(2)}</div>
                    </div>
                    <CheckoutButton clicked={this.proceedToFormHandler} text={"Buy"}/>
                </Fragment>;
        }

        return (
            <Fragment>
                <Backdrop clicked={this.props.clicked}/>
                <div className={classes.HoverMessage}>
                    {this.message}
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.BurgerBuilder.ingredients,
        totalPrice: state.BurgerBuilder.totalPrice,
        loading: state.FormProcessing.loading,
        orderFinished: state.FormProcessing.orderFinished,
        token: state.AuthReducer.token,
        userId: state.AuthReducer.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        push_order: (order, token) => dispatch(actions.FormProcessingActions.push_order(order, token)),
        started_pushing_order: () => dispatch(actions.FormProcessingActions.started_pushing_order()),
        error_pushing_order: () => dispatch(actions.FormProcessingActions.error_pushing_order()),
        reset_pushed_state: () => dispatch(actions.FormProcessingActions.reset_pushed_state())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(HoverMessage, axiosOrders)));
