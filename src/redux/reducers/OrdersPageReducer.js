import * as actionTypes from "../actionsTypes";

const initialState = {
    orders: null,
};

const OrdersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        default:
            return state;
    }
};

export default OrdersPageReducer;
