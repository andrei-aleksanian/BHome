import React from 'react';
import classes from './StaticNavigation.module.css';
import NavItem from '../../NavItem/NavItem';

const staticNavigation = props => {
    let navItems = props.navItems.map(item => {
        return <NavItem link={item.link} text={item.text} key={item.text}/>;
    });

    return (
        <nav className={classes.StaticNavigation}>
            <ul>
                <li className={classes.aboutLi}><a className={classes.about} href={"https://andrei-aleksanian.herokuapp.com/"}>About</a></li>
                {navItems}
            </ul>
        </nav>
    );
};

export default staticNavigation;