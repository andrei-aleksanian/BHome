import React from 'react';
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = props => {
    const controls = Object.keys(props.controls)
        .sort((a,b) => props.prices[a] - props.prices[b])
        .map(label => {
            return <BuildControl key={label}
                                 added={props.added}
                                 deleted={props.deleted}
                                 type={label}
                                 Qty={props.controls[label]}
                                 price={props.prices[label].toFixed(2)}
                                 inactive={props.controls[label] === 0}
            />;
    });

    return (
        <div className={classes.BuildControls}>
            {controls}
            <div className={classes.Total}>Total: £{props.total.toFixed(2)}</div>
        </div>

    );
};

export default buildControls;