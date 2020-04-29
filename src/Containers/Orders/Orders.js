import React, {useState, useEffect} from 'react';
import classes from './Orders.module.css';
import {useSelector, useDispatch} from "react-redux";
import actions from '../../redux/actions/actions';
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';

const Orders = props => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const initOrders = (token, userId) => dispatch(actions.OrdersPageActions.fetch_orders(token, userId));

    const orders = useSelector(state => state.OrdersPage.orders);
    const token = useSelector(state => state.AuthReducer.token);
    const userId = useSelector(state => state.AuthReducer.userId);

    useEffect(() => {
        initOrders(token, userId);
    }, []);

    let user;

    console.log(orders);
    const ordersList = orders ?
        orders.map(order => {
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
            {ordersList}
        </div>
    );
};

export default Orders;