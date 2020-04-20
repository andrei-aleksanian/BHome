import * as actionTypes from "../actionsTypes";

const initialState = {
    INGREDIENT_PRICES: {
        salad: 0.20,
        bacon: 0.99,
        cheese: 1.99,
        meat: 2.99,
    },
    ingredients: null,
    ingredientsUpdated: false,
    totalPrice: 0,
    error: null,
};


const BurgerBuilderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            let newIngredients = {...state.ingredients};
            let newTotalPrice = state.totalPrice;

            newIngredients[action.ingredientType] += 1;
            newTotalPrice += state.INGREDIENT_PRICES[action.ingredientType];

            if(newTotalPrice < 0){
                newTotalPrice = 0;
            }

            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: newTotalPrice
            };

        case actionTypes.DELETE_INGREDIENT:
            if (state.ingredients[action.ingredientType] !== 0){
                let newIngredients = {...state.ingredients};
                let newTotalPrice = state.totalPrice;

                newIngredients[action.ingredientType] -= 1;
                newTotalPrice -= state.INGREDIENT_PRICES[action.ingredientType];

                if(newTotalPrice < 0.1){
                    newTotalPrice = 0;
                }

                return {
                    ...state,
                    ingredients: newIngredients,
                    totalPrice: newTotalPrice
                };
            } else {
                return state;
            }
        case actionTypes.ERROR_ON_FETCH_INGREDIENTS:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.LOADING_INGREDIENTS:
            return {
                ...state,
                ingredientsUpdated: false
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.data.salad,
                    bacon: action.data.bacon,
                    cheese: action.data.cheese,
                    meat: action.data.meat
                },
                totalPrice: 0,
                error: null,
                ingredientsUpdated: true
            };
        default:
            return state;
    }
};

export default BurgerBuilderReducer;
