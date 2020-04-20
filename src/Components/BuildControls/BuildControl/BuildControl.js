import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => {
    return (
      <div className={classes.BuildControl}>
          <div className={classes.Label}>{props.type + ":"}</div>
          <div className={classes.AddDelete}
               onClick={props.added.bind(this,props.type)}><span className={classes.AddDeleteSpan}>+</span></div>
          <div className={classes.AddDelete}
               onClick={props.deleted.bind(this,props.type)}><span className={props.inactive ? classes.inactive : classes.AddDeleteSpan}>-</span></div>
          <div className={classes.Sum}>{props.Qty}</div>
          <div className={classes.SumPrice}>{"£"+props.price}</div>

      </div>
    );
};

export default buildControl;