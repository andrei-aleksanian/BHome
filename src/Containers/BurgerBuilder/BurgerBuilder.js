import React, {Component, Fragment} from 'react';
import classes from './BurgerBuilder.module.css';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import CheckoutButton from "../../Components/UI/Buttons/CheckoutButton/CheckoutButton";
import HoverMessage from "../HoverMessage/HoverMessage";
import {connect} from 'react-redux';
import actions from '../../redux/actions/actions';
import LoadingSpinner from "../../Components/UI/Spinner/LoadingSpinner";

class BurgerBuilder extends Component {
    state = {
        purchasePressed: false,
    };

    componentDidMount() {
        this.props.loadingIngredients();
        this.props.init_ingredients();
    }

    returnToOrderHandler = () => {
        this.setState(prevState => {
           return {purchasePressed: !prevState.purchasePressed}
        });
    };

    render(){
        return (
            <div className={classes.Wrapper}>
                {this.props.error ? <p>Sorry, something went wrong!</p> : !this.props.ingredientsUpdated ? <LoadingSpinner/> :
                    <Fragment>
                        <Burger ingredients={this.props.ingredients}/>
                        <BuildControls
                            controls={this.props.ingredients}
                            added={this.props.addIngredient}
                            deleted={this.props.deleteIngredient}
                            total={this.props.totalPrice}
                            prices={this.props.INGREDIENT_PRICES}
                        />
                        <CheckoutButton
                            text={"Order now"}
                            clicked={this.returnToOrderHandler}
                            inactive={this.props.totalPrice === 0}
                        />
                    </Fragment>

                }
                {this.state.purchasePressed ?
                    <HoverMessage
                        clicked={this.returnToOrderHandler}
                    />: null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredientsUpdated: state.BurgerBuilder.ingredientsUpdated,
        ingredients: state.BurgerBuilder.ingredients,
        INGREDIENT_PRICES: state.BurgerBuilder.INGREDIENT_PRICES,
        totalPrice: state.BurgerBuilder.totalPrice,
        error: state.BurgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientType) => dispatch(actions.BurgerBuilderActions.addIngredient(ingredientType)),
        deleteIngredient: (ingredientType) => dispatch(actions.BurgerBuilderActions.deleteIngredient(ingredientType)),
        loadingIngredients: () => dispatch(actions.BurgerBuilderActions.loading_ingredients()),
        init_ingredients: () => dispatch(actions.BurgerBuilderActions.fetch_ingredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);