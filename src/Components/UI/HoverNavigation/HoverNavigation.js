import React, {Fragment} from 'react';
import HeadNavigation from "./HeadNavigation/HeadNavigation";
import Backdrop from "../Backdrop/Backdrop";

const HoverNavigation = (props) => {
    return (
        <Fragment>
            {props.show ? <Backdrop clicked={props.clicked}/> : null}
            <HeadNavigation styles={
                props.show ? {
                    transform: "translateY(0)",
                    opacity: "1"
                } : {
                    transform: "translateY(-100vh)",
                    opacity: "0"
                }
            } navItems={props.navItems}/>
        </Fragment>

    );
};

export default HoverNavigation;
