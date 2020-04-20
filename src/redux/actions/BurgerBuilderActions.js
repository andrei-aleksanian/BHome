import * as actionTypes from '../../redux/actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType
    }
};

export const deleteIngredient = (ingredientType) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientType
    }
};

export const loading_ingredients = () => {
    return {
        type: actionTypes.LOADING_INGREDIENTS
    };
};

export const set_ingredients = (data) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        data
    }
};

export const error_on_fetch_ingredients = (err) => {
    return {
        type: actionTypes.ERROR_ON_FETCH_INGREDIENTS,
        error: err
    }
};

export const fetch_ingredients = () => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(res => {
                dispatch(set_ingredients(res.data));
            })
            .catch(err => {
                dispatch(error_on_fetch_ingredients(err));
            });
    }
};