import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Header from "../../Components/UI/Header/Header";
import HoverNavigation from '../../Components/UI/HoverNavigation/HoverNavigation';
import {connect} from 'react-redux';

class Layout extends Component{

    state = {
        burgerPressed: false
    };

    returnToOrderHandler = () => {
        this.setState(prevState => {
            return {burgerPressed: !prevState.burgerPressed}
        });
    };

    render(){
        let switchedNavItems;

        if (this.props.authenticated === null){
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
                <HoverNavigation navItems={switchedNavItems} show={this.state.burgerPressed} clicked={this.returnToOrderHandler}/>
                <Header
                    clicked={this.returnToOrderHandler}
                    navItems={switchedNavItems}
                />
                <main>
                    {this.props.children}
                </main>
                <footer className={classes.footer}>
                    <p>About us</p>
                    <p>Copyright</p>
                    <p>Privacy</p>
                </footer>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        authenticated: state.AuthReducer.token
    };
};

export default connect(mapStateToProps, null)(Layout);
