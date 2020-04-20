import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingSpinner from '../../Components/UI/Spinner/LoadingSpinner';
import actions from "../../redux/actions/actions";
import {withRouter} from "react-router";

class LogOut extends Component{

    componentDidMount() {
        setTimeout(()=>{
            this.props.redirect();
            this.props.history.push("/");
        }, 1000);

    }

    render(){
        return <LoadingSpinner />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect: () => dispatch(actions.AuthActions.logOut())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(LogOut));

