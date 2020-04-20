import React from 'react';
import classes from './Header.module.css';
import Hamburger from "./Hamburger/Hamburger";
import burgerLogo from "../../../assets/img/original.png";
import StaticNavigation from "./StaticNavigation/StaticNavigation";
import {NavLink} from "react-router-dom";

const Header = props => {
    // Switching Hamburger and StaticNavigation in CSS on a breakpoint of 1000px
    return (
      <header className={classes.Header}>
          <NavLink exact to={"/"}>
              <div className={classes.Logo}>
                  <img className={classes.ImgLogo} src={burgerLogo} alt=""/>
                  BHome
              </div>
          </NavLink>
          <StaticNavigation navItems={props.navItems}/>
          <Hamburger clicked={props.clicked}/>
      </header>
    );
};

export default Header;