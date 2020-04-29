import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';
import actions from "../../redux/actions/actions";
import {withRouter} from "react-router";

const LogOut = props => {
    const dispatch = useDispatch();
    const redirect = () => dispatch(actions.AuthActions.logOut());

    useEffect(() => {
        setTimeout(()=>{
            redirect();
            props.history.push("/");
        }, 500);

    }, []);

    return <LoadingSpinner />;
};

export default withRouter(LogOut);

