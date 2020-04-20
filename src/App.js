import React, {Component, Fragment} from 'react';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from './Containers/Layout/Layout';
import Orders from "./Containers/Orders/Orders";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LogIn from "./Containers/Authentication/LogIn";
import SignUp from "./Containers/Authentication/SignUp";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import LogOut from "./Containers/Authentication/LogOut";
import HomePage from "./Components/HomePage/HomePage";

class App extends Component {
  render() {
      let redirects;
      if (this.props.authenticated !== null) {
          redirects = (
              <Fragment>
                  <Redirect from={"/log-in"} to={"/"} />
                  <Redirect from={"/sign-up"} to={"/"} />
                  <Redirect from={"/my-orders"} to={"/"} />
              </Fragment>
          );
      } else {
          redirects =<Redirect from={"/log-out"} to={"/"} />;
      }
      return (
      <div>
          <BrowserRouter>
            <Layout>
                {redirects}
                <Switch>
                    <Route path="/burger-builder" exact component={BurgerBuilder} />
                    <Route path="/my-orders" component={Orders} />
                    <Route path="/log-in" component={LogIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/log-out" component={LogOut} />
                    <Route path="/"  exact component={HomePage} />
                </Switch>
            </Layout>
          </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        authenticated: state.AuthReducer.token
    };
};

export default connect(mapStateToProps, null)(App);