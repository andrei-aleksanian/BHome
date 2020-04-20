import React from 'react';
import classes from './loadingSpinner.module.css';

const loadingSpinner = props => {
    return (
        <div className={classes.loader}>Loading...</div>
    );
};

export default loadingSpinner;