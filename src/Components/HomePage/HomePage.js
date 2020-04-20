import React from 'react';
import classes from './HomePage.module.css';
import CheckoutButton from "../UI/Buttons/CheckoutButton/CheckoutButton";
import {withRouter} from 'react-router-dom';
import BurgerImage from '../../assets/img/beef-bread-bun-burger.jpg'
import {connect} from 'react-redux';


const HomePage = (props) => {
    const redirectToSignIn = () => {
        props.history.push("/sign-up");
    };

    const redirectToBuild = () => {
        props.history.push("/burger-builder");
    };

    return (
        <div className={classes.Wrapper}>
            <h1>Make the burger of your dreams</h1>
            <img className={classes.BurgerImage} src={BurgerImage} alt={"We were supposed to have a delicious burger here. Definitely worth reloading!"}/>
            {
                props.auth === null ? <CheckoutButton className={classes.Register} clicked={redirectToSignIn} text="Register"/> :
                                <CheckoutButton className={classes.Register} clicked={redirectToBuild} text="Build It"/>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.AuthReducer.token
    }
};

export default withRouter(connect(mapStateToProps, null)(HomePage));