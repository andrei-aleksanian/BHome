import React from 'react';
import classes from './CheckoutButton.module.css';

const CheckoutButton = props => {
    let classString = [];
    classString[0] = props.inactive ? classes.inactiveCheckoutButton : classes.CheckoutButton;
    classString[1] = props.className;


    return (
        <button
            className={classString.join(" ")}
            onClick={props.inactive ? null : props.clicked}
        >
            {props.text}
        </button>
    );
};


export default CheckoutButton;