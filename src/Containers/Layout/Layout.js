import React, {useState, Fragment} from 'react';
import classes from './Layout.module.css';
import Header from "../../Components/UI/Header/Header";
import HoverNavigation from '../../Components/UI/HoverNavigation/HoverNavigation';
import {useSelector} from 'react-redux';

const Layout = props => {
    const authenticated = useSelector(state => state.AuthReducer.token);

    const [burgerPressed, setBurgerPressed] = useState(false);

    const returnToOrderHandler = () => {
        setBurgerPressed(!burgerPressed);
    };

    let switchedNavItems;

    if (authenticated === null){
        switchedNavItems = [
            {text: "Home", link: "/", active: false},
            {text: "Build", link: "/burger-builder", active: true},
            {text: "Log In", link: "/log-in", active: false}
            ];
    } else {
        switchedNavItems = [
            {text: "Home", link: "/", active: false},
            {text: "Build", link: "/burger-builder", active: true},
            {text: "Orders", link: "/my-orders", active: false},
            {text: "Log Out", link: "/log-out", active: false}
        ];
    }

    return (
        <Fragment>
            <HoverNavigation navItems={switchedNavItems} show={burgerPressed} clicked={returnToOrderHandler}/>
            <Header
                clicked={returnToOrderHandler}
                navItems={switchedNavItems}
            />
            <main>
                {props.children}
            </main>
            <footer className={classes.footer}>
                <p>About us</p>
                <p>Copyright</p>
                <p>Privacy</p>
            </footer>
        </Fragment>
    );
};

export default Layout;
