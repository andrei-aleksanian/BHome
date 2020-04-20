import * as actionTypes from "../actionsTypes";

const initialState = {
    loading: false,
    orderFinished: false,
};


const FormProcessingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_STARTED_PUSHING:
            return {
                ...state,
                loading: true,
                orderFinished: false,
            };
        case actionTypes.ORDER_WAS_PUSHED:
            return {
                ...state,
                loading: false,
                orderFinished: true,
            };
        case actionTypes.RESET_PUSHED_STATE:
            return {
                ...state,
                loading: false,
                orderFinished: false,
            };
        case actionTypes.ERROR_ON_PUSH_ORDER:
            return{
                ...state,
                loading: false,
                orderFinished: false,
            };
        default:
            return state;
    }
};

export default FormProcessingReducer;
