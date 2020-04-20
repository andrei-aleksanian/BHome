import * as actionTypes from '../../redux/actionsTypes';
import axios from 'axios';
import axios_db from '../../axios-orders';

export const logIn = (email, password) => {
    return dispatch => {
        dispatch(logInStarted());

        const data = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2fCRbdkCElxrr-IjqlhTA3pnwaVCVcuQ", data)
            .then(res => {
                dispatch(logInPassed(res.data));
                dispatch(expiresIn(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(logInFailed(err));
            })
    }
};

export const logOut = () => {
    return {
        type: actionTypes.LOG_OUT
    };
};
export const expiresIn = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    };
};

export const logInStarted = () => {
    return {
        type: actionTypes.LOG_IN_STARTED
    }
};

export const logInFailed = (error) => {
    return {
        type: actionTypes.LOG_IN_FAILED,
        error: error
    }
};

export const logInPassed = (data) => {
    return {
        type: actionTypes.LOG_IN_PASSED,
        data
    }
};

export const SignUp = (email, password, userData) => {
    return dispatch => {
        dispatch(signUpStarted());
        const SignUpData = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2fCRbdkCElxrr-IjqlhTA3pnwaVCVcuQ", SignUpData)
            .then(res => {
                dispatch(userDataSaved(res.data, userData));
            })
            .catch(err => {
                dispatch(signUpFailed(err));
            })
    }
};

export const signUpStarted = () => {
    return {
        type: actionTypes.SIGN_UP_STARTED
    }
};

export const signUpFailed = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAILED,
        error
    }
};

export const signUpPassed = (signUpData) => {
    return {
        type: actionTypes.SIGN_UP_PASSED,
        signUpData
    }
};

export const userDataSaved = (signUpData, userData) => {
    return dispatch => {
        dispatch(signUpPassed(signUpData));
        userData = {
            ...userData,
            userId: signUpData.localId
        };

        axios_db.post('/userData.json?auth=' + signUpData.idToken, userData)
            .then(res => {
            })
            .catch(err => {
            });
    };
};

export const resetAuth = () => {
    return {
        type: actionTypes.RESET_AUTH
    }
};