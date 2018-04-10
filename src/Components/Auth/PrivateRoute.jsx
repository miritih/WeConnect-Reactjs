import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Authservice from './AuthService';
const Auth = new Authservice();

const PrivateRoute = ({ component: Component, ...rest }) => (
<Route
    {...rest}
    render={props =>
      Auth.isLoggedIn() ? (<Component {...props} />): (
<Redirect
          to={{
            pathname: "/login",
            // state: { from: Auth.logout()}
          }}
        />)
}
/>
);

export default PrivateRoute;
