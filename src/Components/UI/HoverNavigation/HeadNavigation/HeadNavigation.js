import React from 'react';
import classes from './HeadNavigation.module.css';
import {NavLink} from "react-router-dom";

const HeadNavigation = props => {
    let navItems;
    navItems = props.navItems.map(item => {
        return (
            <li key={item.text}>
                <NavLink activeClassName={classes.active} exact to={item.link}>{item.text}</NavLink>
            </li>
        );
    });

    return (
        <nav className={classes.HeadNavigation} style={props.styles}>
            <ul>
                <li><a href={"https://andrei-aleksanian.herokuapp.com/"}>About</a></li>
                {navItems}
            </ul>
        </nav>
    );
};

export default HeadNavigation;