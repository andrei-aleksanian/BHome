import * as actionTypes from "../actionsTypes";

const initialState = {
    error: null,
    loading: false,
    logInSuccess: false,
    token: localStorage.getItem("token") !== "null" ? localStorage.getItem("token") : null,
    userId: localStorage.getItem("userId") !== "null" ? localStorage.getItem("userId") : null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_STARTED:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SIGN_UP_PASSED:
            localStorage.setItem("token", action.signUpData.idToken);
            localStorage.setItem("userId", action.signUpData.localId);
            return {
                ...state,
                loading: false,
                logInSuccess: true,
                token: action.signUpData.idToken,
                userId: action.signUpData.localId
            };

        case actionTypes.SIGN_UP_FAILED:
            return {
                ...state,
                loading: false,
                logInSuccess: false,
                error: action.error.message
            };
        case actionTypes.LOG_IN_STARTED:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.LOG_IN_PASSED:

            localStorage.setItem("token", action.data.idToken);
            localStorage.setItem("userId", action.data.localId);
            return {
                ...state,
                loading: false,
                logInSuccess: true,
                token: action.data.idToken,
                userId: action.data.localId
            };

        case actionTypes.LOG_IN_FAILED:
            return {
                ...state,
                loading: false,
                logInSuccess: false,
                error: action.error.message
            };
        case actionTypes.LOG_OUT:
            localStorage.setItem("token", null);
            localStorage.setItem("userId", null);
            return {
                ...state,
                error: null,
                loading: false,
                logInSuccess: false,
                token: null,
                userId: null
            };
        case actionTypes.RESET_AUTH:
            return {
                ...state,
                error: null,
                loading: false,
                logInSuccess: false
            };
        default:
            return state;
    }
};

export default AuthReducer;
