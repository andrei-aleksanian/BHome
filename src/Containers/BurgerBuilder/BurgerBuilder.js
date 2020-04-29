import React, {useState, useEffect, Fragment} from 'react';
import classes from './BurgerBuilder.module.css';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import CheckoutButton from "../../Components/UI/Buttons/CheckoutButton/CheckoutButton";
import HoverMessage from "../HoverMessage/HoverMessage";
import {useSelector, useDispatch} from 'react-redux';
import actions from '../../redux/actions/actions';
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";

const BurgerBuilder = props => {
    const [purchasePressed, setPurchasePressed] = useState(false);

    const dispatch = useDispatch();
    const addIngredient = (ingredientType) => dispatch(actions.BurgerBuilderActions.addIngredient(ingredientType));
    const deleteIngredient = (ingredientType) => dispatch(actions.BurgerBuilderActions.deleteIngredient(ingredientType));
    const loadingIngredients = () => dispatch(actions.BurgerBuilderActions.loading_ingredients());
    const init_ingredients = () => dispatch(actions.BurgerBuilderActions.fetch_ingredients());

    const ingredientsUpdated = useSelector(state => state.BurgerBuilder.ingredientsUpdated);
    const ingredients = useSelector(state => state.BurgerBuilder.ingredients);
    const INGREDIENT_PRICES = useSelector(state => state.BurgerBuilder.INGREDIENT_PRICES);
    const totalPrice = useSelector(state => state.BurgerBuilder.totalPrice);
    const error = useSelector(state => state.BurgerBuilder.error);

    useEffect( () => {
        loadingIngredients();
        init_ingredients();
    }, []);

    const returnToOrderHandler = () => {
        setPurchasePressed(!purchasePressed);
    };

    return (
        <div className={classes.Wrapper}>
            {error ? <p>Sorry, something went wrong!</p> : !ingredientsUpdated ? <LoadingSpinner/> :
                <Fragment>
                    <Burger ingredients={ingredients}/>
                    <BuildControls
                        controls={ingredients}
                        added={addIngredient}
                        deleted={deleteIngredient}
                        total={totalPrice}
                        prices={INGREDIENT_PRICES}
                    />
                    <CheckoutButton
                        text={"Order now"}
                        clicked={returnToOrderHandler}
                        inactive={totalPrice === 0}
                    />
                </Fragment>

            }
            {purchasePressed ?
                <HoverMessage
                    clicked={returnToOrderHandler}
                />: null}
        </div>
    );
};

export default BurgerBuilder;