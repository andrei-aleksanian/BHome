import React, {Component} from 'react';
import classes from './Orders.module.css';
import {connect} from "react-redux";
import actions from '../../redux/actions/actions';
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';


class Orders extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.initOrders(this.props.token, this.props.userId);
    }

    render() {
        let user;

        const orders = this.props.orders ?
            this.props.orders.map(order => {
            const ingredients = Object.keys(order.ingredients).map(ig => {
                return <li key={ig}>{ig}: {order.ingredients[ig]}</li>
            });
            user = order.name;
            return (
                <div className={classes.order} key={order.id}>
                    <ul>
                        <li><span>Customer:</span> {user}</li>
                        <li><span>Address:</span> {order.address.house}, {order.address.street}, {order.address.postCode}</li>
                        <li><span>Additional Info:</span> {order.additionalInfo}</li>
                        <li className={classes.ingredients}><span>Burger:</span> <ul>{ingredients}</ul></li>
                        <li><span className={classes.total}>Total:</span> £{order.price.toFixed(2)}</li>
                    </ul>
                </div>
            );
        })
            : <LoadingSpinner />;

        return (
            <div className={classes.allOrders}>
                <h1>Recent orders for {user}:</h1>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.OrdersPage.orders,
        token: state.AuthReducer.token,
        userId: state.AuthReducer.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initOrders: (token, userId) => dispatch(actions.OrdersPageActions.fetch_orders(token, userId))
    };
};

export  default connect(mapStateToProps, mapDispatchToProps)(Orders);