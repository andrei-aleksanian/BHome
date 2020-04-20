import * as actionTypes from '../../redux/actionsTypes';
import axios from '../../axios-orders';

export const order_was_pushed = () => {
    return {
        type: actionTypes.ORDER_WAS_PUSHED,
    }
};

export const started_pushing_order = () => {
    return {
        type: actionTypes.ORDER_STARTED_PUSHING
    }
};

export const error_pushing_order = () => {
    return {
        type: actionTypes.ERROR_ON_PUSH_ORDER
    };
};

export const reset_pushed_state = () => {
    return {
        type: actionTypes.RESET_PUSHED_STATE
    };
};

export const push_order = (order, auth) => {
    return dispatch => {
        axios.post('/orders.json?auth=' + auth, order)
            .then(res => {
                if(res){
                    dispatch(order_was_pushed());
                }
            })
            .catch(err => {
            });
    };
};
